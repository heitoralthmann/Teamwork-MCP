/**
 * createTask tool
 * Creates a new task in Teamwork
 */

import logger from "../../utils/logger.ts";
import teamworkService from "../../services/index.ts";

// Tool definition
export const createTaskDefinition = {
  name: "createTask",
  description: "Create a new task in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      taskData: {
        type: "object",
        description: "The task data to create"
      }
    },
    required: ["taskData"]
  }
};

// Tool handler
export async function handleCreateTask(input: any) {
  logger.info('Calling teamworkService.createTask()');
  logger.info(`Task data: ${JSON.stringify(input?.taskData)}`);
  
  try {
    const taskData = input?.taskData;
    if (!taskData) {
      throw new Error("Task data is required");
    }
    
    const newTask = await teamworkService.createTask(taskData);
    logger.info(`Task created successfully`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(newTask, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in createTask handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error creating task: ${error.message}`
      }]
    };
  }
} 