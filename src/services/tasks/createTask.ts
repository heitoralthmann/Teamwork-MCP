import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';
import { TaskRequest } from '../../models/TaskRequest.js';

/**
 * Creates a new task in a specific tasklist in Teamwork
 * @param tasklistId The ID of the tasklist to add the task to
 * @param taskData The task data
 * @returns The API response with the created task data
 */
export const createTask = async (tasklistId: string, taskData: TaskRequest) => {
  try {
    const api = ensureApiClient();
    const response = await api.post(`/tasklists/${tasklistId}/tasks.json`, taskData);
    return response.data;
  } catch (error: any) {
    logger.error(`Error creating task in tasklist ${tasklistId}: ${error.message}`);
    throw new Error(`Failed to create task in tasklist ${tasklistId}: ${error.message}`);
  }
};

export default createTask; 