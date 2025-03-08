/**
 * getTasks tool
 * Retrieves all tasks from Teamwork
 */

import logger from "../../utils/logger.ts";
import teamworkService from "../../services/index.ts";

// Tool definition
export const getTasksDefinition = {
  name: "getTasks",
  description: "Get all tasks from Teamwork",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
};

// Tool handler
export async function handleGetTasks() {
  logger.info('Calling teamworkService.getTasks()');
  
  try {
    const tasks = await teamworkService.getTasks();
    logger.info(`Tasks response received`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in getTasks handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error retrieving tasks: ${error.message}`
      }]
    };
  }
} 