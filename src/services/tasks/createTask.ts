import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';
import { TaskData } from '../core/types.js';

/**
 * Creates a new task in Teamwork
 * @param taskData The task data to create
 * @returns The API response with the created task data
 */
export const createTask = async (taskData: TaskData) => {
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

export default createTask; 