/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

import { getProjectsDefinition } from './projects/getProjects.js';
import { getCurrentProjectDefinition } from './projects/getCurrentProject.js';
import { getTasksDefinition } from './tasks/getTasks.js';
import { getTasksByProjectIdDefinition } from './tasks/getTasksByProjectId.js';
import { getTaskByIdDefinition } from './tasks/getTaskById.js';
import { createTaskDefinition } from './tasks/createTask.js';
import { updateTaskDefinition } from './tasks/updateTask.js';
import { deleteTaskDefinition } from './tasks/deleteTask.js';
import { getTaskListsByProjectIdDefinition } from './tasks/getTaskListsByProjectId.js';

// Tool definitions array
export const toolDefinitions = [
  getProjectsDefinition,
  getCurrentProjectDefinition,
  getTasksDefinition,
  getTasksByProjectIdDefinition,
  getTaskByIdDefinition,
  createTaskDefinition,
  updateTaskDefinition,
  deleteTaskDefinition,
  getTaskListsByProjectIdDefinition,
];

// Export all tool handlers
export { handleGetProjects } from './projects/getProjects.js';
export { handleGetCurrentProject } from './projects/getCurrentProject.js';
export { handleGetTasks } from './tasks/getTasks.js';
export { handleGetTasksByProjectId } from './tasks/getTasksByProjectId.js';
export { handleGetTaskById } from './tasks/getTaskById.js';
export { handleCreateTask } from './tasks/createTask.js';
export { handleUpdateTask } from './tasks/updateTask.js';
export { handleDeleteTask } from './tasks/deleteTask.js';
export { handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.js'; 