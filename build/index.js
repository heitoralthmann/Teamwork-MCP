// Load environment variables from .env file or command line parameters
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import teamworkService from "./services/teamwork.js";
import logger from "./utils/logger.js";
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname);
logger.info(`__filename: ${__filename}`);
logger.info(`__dirname: ${__dirname}`);
logger.info(`Dir: ${dir}`);
// Parse command line arguments
const argv = minimist(process.argv.slice(2), {
    string: ['teamwork-api-url', 'teamwork-username', 'teamwork-password'],
    alias: {
        'url': 'teamwork-api-url',
        'user': 'teamwork-username',
        'pass': 'teamwork-password'
    }
});
// Try to load environment variables from .env file if they're not already set
if (!process.env.TEAMWORK_API_URL || !process.env.TEAMWORK_USERNAME || !process.env.TEAMWORK_PASSWORD) {
    try {
        dotenv.config({ path: path.resolve(dir, '.env') });
        logger.info('Attempted to load environment variables from .env file');
    }
    catch (error) {
        logger.warn('Failed to load .env file, will use environment variables or command line arguments');
    }
}
// Set environment variables from command line arguments if provided
if (argv['teamwork-api-url']) {
    process.env.TEAMWORK_API_URL = argv['teamwork-api-url'];
    logger.info('Using TEAMWORK_API_URL from command line argument');
}
else if (argv['url']) {
    process.env.TEAMWORK_API_URL = argv['url'];
    logger.info('Using TEAMWORK_API_URL from short form command line argument');
}
if (argv['teamwork-username']) {
    process.env.TEAMWORK_USERNAME = argv['teamwork-username'];
    logger.info('Using TEAMWORK_USERNAME from command line argument');
}
else if (argv['user']) {
    process.env.TEAMWORK_USERNAME = argv['user'];
    logger.info('Using TEAMWORK_USERNAME from short form command line argument');
}
if (argv['teamwork-password']) {
    process.env.TEAMWORK_PASSWORD = argv['teamwork-password'];
    logger.info('Using TEAMWORK_PASSWORD from command line argument');
}
else if (argv['pass']) {
    process.env.TEAMWORK_PASSWORD = argv['pass'];
    logger.info('Using TEAMWORK_PASSWORD from short form command line argument');
}
// Check if required environment variables are set
if (!process.env.TEAMWORK_API_URL || !process.env.TEAMWORK_USERNAME || !process.env.TEAMWORK_PASSWORD) {
    logger.error('Required environment variables are not set. Please provide TEAMWORK_API_URL, TEAMWORK_USERNAME, and TEAMWORK_PASSWORD');
    logger.error('You can set these via:');
    logger.error('1. Environment variables');
    logger.error('2. .env file');
    logger.error('3. Command line arguments: --teamwork-api-url, --teamwork-username, --teamwork-password');
    logger.error('   or short form: --url, --user, --pass');
    process.exit(1);
}
else {
    logger.info('Environment variables loaded successfully');
    logger.info('TEAMWORK_API_URL:', process.env.TEAMWORK_API_URL);
    logger.info('TEAMWORK_USERNAME:', process.env.TEAMWORK_USERNAME);
    logger.info('TEAMWORK_PASSWORD length:', process.env.TEAMWORK_PASSWORD ? process.env.TEAMWORK_PASSWORD.length : 0);
}
// Create MCP server
const server = new Server({
    name: 'teamwork-mcp',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * Handler that lists available tools.
 * Exposes tools for interacting with Teamwork API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "getProjects",
                description: "Get all projects from Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            },
            {
                name: "getTasks",
                description: "Get all tasks from Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            },
            {
                name: "getTasksByProjectId",
                description: "Get all tasks from a specific project in Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectId: {
                            type: "string",
                            description: "The ID of the project to get tasks from"
                        }
                    },
                    required: ["projectId"]
                }
            },
            {
                name: "getTaskById",
                description: "Get a specific task by ID from Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {
                        taskId: {
                            type: "string",
                            description: "The ID of the task to retrieve"
                        }
                    },
                    required: ["taskId"]
                }
            },
            {
                name: "createTask",
                description: "Create a new task in Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {
                        taskData: {
                            type: "object",
                            description: "The task data to create"
                        }
                    },
                    required: ["taskData"]
                }
            },
            {
                name: "updateTask",
                description: "Update an existing task in Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {
                        taskId: {
                            type: "string",
                            description: "The ID of the task to update"
                        },
                        taskData: {
                            type: "object",
                            description: "The updated task data"
                        }
                    },
                    required: ["taskId", "taskData"]
                }
            },
            {
                name: "deleteTask",
                description: "Delete a task from Teamwork",
                inputSchema: {
                    type: "object",
                    properties: {
                        taskId: {
                            type: "string",
                            description: "The ID of the task to delete"
                        }
                    },
                    required: ["taskId"]
                }
            }
        ]
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
        switch (request.params.name) {
            case "getProjects": {
                logger.info('Calling teamworkService.getProjects()');
                const projects = await teamworkService.getProjects();
                logger.info(`Projects response type: ${typeof projects}`);
                // Debug the response
                if (projects === null || projects === undefined) {
                    logger.warn('Projects response is null or undefined');
                }
                else if (Array.isArray(projects)) {
                    logger.info(`Projects array length: ${projects.length}`);
                }
                else {
                    logger.info(`Projects response is not an array: ${JSON.stringify(projects).substring(0, 200)}...`);
                }
                try {
                    const jsonString = JSON.stringify(projects, null, 2);
                    logger.info(`Successfully stringified projects response`);
                    return {
                        content: [{
                                type: "text",
                                text: jsonString
                            }]
                    };
                }
                catch (jsonError) {
                    logger.error(`JSON stringify error: ${jsonError.message}`);
                    return {
                        content: [{
                                type: "text",
                                text: `Error converting response to JSON: ${jsonError.message}`
                            }]
                    };
                }
            }
            case "getTasks": {
                const tasks = await teamworkService.getTasks();
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(tasks, null, 2)
                        }]
                };
            }
            case "getTasksByProjectId": {
                const projectId = String(request.params.arguments?.projectId);
                if (!projectId) {
                    throw new Error("Project ID is required");
                }
                const tasks = await teamworkService.getTasksByProjectId(projectId);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(tasks, null, 2)
                        }]
                };
            }
            case "getTaskById": {
                const taskId = String(request.params.arguments?.taskId);
                if (!taskId) {
                    throw new Error("Task ID is required");
                }
                const task = await teamworkService.getTaskById(taskId);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(task, null, 2)
                        }]
                };
            }
            case "createTask": {
                const taskData = request.params.arguments?.taskData;
                if (!taskData) {
                    throw new Error("Task data is required");
                }
                const newTask = await teamworkService.createTask(taskData);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(newTask, null, 2)
                        }]
                };
            }
            case "updateTask": {
                const taskId = String(request.params.arguments?.taskId);
                const taskData = request.params.arguments?.taskData;
                if (!taskId || !taskData) {
                    throw new Error("Task ID and task data are required");
                }
                const updatedTask = await teamworkService.updateTask(taskId, taskData);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify(updatedTask, null, 2)
                        }]
                };
            }
            case "deleteTask": {
                const taskId = String(request.params.arguments?.taskId);
                if (!taskId) {
                    throw new Error("Task ID is required");
                }
                const result = await teamworkService.deleteTask(taskId);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify({ success: result }, null, 2)
                        }]
                };
            }
            default:
                throw new Error("Unknown tool");
        }
    }
    catch (error) {
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
