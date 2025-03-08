import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import logger from '../utils/logger.js';
import config from '../utils/config.js';
import minimist from 'minimist';
import path from 'path';

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
const createApiClient = (): AxiosInstance | null => {
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
const ensureApiClient = (): AxiosInstance => {
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

// Define interface for project query parameters
export interface ProjectQueryParams {
  // String parameters
  updatedAfter?: string;
  timeMode?: 'timelogs' | 'estimated';
  searchTerm?: string;
  reportType?: 'project' | 'health';
  reportTimezone?: string;
  reportFormat?: 'csv' | 'html' | 'pdf' | 'xls';
  projectType?: string;
  orderMode?: 'asc' | 'desc';
  orderBy?: 'companyname' | 'datecreated' | 'duedate' | 'lastactivity' | 'name' | 'namecaseinsensitive' | 'ownercompany' | 'starred' | 'categoryname';
  notCompletedBefore?: string;
  minLastActivityDate?: string;
  maxLastActivityDate?: string;
  
  // Integer parameters
  userId?: number;
  pageSize?: number;
  page?: number;
  orderByCustomFieldId?: number;
  minBudgetCapacityUsedPercent?: number;
  maxBudgetCapacityUsedPercent?: number;
  
  // Boolean parameters
  useFormulaFields?: boolean;
  skipCounts?: boolean;
  searchCompanies?: boolean;
  searchByLetter?: boolean;
  onlyStarredProjects?: boolean;
  onlyProjectsWithExplicitMembership?: boolean;
  onlyProjectsThatCanLogTime?: boolean;
  onlyArchivedProjects?: boolean;
  matchAllProjectTags?: boolean;
  matchAllExcludedTags?: boolean;
  isReportDownload?: boolean;
  includeTentativeProjects?: boolean;
  includeSubCategories?: boolean;
  includeStats?: boolean;
  includeProjectUserInfo?: boolean;
  includeProjectProfitability?: boolean;
  includeProjectDates?: boolean;
  includeCustomFields?: boolean;
  includeCounts?: boolean;
  includeCompletedStatus?: boolean;
  includeArchivedProjects?: boolean;
  hideObservedProjects?: boolean;
  alwaysIncludeFiltering?: boolean;
  
  // Array parameters
  usersWithExplicitMembershipIds?: number[];
  teamIds?: number[];
  selectedColumns?: string[];
  projectTagIds?: number[];
  projectStatuses?: ('active' | 'current' | 'late' | 'upcoming' | 'completed' | 'deleted')[];
  projectOwnerIds?: number[];
  projectIds?: number[];
  projectHealths?: (0 | 1 | 2 | 3)[];
  projectCompanyIds?: number[];
  projectCategoryIds?: number[];
  includeCustomFieldIds?: number[];
  include?: string[];
  featuresEnabled?: string[];
  excludeTagIds?: number[];
  excludeProjectIds?: number[];
  
  // Field selection parameters
  'fields[workflows]'?: string[];
  'fields[users]'?: string[];
  'fields[tags]'?: string[];
  'fields[stages]'?: string[];
  'fields[projects]'?: string[];
  'fields[projectcategories]'?: string[];
  'fields[projectUpdates]'?: string[];
  'fields[projectBudgets]'?: string[];
  'fields[portfolioColumns]'?: string[];
  'fields[portfolioCards]'?: string[];
  'fields[portfolioBoards]'?: string[];
  'fields[industries]'?: string[];
  'fields[customfields]'?: string[];
  'fields[customfieldProjects]'?: string[];
  'fields[countries]'?: string[];
  'fields[companies]'?: string[];
  
  // Custom field filtering
  [key: string]: any; // For projectCustomField[id][op]=value format
}

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
          'Authorization': `Basic ${base64Auth}`,
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

// Get current project ID (if set)
export const getCurrentProjectId = async () => {
  try {
    
    const args = minimist(process.argv.slice(2));
    
    // Get --root argument if passed
    let solutionRoot = args.root ? path.resolve(args.root) : null;
    

    if (!config.projectId) {
      return { 
        success: false, 
        error: `Current Teamwork project ID not found in this solution Root:${solutionRoot}` 
      };
    }
    
    const response = {
      success: true,
      data: { 
        projectId: config.projectId
      }
    };
    
    return response;
  } catch (error: any) {
    logger.error(`Error getting current project ID: ${error.message} CWD:${process.cwd()}`);
    return { 
      success: false, 
      error: `Error getting current project ID: ${error.message} CWD:${process.cwd()}` 
    };
  }
};

// Get all tasks
export const getTasks = async () => {
  try {
    const api = ensureApiClient();
    const response = await api.get('/tasks.json');
    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching tasks: ${error.message}`);
    throw new Error('Failed to fetch tasks from Teamwork API');
  }
};

// Get tasks by project ID
export const getTasksByProjectId = async (projectId: string) => {
  try {
    const api = ensureApiClient();
    const response = await api.get(`/projects/${projectId}/tasks.json`);
    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching tasks for project ${projectId}: ${error.message}`);
    throw new Error(`Failed to fetch tasks for project ${projectId}`);
  }
};

// Get task lists by project ID
export const getTaskListsByProjectId = async (projectId: string) => {
  try {
    const api = ensureApiClient();
    const response = await api.get(`/projects/${projectId}/tasklists.json`);
    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching task lists for project ${projectId}: ${error.message}`);
    throw new Error(`Failed to fetch task lists for project ${projectId}`);
  }
};

// Get task by ID
export const getTaskById = async (taskId: string) => {
  try {
    const api = ensureApiClient();
    const response = await api.get(`/tasks/${taskId}.json`);
    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching task ${taskId}: ${error.message}`);
    throw new Error(`Failed to fetch task ${taskId}`);
  }
};

// Create task
export const createTask = async (taskData: any) => {
  try {
    const api = ensureApiClient();
    const response = await api.post('/tasks.json', {
      'todo-item': taskData
    });
    return response.data;
  } catch (error: any) {
    logger.error(`Error creating task: ${error.message}`);
    throw new Error('Failed to create task in Teamwork');
  }
};

// Update task
export const updateTask = async (taskId: string, taskData: any) => {
  try {
    const api = ensureApiClient();
    const response = await api.put(`/tasks/${taskId}.json`, {
      'todo-item': taskData
    });
    return response.data;
  } catch (error: any) {
    logger.error(`Error updating task ${taskId}: ${error.message}`);
    throw new Error(`Failed to update task ${taskId}`);
  }
};

// Delete task
export const deleteTask = async (taskId: string) => {
  try {
    const api = ensureApiClient();
    await api.delete(`/tasks/${taskId}.json`);
    return true;
  } catch (error: any) {
    logger.error(`Error deleting task ${taskId}: ${error.message}`);
    throw new Error(`Failed to delete task ${taskId}`);
  }
};

// Export all functions
export default {
  getCurrentProjectId,
  getProjects,
  getTaskListsByProjectId,
  getTasks,
  getTasksByProjectId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};