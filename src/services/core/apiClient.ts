import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import logger from '../../utils/logger.js';
import config from '../../utils/config.js';

// Debug environment variables
logger.info(`TEAMWORK_DOMAIN: ${config.domain}`);
logger.info(`Constructed API URL: ${config.apiUrl}`);
logger.info(`TEAMWORK_USERNAME: ${config.username}`);
logger.info(`TEAMWORK_PASSWORD length: ${config.password ? config.password.length : 0}`);

// Log solution root path if available
if (config.solutionRootPath) {
  logger.info(`SOLUTION_ROOT_PATH: ${config.solutionRootPath}`);
}

// Create auth header with debugging
const username = config.username;
const password = config.password;
const authString = `${username}:${password}`;
const base64Auth = Buffer.from(authString).toString('base64');
logger.info(`Auth string length: ${authString.length}, Base64 auth length: ${base64Auth.length}`);

// Configure Teamwork API client
let teamworkApi: AxiosInstance | null = null;

// Helper function to create and configure the API client
export const createApiClient = (): AxiosInstance | null => {
  try {
    if (!config.apiUrl) {
      throw new Error('Invalid or empty Teamwork API URL');
    }
    
    const api = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Log request interceptor for debugging
    api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      logger.info(`Request URL: ${request.baseURL}${request.url}`);
      logger.info(`Request method: ${request.method}`);
      logger.info(`Request headers: ${JSON.stringify(request.headers)}`);
      return request;
    }, (error: AxiosError) => {
      logger.error(`Request error: ${error.message}`);
      return Promise.reject(error);
    });
    
    // Log response interceptor for debugging
    api.interceptors.response.use((response: AxiosResponse) => {
      logger.info(`Response status: ${response.status}`);
      return response;
    }, (error: AxiosError) => {
      if (error.response) {
        logger.error(`Response error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        logger.error(`Request error: ${error.message}`);
      } else {
        logger.error(`Error setting up request: ${error.message}`);
      }
      return Promise.reject(error);
    });
    
    return api;
  } catch (error: any) {
    logger.error(`Failed to create Teamwork API client: ${error.message}`);
    return null;
  }
};

// Initialize the API client
teamworkApi = createApiClient();

// Helper function to check if API client is initialized
export const ensureApiClient = (): AxiosInstance => {
  if (!teamworkApi) {
    teamworkApi = createApiClient();
    if (!teamworkApi) {
      const errorMsg = 'Teamwork API client is not initialized. Please check your configuration.';
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
  return teamworkApi;
};

export default {
  createApiClient,
  ensureApiClient
}; 