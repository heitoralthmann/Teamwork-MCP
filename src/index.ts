import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import logger from "./utils/logger.js";
import config, { filterTools } from "./utils/config.js";
import { ensureApiClient } from "./services/core/apiClient.js";

// Import tool definitions and handlers
import { toolDefinitions, 
  handleGetProjects,
  handleGetCurrentProject,
  handleCreateProject,
  handleGetTasks,
  handleGetTasksByProjectId,
  handleGetTaskById,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleGetTaskListsByProjectId
} from "./tools/index.js";

// Create MCP server
const server = new Server(
  {
    name: 'teamwork-mcp',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Validates and sanitizes a response to ensure it can be properly serialized
 * @param response The response to validate
 * @returns A sanitized response that can be safely serialized
 */
function validateResponse(response: any): any {
  // If response is null or undefined, return a default response
  if (response === null || response === undefined) {
    logger.warn('Response is null or undefined, returning default response');
    return {
      content: [{
        type: "text",
        text: "Operation completed, but no response data was returned."
      }]
    };
  }
  
  // Check if response has the expected structure
  if (!response.content || !Array.isArray(response.content)) {
    logger.warn('Response is missing content array, wrapping in proper format');
    return {
      content: [{
        type: "text",
        text: typeof response === 'object' ? JSON.stringify(response) : String(response)
      }]
    };
  }
  
  // Validate each content item
  const validContent = response.content.map((item: any) => {
    if (!item || typeof item !== 'object') {
      return { type: "text", text: String(item) };
    }
    
    if (!item.type) {
      item.type = "text";
    }
    
    if (!item.text) {
      item.text = item.type === "text" ? "No text content" : "";
    }
    
    return item;
  });
  
  // Return sanitized response
  return {
    content: validContent
  };
}

/**
 * Handler that lists available tools.
 * Exposes tools for interacting with Teamwork API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Filter tools based on allow and deny lists
  const filteredTools = filterTools(toolDefinitions, config.allowTools, config.denyTools);
  
  logger.info(`Exposing ${filteredTools.length} of ${toolDefinitions.length} available tools`);
  
  return {
    tools: filteredTools
  };
});

/**
 * Handler for tool calls.
 * Processes requests to call Teamwork API tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const name = request.params.name;
    const input = request.params.arguments;
    
    logger.info(`Tool call received: ${name}`);
    logger.info(`Tool arguments: ${JSON.stringify(input || {})}`);
    
    // Check if the tool is allowed based on allow/deny lists
    const isToolAllowed = filterTools(
      toolDefinitions.filter(tool => tool.name === name),
      config.allowTools,
      config.denyTools
    ).length > 0;
    
    if (!isToolAllowed) {
      logger.error(`Tool call rejected: ${name} is not in the allowed tools list or is in the denied tools list`);
      throw new Error(`Tool '${name}' is not available. Check your allow/deny list configuration.`);
    }
    
    let response;
    
    switch (name) {
      case "getProjects":
        response = await handleGetProjects(input);
        break;
      
      case "getCurrentProject":
        response = await handleGetCurrentProject(input);
        break;
      
      case "createProject":
        response = await handleCreateProject(input);
        break;
      
      case "getTasks":
        response = await handleGetTasks();
        break;
      
      case "getTasksByProjectId":
        response = await handleGetTasksByProjectId(input);
        break;

      case "getTaskById":
        response = await handleGetTaskById(input);
        break;

      case "createTask":
        response = await handleCreateTask(input);
        break;
      
      case "updateTask":
        response = await handleUpdateTask(input);
        break;
      
      case "deleteTask":
        response = await handleDeleteTask(input);
        break;
      
      case "getTaskListsByProjectId":
        response = await handleGetTaskListsByProjectId(input);
        break;
      
      default:
        throw new Error("Unknown tool");
    }
    
    // Log the response for debugging
    logger.info(`Tool response structure: ${JSON.stringify(Object.keys(response || {}))}`);
    try {
      const responseStr = JSON.stringify(response);
      logger.info(`Tool response JSON (first 200 chars): ${responseStr.substring(0, 200)}...`);
      
      // Validate that the response can be parsed back
      JSON.parse(responseStr);
      logger.info("Response JSON is valid");
    } catch (jsonError: any) {
      logger.error(`Invalid JSON in response: ${jsonError.message}`);
      logger.error(`Response that caused error: ${JSON.stringify(response)}`);
      
      // Sanitize the response
      response = validateResponse(response);
      logger.info("Response sanitized");
    }
    
    // Final validation to ensure response is properly formatted
    response = validateResponse(response);
    
    return response;
  } catch (error: any) {
    logger.error(`MCP tool error: ${error.message}`);
    throw new Error(`Tool execution failed: ${error.message}`);
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
    try {
        // Log startup information to file only
        logger.info('=== Teamwork MCP Server Starting ===');
        logger.info(`Server name: teamwork-mcp`);
        logger.info(`Server version: 1.0.0`);
        logger.info(`Node.js version: ${process.version}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        
        // Log configuration status
        logger.info('Configuration status:');
        logger.info(`- Teamwork domain: ${config.domain || 'Not set'}`);
        logger.info(`- API URL: ${config.apiUrl || 'Not set'}`);
        logger.info(`- Username: ${config.username ? 'Set' : 'Not set'}`);
        logger.info(`- Password: ${config.password ? 'Set' : 'Not set'}`);
        logger.info(`- Project ID: ${config.projectId || 'Not set'}`);
        logger.info(`- Allow tools: ${config.allowTools || 'All tools allowed'}`);
        logger.info(`- Deny tools: ${config.denyTools || 'No tools denied'}`);
        
        // Validate configuration
        if (!config.isValid) {
            logger.error('Invalid configuration. Please check your settings.');
            process.exit(1);
        }
        
        // Test API connection
        try {
            const api = ensureApiClient();
            logger.info('API client initialized successfully');
        } catch (apiError: any) {
            logger.error(`API client initialization failed: ${apiError.message}`);
            process.exit(1);
        }
        
        // Connect using stdio transport - no console output
        logger.info('Connecting to stdio transport...');
        const transport = new StdioServerTransport();
        await server.connect(transport);
        logger.info('Server connected to stdio transport successfully');
        logger.info('=== Teamwork MCP Server Ready ===');
    } catch (error: any) {
        logger.error(`Server startup error: ${error.message}`);
        if (error.stack) {
            logger.error(`Stack trace: ${error.stack}`);
        }
        process.exit(1);
    }
}

main().catch((error) => {
    logger.error("Unhandled server error:", error);
    if (error.stack) {
        logger.error(`Stack trace: ${error.stack}`);
    }
    process.exit(1);
});