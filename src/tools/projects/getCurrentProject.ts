/**
 * getCurrentProjectId tool
 * Retrieves the current Teamwork project ID for the solution
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";

// Tool definition
export const getCurrentProjectDefinition = {
  name: "getCurrentProject",
  description: "Get the current solution's Teamwork project ID to use for queries",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The Teamwork project ID that you should first find stored in the .teamwork file in the solution root"
      }
    },
    required: ["projectId"]
  }
};

// Tool handler
export async function handleGetCurrentProject(input: any) {
  logger.info('Calling teamworkService.getCurrentProject()');
  logger.info(`Project ID: ${input?.projectId}`);

  try {
    
    const projectId = String(input?.projectId);
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    
    const result = await teamworkService.getCurrentProject(projectId);
       
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in getCurrentProject handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error retrieving current project: ${error.message}`
      }]
    };
  }
} 