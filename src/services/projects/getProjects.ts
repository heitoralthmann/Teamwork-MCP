import axios from 'axios';
import logger from '../../utils/logger.js';
import config from '../../utils/config.js';
import { ensureApiClient } from '../core/apiClient.js';
import { ProjectQueryParams } from '../core/types.js';

/**
 * Fetches projects from the Teamwork API
 * @param params Optional query parameters for filtering projects
 * @returns The API response with project data
 */
export const getProjects = async (params?: ProjectQueryParams) => {
  try {
    logger.info(`Making request to Teamwork API: ${config.apiUrl}/projects.json`);
    
    // Try different API URL formats
    try {
      const api = ensureApiClient();
      const response = await api.get('/projects.json', { params });
      return response.data;
    } catch (error: any) {
      logger.warn(`V3 API request failed: ${error.message}`);
      
      // Try the v1 API format as fallback
      logger.info('Trying v1 API format as fallback');
      const v1BaseURL = config.apiUrl?.replace('/v3/', '/v1/') || '';
      const v1Api = axios.create({
        baseURL: v1BaseURL,
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      });
      
      try {
        const v1Response = await v1Api.get('/projects.json', { params });
        logger.info('V1 API request succeeded');
        return v1Response.data;
      } catch (v1Error: any) {
        logger.error(`V1 API request also failed: ${v1Error.message}`);
        throw error; // Throw the original error
      }
    }
  } catch (error: any) {
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error('Failed to fetch projects from Teamwork API');
  }
};

export default getProjects; 