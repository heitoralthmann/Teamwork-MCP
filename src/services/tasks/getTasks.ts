import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';

/**
 * Fetches all tasks from the Teamwork API
 * @returns The API response with task data
 */
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

export default getTasks; 