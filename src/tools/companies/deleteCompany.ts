/**
 * deleteCompany tool
 * Deletes a company from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";

// Tool definition
export const deleteCompanyDefinition = {
  name: "deleteCompany",
  description: "Delete an existing company. AI INSTRUCTIONS: This endpoint allows you to delete_projects_api_v3_companies_{companyid}.json resources. It requires the following parameters: companyId.",
  inputSchema: {
    type: 'object',
    properties: {
      companyId: {
        type: 'integer',
        description: 'Path parameter: companyId'
      }
    },
    required: [
      'companyId'
    ]
  }
};

// Tool handler
export async function handleDeleteCompany(input: any) {
  logger.info('Calling teamworkService.deleteCompany()');
  logger.info(`Company ID: ${input?.companyId}`);
  
  try {
    const companyId = input.companyId;
    
    if (!companyId) {
      throw new Error("Company ID is required");
    }
    
    const result = await teamworkService.deleteCompany(companyId);
    logger.info(`Company deleted successfully with ID: ${companyId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ success: result }, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in deleteCompany handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error deleting company: ${error.message}`
      }]
    };
  }
} 