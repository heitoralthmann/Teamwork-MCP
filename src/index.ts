// Load environment variables from .env file or command line parameters
import fs from 'fs';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import logger from "./utils/logger.ts";
import config from "./utils/config.ts";
import path from 'path';

// Import tool definitions and handlers
import { toolDefinitions, 
  handleGetProjects,
  handleGetCurrentProjectId,
  handleGetTasks,
  handleGetTasksByProjectId,
  handleGetTaskById,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleGetTaskListsByProjectId
} from "./tools/index.ts";

// Check for teamwork.config.json file for additional configuration
const configPath = 'teamwork.config.json';

// Write all the process.env variables to the logger
logger.info(`process.env: ${JSON.stringify(process.env)}`);

logger.info(`process.argv: ${JSON.stringify(process.argv)}`);

var solutionRootPath = process.env.SOLUTION_ROOT_PATH ?? "";

var solutionRootPathToo = path.resolve(solutionRootPath);

logger.info(`solutionRootPathToo: ${solutionRootPathToo}`);

// If we have a config file and no project ID is set yet, try to load it
if (!config.projectId && fs.existsSync(configPath)) {
  try {
    const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (fileConfig.teamworkProjectId) {
      process.env.TEAMWORK_PROJECT_ID = fileConfig.teamworkProjectId;
      logger.info(`Using Teamwork project ID from config file: ${fileConfig.teamworkProjectId}`);
    }
  } catch (error) {
    logger.warn(`Failed to parse ${configPath}: ${error}`);
  }
}

// Exit if configuration is not valid
if (!config.isValid) {
  process.exit(1);
}

// Create MCP server
const server = new Server(
  {
    name: 'teamwork-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes tools for interacting with Teamwork API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolDefinitions
  };
});

/**
 * Handler for tool calls.
 * Processes requests to call Teamwork API tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    logger.info(`Tool call received: ${request.params.name}`);
    logger.info(`Tool arguments: ${JSON.stringify(request.params.arguments || {})}`);
    
    const name = request.params.name;
    const input = request.params.arguments;
    
    switch (name) {
      case "getProjects":
        return await handleGetProjects(input);
      
      case "getCurrentProjectId":
        return await handleGetCurrentProjectId();
      
      case "getTasks":
        return await handleGetTasks();
      
      case "getTasksByProjectId":
        return await handleGetTasksByProjectId(input);

      case "getTaskById":
        return await handleGetTaskById(input);
      
      case "createTask":
        return await handleCreateTask(input);
      
      case "updateTask":
        return await handleUpdateTask(input);
      
      case "deleteTask":
        return await handleDeleteTask(input);
      
      case "getTaskListsByProjectId":
        return await handleGetTaskListsByProjectId(input);
      
      default:
        throw new Error("Unknown tool");
    }
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
    // Connect using stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);    
}

main().catch((error) => {
  logger.error("Server error:", error);
  process.exit(1);
});