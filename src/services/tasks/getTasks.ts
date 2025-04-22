import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';
import { getTasksDefinition } from '../../tools/tasks/getTasks.js';

/**
 * Fetches all tasks from the Teamwork API
 * @param params Optional query parameters for filtering and pagination
 * @returns The API response with task data
 */
export const getTasks = async (params: any = {}) => {
  try {
    const api = ensureApiClient();
    
    // Get the list of valid parameter keys from the tool definition
    const validParams = Object.keys(getTasksDefinition.inputSchema.properties);
    
    // Filter the params object to only include valid parameters
    const filteredParams = Object.keys(params)
      .filter(key => validParams.includes(key))
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {} as Record<string, any>);
    
    const response = await api.get('/tasks.json', { params: filteredParams });
    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching tasks: ${error.message}`);
    throw new Error('Failed to fetch tasks from Teamwork API');
  }
};

export default getTasks; 