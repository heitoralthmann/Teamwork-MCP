/**
 * createTask tool
 * Creates a new task in a Teamwork tasklist
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { TaskRequest, TaskTask } from "../../models/index.js";

// Tool definition
export const createTaskDefinition = {
  name: "createTask",
  description: "Create a new task in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      tasklistId: {
        type: "integer",
        description: "The ID of the tasklist to add the task to (required), if the user has not provided a tasklist ID, check to see if a TASKLISTID is stored in the `.teamwork` file, if not, check if there is a PROJECTID and call the `getTaskListsByProjectId` function, if there is only one tasklist, update the `.teamwork` file with the TASKLISTID and use it here, if there are more than one, ask the user which one to use and if they would like you to store a default tasklist, if they do ask you to store it, store the tasklistId in the `.teamwork` file. Either way, use their choice of tasklist. If they don't mind, try and figure out which one is likely to be the default and use that."
      },
      task: {
        type: "object",
        description: "The task data object",
        properties: {
          name: {
            type: "string",
            description: "The name/title of the task (required)"
          },
          description: {
            type: "string",
            description: "The description of the task"
          },
          descriptionContentType: {
            type: "string",
            description: "The content type of the description"
          },
          priority: {
            type: "object",
            description: "The priority of the task (low, medium, high)",
            properties: {
              Value: {
                type: "string",
                description: "The priority value (low, medium, high)"
              }
            }
          },
          startAt: {
            type: "object",
            description: "The start date of the task (format: YYYY-MM-DD)",
            properties: {
              Value: {
                type: "string",
                description: "The start date in YYYY-MM-DD format"
              }
            }
          },
          dueAt: {
            type: "object",
            description: "The due date of the task (format: YYYY-MM-DD)",
            properties: {
              Value: {
                type: "string",
                description: "The due date in YYYY-MM-DD format"
              }
            }
          },
          estimatedMinutes: {
            type: "integer",
            description: "The estimated time to complete the task in minutes"
          },
          assignees: {
            type: "object",
            description: "The users, companies, or teams assigned to the task",
            properties: {
              userIds: {
                type: "object",
                properties: {
                  Value: {
                    type: "array",
                    items: {
                      type: "integer"
                    },
                    description: "Array of user IDs to assign to the task"
                  }
                }
              },
              companyIds: {
                type: "object",
                properties: {
                  Value: {
                    type: "array",
                    items: {
                      type: "integer"
                    },
                    description: "Array of company IDs to assign to the task"
                  }
                }
              },
              teamIds: {
                type: "object",
                properties: {
                  Value: {
                    type: "array",
                    items: {
                      type: "integer"
                    },
                    description: "Array of team IDs to assign to the task"
                  }
                }
              }
            }
          },
          progress: {
            type: "integer",
            description: "The progress of the task (0-100)"
          },
          parentTaskId: {
            type: "integer",
            description: "The ID of the parent task (for subtasks)"
          },
          private: {
            type: "boolean",
            description: "Whether the task is private"
          },
          status: {
            type: "string",
            description: "The status of the task"
          },
          tagIds: {
            type: "array",
            items: {
              type: "integer"
            },
            description: "The IDs of tags to apply to the task"
          },
          reminders: {
            type: "array",
            items: {
              type: "object",
              properties: {
                isRelative: {
                  type: "boolean",
                  description: "Whether the reminder is relative to the due date"
                },
                note: {
                  type: "string",
                  description: "Note for the reminder"
                },
                relativeNumberDays: {
                  type: "integer",
                  description: "Number of days relative to the due date"
                },
                remindAt: {
                  type: "string",
                  description: "When to remind (date format)"
                },
                type: {
                  type: "string",
                  description: "Type of reminder"
                },
                userId: {
                  type: "integer",
                  description: "User ID to remind"
                }
              }
            },
            description: "Reminders for the task"
          },
          repeatOptions: {
            type: "object",
            properties: {
              duration: {
                type: "integer",
                description: "Duration of the repeat"
              },
              editOption: {
                type: "string",
                description: "Edit option for repeating tasks"
              },
              frequency: {
                type: "object",
                properties: {
                  Value: {
                    type: "string",
                    description: "Frequency of repetition (daily, weekly, monthly, etc.)"
                  }
                }
              },
              rrule: {
                type: "string",
                description: "RRule definition for repeating tasks"
              }
            },
            description: "Options for repeating tasks"
          },
          customFields: {
            type: "object",
            properties: {
              Values: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    customfieldId: {
                      type: "integer",
                      description: "ID of the custom field"
                    },
                    value: {
                      type: "string",
                      description: "Value of the custom field"
                    }
                  }
                }
              }
            },
            description: "Custom fields for the task"
          }
        }
      },
      taskOptions: {
        type: "object",
        description: "Options for task creation",
        properties: {
          notify: {
            type: "boolean",
            description: "Whether to notify assignees"
          },
          appendAssignees: {
            type: "boolean",
            description: "Whether to append assignees to existing ones"
          },
          everyoneMustDo: {
            type: "boolean",
            description: "Whether everyone must do the task"
          },
          parseInlineTags: {
            type: "boolean",
            description: "Whether to parse inline tags in the task name/description"
          },
          useDefaults: {
            type: "boolean",
            description: "Whether to use default values"
          }
        }
      },
      predecessors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID of the predecessor task"
            },
            type: {
              type: "string",
              description: "Type of predecessor relationship"
            }
          }
        },
        description: "Predecessor tasks that must be completed before this task"
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the tag"
            },
            color: {
              type: "string",
              description: "Color of the tag"
            }
          }
        },
        description: "Tags to create and apply to the task"
      }
    },
    required: ["tasklistId"]
  }
};

// Tool handler
export async function handleCreateTask(input: any) {
  logger.info('Calling teamworkService.createTask()');
  logger.info(`Tasklist ID: ${input?.tasklistId}`);
  logger.info(`Task data: ${JSON.stringify(input)}`);
  
  try {
    const tasklistId = String(input?.tasklistId);
    
    if (!tasklistId) {
      throw new Error("Tasklist ID is required");
    }
    
    // Create a TaskRequest object from the input
    const taskRequest: TaskRequest = {};
    
    // If task data is provided, add it to the request
    if (input.task) {
      taskRequest.task = input.task as TaskTask;
    } else {
      // If no task object is provided, create one with at least a name
      taskRequest.task = {
        name: input.name || "New Task"
      };
    }
    
    // If task options are provided, add them to the request
    if (input.taskOptions) {
      taskRequest.taskOptions = input.taskOptions;
    }
    
    // If tags are provided, add them to the request
    if (input.tags) {
      taskRequest.tags = input.tags;
    }
    
    // If predecessors are provided, add them to the request
    if (input.predecessors) {
      taskRequest.predecessors = input.predecessors;
    }
    
    const createdTask = await teamworkService.createTask(tasklistId, taskRequest);
    logger.info(`Task created successfully in tasklist ID: ${tasklistId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(createdTask, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in createTask handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error creating task: ${error.message}`
      }]
    };
  }
} 