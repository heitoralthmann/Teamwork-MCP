/**
 * getCurrentProjectId tool
 * Retrieves the current Teamwork project ID for the solution
 */

import logger from "../../utils/logger.ts";
import teamworkService from "../../services/index.ts";

// Tool definition
export const getCurrentProjectIdDefinition = {
  name: "getCurrentProjectId",
  description: "Get the current solution's Teamwork project ID to use for queries",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
};

// Tool handler
export async function handleGetCurrentProjectId() {
  logger.info('Calling teamworkService.getCurrentProjectId()');
  
  try {
    const result = await teamworkService.getCurrentProjectId();
    logger.info(`getCurrentProjectId response: ${JSON.stringify(result)}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in getCurrentProjectId handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error retrieving current project ID: ${error.message}`
      }]
    };
  }
} 