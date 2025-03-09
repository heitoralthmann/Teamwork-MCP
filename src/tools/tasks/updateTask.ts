/**
 * updateTask tool
 * Updates an existing task in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { TaskRequest } from "../../models/TaskRequest.js";
import { TaskTask } from "../../models/TaskTask.js";

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
        type: "TaskTask",
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
    
    // Create a proper TaskRequest object
    const taskRequest: TaskRequest = {};
    
    // If task data is provided directly, wrap it in a task property
    if (!taskData.task) {
      // Convert simple properties to the expected format
      const taskObj: TaskTask = {};
      
      // Copy over simple properties
      if (taskData.name) taskObj.name = taskData.name;
      if (taskData.description) taskObj.description = taskData.description;
      if (taskData.status) taskObj.status = taskData.status;
      if (taskData.progress !== undefined) taskObj.progress = taskData.progress;
      if (taskData.estimatedMinutes !== undefined) taskObj.estimatedMinutes = taskData.estimatedMinutes;
      if (taskData.private !== undefined) taskObj.private = taskData.private;
      
      // Handle dates in the correct format
      if (taskData.dueAt) {
        taskObj.dueAt = {
          Set: true,
          Value: taskData.dueAt
        };
      }
      
      if (taskData.startAt) {
        taskObj.startAt = {
          Set: true,
          Value: taskData.startAt
        };
      }
      
      // Handle priority
      if (taskData.priority) {
        taskObj.priority = {
          Set: true,
          Value: taskData.priority
        };
      }
      
      // Handle assignees
      if (taskData.assignees) {
        taskObj.assignees = taskData.assignees;
      }
      
      taskRequest.task = taskObj;
    } else {
      // If already in the correct format, use as is
      Object.assign(taskRequest, taskData);
    }
    
    logger.info(`Formatted task request: ${JSON.stringify(taskRequest)}`);
    
    const updatedTask = await teamworkService.updateTask(taskId, taskRequest);
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