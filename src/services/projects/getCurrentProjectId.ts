import minimist from 'minimist';
import path from 'path';
import logger from '../../utils/logger.js';
import config from '../../utils/config.js';
import { ApiResponse, ProjectIdResponse } from '../core/types.js';

/**
 * Gets the current Teamwork project ID from the configuration
 * @returns An object with success status and project ID or error message
 */
export const getCurrentProjectId = async (): Promise<ApiResponse<ProjectIdResponse>> => {
  try {
    const args = minimist(process.argv.slice(2));
    
    // Get --root argument if passed
    let solutionRoot = args.root ? path.resolve(args.root) : null;
    
    if (!config.projectId) {
      return { 
        success: false, 
        error: `Current Teamwork project ID not found in this solution Root:${solutionRoot}` 
      };
    }
    
    return {
      success: true,
      data: { 
        projectId: config.projectId
      }
    };
  } catch (error: any) {
    logger.error(`Error getting current project ID: ${error.message} CWD:${process.cwd()}`);
    return { 
      success: false, 
      error: `Error getting current project ID: ${error.message} CWD:${process.cwd()}` 
    };
  }
};

export default getCurrentProjectId; 