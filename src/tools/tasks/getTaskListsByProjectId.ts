/**
 * getTaskListsByProjectId tool
 * Retrieves task lists from a specific project in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";

// Tool definition
export const getTaskListsByProjectIdDefinition = {
  name: "getTaskListsByProjectId",
  description: "Get all task lists by project ID",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The ID of the project to get task lists from, this should be chosen in the following order: \n" + 
                     " 1) If a project ID is provided by the user, use that. \n" + 
                     " 2) If a project name is provided, use the `getProjects` function to try and find the project, if found use that project ID \n" + 
                     " 3) If no project ID or name was provided, check the `.teamwork` file to see if one has been stored and use that \n" + 
                     " 4) If none of the above have found a project ID, get a list of all projects using the `getProjects` function and ask the user which project they are working on, then ask them if they would like you to store this as a default before continuing, if they do, store the project ID in the `.teamwork` file. \n" +
                     " If a project ID is not stored in the `.teamwork` file, always ask the user which project they are working on, then ask them if they would like you to store this as a default before continuing, if they do, store the project ID in the `.teamwork` file. \n"
      }
    },
    required: ["projectId"]
  }
};

// Tool handler
export async function handleGetTaskListsByProjectId(input: any) {
  logger.info('Calling teamworkService.getTaskListsByProjectId()');
  logger.info(`Project ID: ${input?.projectId}`);
  
  try {
    const projectId = input?.projectId;
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    
    const taskLists = await teamworkService.getTaskListsByProjectId(projectId);
    logger.info(`Task lists response received for project ID: ${projectId}`);
    
    if (taskLists) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify(taskLists, null, 2)
        }]
      };
    } else {
      return {
        content: [{
          type: "text",
          text: `Error getting task lists for project ID: ${projectId}`
        }]
      };
    }
  } catch (error: any) {
    logger.error(`Error in getTaskListsByProjectId handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error retrieving task lists: ${error.message}`
      }]
    };
  }
} 