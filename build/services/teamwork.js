import axios from 'axios';
import logger from '../utils/logger.js';
// Debug environment variables
logger.info(`TEAMWORK_API_URL: ${process.env.TEAMWORK_API_URL}`);
// Don't log the full password for security reasons
logger.info(`TEAMWORK_USERNAME: ${process.env.TEAMWORK_USERNAME}`);
logger.info(`TEAMWORK_PASSWORD length: ${process.env.TEAMWORK_PASSWORD ? process.env.TEAMWORK_PASSWORD.length : 0}`);
// Create auth header with debugging
const username = process.env.TEAMWORK_USERNAME;
const password = process.env.TEAMWORK_PASSWORD;
const authString = `${username}:${password}`;
const base64Auth = Buffer.from(authString).toString('base64');
logger.info(`Auth string length: ${authString.length}, Base64 auth length: ${base64Auth.length}`);
// Configure Teamwork API client
const teamworkApi = axios.create({
    baseURL: process.env.TEAMWORK_API_URL,
    headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
    }
});
// Log request interceptor for debugging
teamworkApi.interceptors.request.use(request => {
    logger.info(`Request URL: ${request.baseURL}${request.url}`);
    logger.info(`Request method: ${request.method}`);
    logger.info(`Request headers: ${JSON.stringify(request.headers)}`);
    return request;
});
// Log response interceptor for debugging
teamworkApi.interceptors.response.use(response => {
    logger.info(`Response status: ${response.status}`);
    return response;
}, error => {
    if (error.response) {
        logger.error(`Error response status: ${error.response.status}`);
        logger.error(`Error response data: ${JSON.stringify(error.response.data)}`);
    }
    return Promise.reject(error);
});
// Get all projects
export const getProjects = async () => {
    try {
        logger.info(`Making request to Teamwork API: ${process.env.TEAMWORK_API_URL}/projects.json`);
        // Try different API URL formats
        let response;
        try {
            // Try the v3 API format
            response = await teamworkApi.get('/projects.json');
        }
        catch (error) {
            logger.warn(`V3 API request failed: ${error.message}`);
            // Try the v1 API format as fallback
            logger.info('Trying v1 API format as fallback');
            const v1BaseURL = process.env.TEAMWORK_API_URL?.replace('/v3/', '/v1/') || '';
            const v1Api = axios.create({
                baseURL: v1BaseURL,
                headers: teamworkApi.defaults.headers
            });
            try {
                response = await v1Api.get('/projects.json');
                logger.info('V1 API request succeeded');
            }
            catch (v1Error) {
                logger.error(`V1 API request also failed: ${v1Error.message}`);
                throw error; // Throw the original error
            }
        }
        logger.info(`Teamwork API response status: ${response.status}`);
        logger.info(`Response headers: ${JSON.stringify(response.headers)}`);
        // Debug response data
        if (!response.data) {
            logger.warn('Response data is empty');
            return [];
        }
        logger.info(`Response data type: ${typeof response.data}`);
        // Check if projects property exists
        if (!response.data.projects) {
            logger.warn(`Projects property not found in response. Response keys: ${Object.keys(response.data).join(', ')}`);
            logger.info(`First 500 chars of response: ${JSON.stringify(response.data).substring(0, 500)}`);
            return [];
        }
        logger.info(`Projects count: ${Array.isArray(response.data.projects) ? response.data.projects.length : 'not an array'}`);
        return response.data.projects;
    }
    catch (error) {
        logger.error(`Teamwork API error: ${error.message}`);
        // Log more details about the error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            logger.error(`Error response status: ${error.response.status}`);
            logger.error(`Error response headers: ${JSON.stringify(error.response.headers)}`);
            logger.error(`Error response data: ${JSON.stringify(error.response.data).substring(0, 500)}`);
        }
        else if (error.request) {
            // The request was made but no response was received
            logger.error('No response received from API');
        }
        else {
            // Something happened in setting up the request that triggered an Error
            logger.error(`Error setting up request: ${error.message}`);
        }
        throw new Error('Failed to fetch projects from Teamwork API');
    }
};
// Get all tasks
export const getTasks = async () => {
    try {
        const response = await teamworkApi.get('/tasks.json');
        return response.data.tasks;
    }
    catch (error) {
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error('Failed to fetch tasks from Teamwork API');
    }
};
// Get tasks by project ID
export const getTasksByProjectId = async (projectId) => {
    try {
        const response = await teamworkApi.get(`/projects/${projectId}/tasks.json`);
        return response.data.tasks;
    }
    catch (error) {
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error(`Failed to fetch tasks by project ID ${projectId} from Teamwork API`);
    }
};
// Get task by ID
export const getTaskById = async (taskId) => {
    try {
        const response = await teamworkApi.get(`/tasks/${taskId}.json`);
        return response.data.task;
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error(`Failed to fetch task ${taskId} from Teamwork API`);
    }
};
// Create a new task
export const createTask = async (taskData) => {
    try {
        const response = await teamworkApi.post('/tasks.json', {
            'todo-item': taskData
        });
        return response.data;
    }
    catch (error) {
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error('Failed to create task in Teamwork API');
    }
};
// Update a task
export const updateTask = async (taskId, taskData) => {
    try {
        const response = await teamworkApi.put(`/tasks/${taskId}.json`, {
            'todo-item': taskData
        });
        return response.data;
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error(`Failed to update task ${taskId} in Teamwork API`);
    }
};
// Delete a task
export const deleteTask = async (taskId) => {
    try {
        await teamworkApi.delete(`/tasks/${taskId}.json`);
        return true;
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        }
        logger.error(`Teamwork API error: ${error.message}`);
        throw new Error(`Failed to delete task ${taskId} in Teamwork API`);
    }
};
export default {
    getProjects,
    getTasks,
    getTasksByProjectId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
