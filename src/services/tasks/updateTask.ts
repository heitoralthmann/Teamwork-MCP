/**
 * updateTask service
 * Updates an existing task in Teamwork
 * 
 * PATCH /tasks/{taskId}.json
 * The request body should be a TaskRequest object with a task property
 */

import logger from '../../utils/logger.js';
import { ensureApiClient } from '../core/apiClient.js';
import { TaskRequest } from '../../models/TaskRequest.js';

/**
 * Updates an existing task in Teamwork
 * @param taskId The ID of the task to update
 * @param taskData The updated task data
 * @returns The updated task
 */
export async function updateTask(taskId: string, taskData: TaskRequest) {
  logger.info(`Updating task with ID: ${taskId}`);
  logger.info(`Task data: ${JSON.stringify(taskData)}`);
  
  try {
    const apiClient = await ensureApiClient();
    const url = `/tasks/${taskId}.json`;
    
    logger.info(`Request URL: ${url}`);
    logger.info(`Request method: PATCH`);
    logger.info(`Request data: ${JSON.stringify(taskData)}`);
    
    // Log the current date and time for debugging
    logger.info(`Current date and time: ${new Date().toISOString()}`);
    
    // Make the PATCH request to update the task
    const response = await apiClient.patch(url, taskData);
    
    logger.info(`Response status: ${response.status}`);
    logger.info(`Response data: ${JSON.stringify(response.data)}`);
    
    return response.data;
  } catch (error: any) {
    logger.error(`Error updating task ${taskId}: ${error.message}`);
    
    // Log more details about the error
    if (error.response) {
      logger.error(`Response status: ${error.response.status}`);
      logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
      logger.error(`Request URL: ${error.config?.url}`);
      logger.error(`Request method: ${error.config?.method}`);
      logger.error(`Request data: ${JSON.stringify(error.config?.data)}`);
    } else if (error.request) {
      logger.error(`No response received: ${error.request}`);
    }
    
    throw new Error(`Failed to update task ${taskId}`);
  }
}

export default updateTask; 