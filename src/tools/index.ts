/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

import { getProjectsDefinition, handleGetProjects } from './projects/getProjects.js';
import { getCurrentProjectDefinition, handleGetCurrentProject } from './projects/getCurrentProject.js';
import { createProjectDefinition, handleCreateProject } from './projects/createProject.js';
import { getTasksDefinition, handleGetTasks } from './tasks/getTasks.js';
import { getTasksByProjectIdDefinition, handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
import { getTaskByIdDefinition, handleGetTaskById } from './tasks/getTaskById.js';
import { createTaskDefinition, handleCreateTask } from './tasks/createTask.js';
import { createSubTaskDefinition, handleCreateSubTask } from './tasks/createSubTask.js';
import { updateTaskDefinition, handleUpdateTask } from './tasks/updateTask.js';
import { deleteTaskDefinition, handleDeleteTask } from './tasks/deleteTask.js';
import { getTaskListsByProjectIdDefinition, handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js';
import { getTasksByTaskListIdDefinition, handleGetTasksByTaskListId } from './tasks/getTasksByTaskListId.js';
import { getTasksMetricsCompleteDefinition, handleGetTasksMetricsComplete } from './tasks/getTasksMetricsComplete.js';
import { getTasksMetricsLateDefinition, handleGetTasksMetricsLate } from './tasks/getTasksMetricsLate.js';
import { getTaskSubtasksDefinition, handleGetTaskSubtasks } from './tasks/getTaskSubtasks.js';

// Define a structure that pairs tool definitions with their handlers
interface ToolPair {
  definition: any;
  handler: Function;
}

// Create an array of tool pairs
const toolPairs: ToolPair[] = [
  { definition: getProjectsDefinition, handler: handleGetProjects },
  { definition: getCurrentProjectDefinition, handler: handleGetCurrentProject },
  { definition: createProjectDefinition, handler: handleCreateProject },
  { definition: getTasksDefinition, handler: handleGetTasks },
  { definition: getTasksByProjectIdDefinition, handler: handleGetTasksByProjectId },
  { definition: getTaskByIdDefinition, handler: handleGetTaskById },
  { definition: createTaskDefinition, handler: handleCreateTask },
  { definition: createSubTaskDefinition, handler: handleCreateSubTask },
  { definition: updateTaskDefinition, handler: handleUpdateTask },
  { definition: deleteTaskDefinition, handler: handleDeleteTask },
  { definition: getTaskListsByProjectIdDefinition, handler: handleGetTaskListsByProjectId },
  { definition: getTasksByTaskListIdDefinition, handler: handleGetTasksByTaskListId },
  { definition: getTasksMetricsCompleteDefinition, handler: handleGetTasksMetricsComplete },
  { definition: getTasksMetricsLateDefinition, handler: handleGetTasksMetricsLate },
  { definition: getTaskSubtasksDefinition, handler: handleGetTaskSubtasks }
];

// Extract just the definitions for the toolDefinitions array
export const toolDefinitions = toolPairs.map(pair => pair.definition);

// Create a map of tool names to their handler functions
export const toolHandlersMap: Record<string, Function> = toolPairs.reduce((map, pair) => {
  map[pair.definition.name] = pair.handler;
  return map;
}, {} as Record<string, Function>);

// Export all tool handlers
export { handleGetProjects } from './projects/getProjects.js';
export { handleGetCurrentProject } from './projects/getCurrentProject.js';
export { handleCreateProject } from './projects/createProject.js';
export { handleGetTasks } from './tasks/getTasks.js';
export { handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
export { handleGetTaskById } from './tasks/getTaskById.js';
export { handleCreateTask } from './tasks/createTask.js';
export { handleCreateSubTask } from './tasks/createSubTask.js';
export { handleUpdateTask } from './tasks/updateTask.js';
export { handleDeleteTask } from './tasks/deleteTask.js';
export { handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js';
export { handleGetTasksByTaskListId } from './tasks/getTasksByTaskListId.js';
export { handleGetTasksMetricsComplete } from './tasks/getTasksMetricsComplete.js';
export { handleGetTasksMetricsLate } from './tasks/getTasksMetricsLate.js';
export { handleGetTaskSubtasks } from './tasks/getTaskSubtasks.js'; 