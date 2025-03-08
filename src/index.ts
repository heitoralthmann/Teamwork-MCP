import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import logger from "./utils/logger.js";

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
      
      case "getCurrentProject":
        return await handleGetCurrentProject(input);
      
      case "createProject":
        return await handleCreateProject(input);
      
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