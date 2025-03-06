const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const teamworkService = require('./services/teamwork');
const logger = require('./utils/logger');

// Define tool schemas
const getProjectsToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'getProjects' },
    description: { const: 'Get all projects from Teamwork' },
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  required: ['name', 'description', 'parameters']
};

const getTasksToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'getTasks' },
    description: { const: 'Get all tasks from Teamwork' },
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  required: ['name', 'description', 'parameters']
};

const getTaskByIdToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'getTaskById' },
    description: { const: 'Get a specific task by ID from Teamwork' },
    parameters: {
      type: 'object',
      properties: {
        taskId: {
          type: 'string',
          description: 'The ID of the task to retrieve'
        }
      },
      required: ['taskId']
    }
  },
  required: ['name', 'description', 'parameters']
};

const createTaskToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'createTask' },
    description: { const: 'Create a new task in Teamwork' },
    parameters: {
      type: 'object',
      properties: {
        taskData: {
          type: 'object',
          description: 'The task data to create'
        }
      },
      required: ['taskData']
    }
  },
  required: ['name', 'description', 'parameters']
};

const updateTaskToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'updateTask' },
    description: { const: 'Update an existing task in Teamwork' },
    parameters: {
      type: 'object',
      properties: {
        taskId: {
          type: 'string',
          description: 'The ID of the task to update'
        },
        taskData: {
          type: 'object',
          description: 'The updated task data'
        }
      },
      required: ['taskId', 'taskData']
    }
  },
  required: ['name', 'description', 'parameters']
};

const deleteTaskToolSchema = {
  type: 'object',
  properties: {
    name: { const: 'deleteTask' },
    description: { const: 'Delete a task from Teamwork' },
    parameters: {
      type: 'object',
      properties: {
        taskId: {
          type: 'string',
          description: 'The ID of the task to delete'
        }
      },
      required: ['taskId']
    }
  },
  required: ['name', 'description', 'parameters']
};

// Create MCP server
const server = new Server({
  name: 'teamwork-api-connector',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

// Register tools
server.registerTool(getProjectsToolSchema, async () => {
  try {
    const projects = await teamworkService.getProjects();
    return { result: projects };
  } catch (error) {
    logger.error(`MCP getProjects error: ${error.message}`);
    throw new Error(`Failed to get projects: ${error.message}`);
  }
});

server.registerTool(getTasksToolSchema, async () => {
  try {
    const tasks = await teamworkService.getTasks();
    return { result: tasks };
  } catch (error) {
    logger.error(`MCP getTasks error: ${error.message}`);
    throw new Error(`Failed to get tasks: ${error.message}`);
  }
});

server.registerTool(getTaskByIdToolSchema, async ({ taskId }) => {
  try {
    const task = await teamworkService.getTaskById(taskId);
    return { result: task };
  } catch (error) {
    logger.error(`MCP getTaskById error: ${error.message}`);
    throw new Error(`Failed to get task: ${error.message}`);
  }
});

server.registerTool(createTaskToolSchema, async ({ taskData }) => {
  try {
    const newTask = await teamworkService.createTask(taskData);
    return { result: newTask };
  } catch (error) {
    logger.error(`MCP createTask error: ${error.message}`);
    throw new Error(`Failed to create task: ${error.message}`);
  }
});

server.registerTool(updateTaskToolSchema, async ({ taskId, taskData }) => {
  try {
    const updatedTask = await teamworkService.updateTask(taskId, taskData);
    return { result: updatedTask };
  } catch (error) {
    logger.error(`MCP updateTask error: ${error.message}`);
    throw new Error(`Failed to update task: ${error.message}`);
  }
});

server.registerTool(deleteTaskToolSchema, async ({ taskId }) => {
  try {
    const result = await teamworkService.deleteTask(taskId);
    return { result };
  } catch (error) {
    logger.error(`MCP deleteTask error: ${error.message}`);
    throw new Error(`Failed to delete task: ${error.message}`);
  }
});

// Start the MCP server
async function startMcpServer() {
  try {
    logger.info('Starting Teamwork API MCP server...');
    
    // Connect using stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    logger.info('Teamwork API MCP server started successfully');
  } catch (error) {
    logger.error(`Failed to start MCP server: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { startMcpServer }; 