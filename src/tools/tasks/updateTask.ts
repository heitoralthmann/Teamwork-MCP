/**
 * updateTask tool
 * Updates an existing task in Teamwork
 */

import logger from "../../utils/logger.ts";
import teamworkService from "../../services/index.ts";

// Tool definition
export const updateTaskDefinition = {
  name: "updateTask",
  description: "Update an existing task in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      taskId: {
        type: "integer",
        description: "The ID of the task to update"
      },
      taskData: {
        type: "object",
        description: "The updated task data"
      }
    },
    required: ["taskId", "taskData"]
  }
};

// Tool handler
export async function handleUpdateTask(input: any) {
  logger.info('Calling teamworkService.updateTask()');
  logger.info(`Task ID: ${input?.taskId}`);
  logger.info(`Task data: ${JSON.stringify(input?.taskData)}`);
  
  try {
    const taskId = String(input?.taskId);
    const taskData = input?.taskData;
    
    if (!taskId || !taskData) {
      throw new Error("Task ID and task data are required");
    }
    
    const updatedTask = await teamworkService.updateTask(taskId, taskData);
    logger.info(`Task updated successfully for task ID: ${taskId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(updatedTask, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in updateTask handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error updating task: ${error.message}`
      }]
    };
  }
} 