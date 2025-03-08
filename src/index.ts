// Load environment variables from .env file or command line parameters
import fs from 'fs';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import logger from "./utils/logger.js";
import teamworkService from "./services/teamwork.js";
import config from "./utils/config.js";
import path from 'path';

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
    tools: [
      {name: "getProjects",
        description: "Get all projects from Teamwork",
        inputSchema: {
          type: "object",
          properties: {
            // String parameters
            updatedAfter: {
              type: "string",
              description: "Filter projects updated after this date-time (format: ISO 8601)"
            },
            timeMode: {
              type: "string",
              enum: ["timelogs", "estimated"],
              description: "Profitability time mode"
            },
            searchTerm: {
              type: "string",
              description: "Filter by project name"
            },
            reportType: {
              type: "string",
              enum: ["project", "health"],
              description: "Define the type of the report"
            },
            reportTimezone: {
              type: "string",
              description: "Configure the report dates displayed in a timezone"
            },
            reportFormat: {
              type: "string",
              enum: ["csv", "html", "pdf", "xls"],
              description: "Define the format of the report"
            },
            projectType: {
              type: "string",
              description: "Filter by project type"
            },
            orderMode: {
              type: "string",
              enum: ["asc", "desc"],
              description: "Order mode"
            },
            orderBy: {
              type: "string",
              enum: ["companyname", "datecreated", "duedate", "lastactivity", "name", "namecaseinsensitive", "ownercompany", "starred", "categoryname"],
              description: "Order by field"
            },
            notCompletedBefore: {
              type: "string",
              description: "Filter by projects that have not been completed before the given date (format: YYYY-MM-DD)"
            },
            minLastActivityDate: {
              type: "string",
              description: "Filter by min last activity date (format: YYYY-MM-DD)"
            },
            maxLastActivityDate: {
              type: "string",
              description: "Filter by max last activity date (format: YYYY-MM-DD)"
            },
            
            // Integer parameters
            userId: {
              type: "integer",
              description: "Filter by user id"
            },
            pageSize: {
              type: "integer",
              description: "Number of items in a page (not used when generating reports)"
            },
            page: {
              type: "integer",
              description: "Page number (not used when generating reports)"
            },
            orderByCustomFieldId: {
              type: "integer",
              description: "Order by custom field id when orderBy is equal to customfield"
            },
            minBudgetCapacityUsedPercent: {
              type: "integer",
              description: "Filter by minimum budget capacity used"
            },
            maxBudgetCapacityUsedPercent: {
              type: "integer",
              description: "Filter by maximum budget capacity used"
            },
            
            // Boolean parameters
            useFormulaFields: {
              type: "boolean",
              description: "Use formula fields"
            },
            skipCounts: {
              type: "boolean",
              description: "Skip doing counts on a list API endpoint for performance reasons"
            },
            searchCompanies: {
              type: "boolean",
              description: "Include companies in the search"
            },
            searchByLetter: {
              type: "boolean",
              description: "Search projects beginning with the search term character only when it contains a single character"
            },
            onlyStarredProjects: {
              type: "boolean",
              description: "Filter by starred projects only"
            },
            onlyProjectsWithExplicitMembership: {
              type: "boolean",
              description: "Only show projects with explicit membership"
            },
            onlyProjectsThatCanLogTime: {
              type: "boolean",
              description: "Can log time on projects"
            },
            onlyArchivedProjects: {
              type: "boolean",
              description: "Return only archived projects"
            },
            matchAllProjectTags: {
              type: "boolean",
              description: "Match all project tags"
            },
            matchAllExcludedTags: {
              type: "boolean",
              description: "Match all excluded project tags"
            },
            isReportDownload: {
              type: "boolean",
              description: "Generate a report document"
            },
            includeTentativeProjects: {
              type: "boolean",
              description: "Include alongside normal projects, tentative ones"
            },
            includeSubCategories: {
              type: "boolean",
              description: "Include sub categories when filtering by ids"
            },
            includeStats: {
              type: "boolean",
              description: "Include project status counts for tasks columns billing events milestones"
            },
            includeProjectUserInfo: {
              type: "boolean",
              description: "Fetch user-specific data such as isStarred"
            },
            includeProjectProfitability: {
              type: "boolean",
              description: "Include project profitability in response"
            },
            includeProjectDates: {
              type: "boolean",
              description: "Include minimum and maximum start/end dates for projects"
            },
            includeCustomFields: {
              type: "boolean",
              description: "Include custom fields"
            },
            includeCounts: {
              type: "boolean",
              description: "Include project related counts"
            },
            includeCompletedStatus: {
              type: "boolean",
              description: "Include completed projects when filtering by project statuses 'current,late'"
            },
            includeArchivedProjects: {
              type: "boolean",
              description: "Include archived projects"
            },
            hideObservedProjects: {
              type: "boolean",
              description: "Hide projects where the logged-in user is just an observer"
            },
            alwaysIncludeFiltering: {
              type: "boolean",
              description: "Includes filters when project ids are provided"
            },
            
            // Array parameters
            usersWithExplicitMembershipIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Only show projects that have an explicit common membership with provided user ids"
            },
            teamIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by projects that contain users associated with the team ids"
            },
            selectedColumns: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Select the columns to use in exports"
            },
            projectTagIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by project tag ids"
            },
            projectStatuses: {
              type: "array",
              items: {
                type: "string",
                enum: ["active", "current", "late", "upcoming", "completed", "deleted"]
              },
              description: "Filter by project status"
            },
            projectOwnerIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by project owner ids"
            },
            projectIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by project ids"
            },
            projectHealths: {
              type: "array",
              items: {
                type: "integer",
                enum: [0, 1, 2, 3]
              },
              description: "Filter by project healths (0: not set, 1: bad, 2: ok, 3: good)"
            },
            projectCompanyIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by company ids"
            },
            projectCategoryIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Filter by project category ids"
            },
            includeCustomFieldIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Include specific custom fields"
            },
            include: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Include related data (not used when generating reports)"
            },
            featuresEnabled: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Filter by projects that have features enabled"
            },
            excludeTagIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Exclude by project tag ids"
            },
            excludeProjectIds: {
              type: "array",
              items: {
                type: "integer"
              },
              description: "Exclude certain project ids"
            }
          },
          required: []
        }
      },
      {name: "getTaskListsByProjectId",
        description: "Get all task lists by project ID",
        inputSchema: {
          type: "object",
          properties: {
            "projectId": {
              type: "integer",
              description: "The ID of the project to get task lists from"
            }
          },
          required: ["projectId"]
        }
      },
      {name: "getTasks",
        description: "Get all tasks from Teamwork",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {name: "getTasksByProjectId",
        description: "Get all tasks from a specific project in Teamwork",
        inputSchema: {
          type: "object",
          properties: {
            projectId: {
              type: "integer",
              description: "The ID of the project to get tasks from"
            }
          },
          required: ["projectId"]
        }
      },
      {name: "getTaskById",
        description: "Get a specific task by ID from Teamwork",
        inputSchema: {
          type: "object",
          properties: {
            taskId: {
              type: "integer",
              description: "The ID of the task to retrieve"
            }
          },
          required: ["taskId"]
        }
      },
      {name: "createTask",
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
      {name: "updateTask",
        description: "Update an existing task in Teamwork",
        inputSchema: {
          type: "object",
          properties: {
            taskId: {
              type: "integer",
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
      {name: "deleteTask",
        description: "Delete a task from Teamwork",
        inputSchema: {
          type: "object",
          properties: {
            taskId: {
              type: "integer",
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
    
    const name = request.params.name;
    const input = request.params.arguments;
    
    switch (name) {
      case "getProjects": {
        logger.info('Calling teamworkService.getProjects()');
        logger.info(`Query parameters: ${JSON.stringify(input)}`);
        const projects = await teamworkService.getProjects(input);
        logger.info(`Projects response type: ${typeof projects}`);
        
        // Debug the response
        if (projects === null || projects === undefined) {
          logger.warn('Projects response is null or undefined');
        } else if (Array.isArray(projects)) {
          logger.info(`Projects array length: ${projects.length}`);
        } else {
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
        } catch (jsonError: any) {
          logger.error(`JSON stringify error: ${jsonError.message}`);
          return {
            content: [{
              type: "text",
              text: `Error converting response to JSON: ${jsonError.message}`
            }]
          };
        }
      }
      
      case "getTaskListsByProjectId": {
        try {
          const taskLists = await teamworkService.getTaskListsByProjectId(String(input?.projectId));
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
                text: `Error getting task lists for project ID: ${input?.projectId}`
              }]
            };
          } 
        } catch (error: any) {
          return {
            content: [{
              type: "text",
              text: `Error getting current project ID: ${error.message}`
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
        const projectId = String(input?.projectId);
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
        const taskId = String(input?.taskId);
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
        const taskData = input?.taskData;
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
        const taskId = String(input?.taskId);
        const taskData = input?.taskData;
        
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
        const taskId = String(input?.taskId);
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