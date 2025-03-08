import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';
import { TaskData } from '../core/types.js';

/**
 * Updates an existing task in Teamwork
 * @param taskId The ID of the task to update
 * @param taskData The updated task data
 * @returns The API response with the updated task data
 */
export const updateTask = async (taskId: string, taskData: TaskData) => {
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

export default updateTask; 