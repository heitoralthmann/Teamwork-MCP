/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

import { getProjectsDefinition } from './projects/getProjects.ts';
import { getCurrentProjectIdDefinition } from './projects/getCurrentProjectId.ts';
import { getTasksDefinition } from './tasks/getTasks.ts';
import { getTasksByProjectIdDefinition } from './tasks/getTasksByProjectId.ts';
import { getTaskByIdDefinition } from './tasks/getTaskById.ts';
import { createTaskDefinition } from './tasks/createTask.ts';
import { updateTaskDefinition } from './tasks/updateTask.ts';
import { deleteTaskDefinition } from './tasks/deleteTask.ts';
import { getTaskListsByProjectIdDefinition } from './tasks/getTaskListsByProjectId.ts';

// Tool definitions array
export const toolDefinitions = [
  getProjectsDefinition,
  getCurrentProjectIdDefinition,
  getTasksDefinition,
  getTasksByProjectIdDefinition,
  getTaskByIdDefinition,
  createTaskDefinition,
  updateTaskDefinition,
  deleteTaskDefinition,
  getTaskListsByProjectIdDefinition,
];

// Export all tool handlers
export { handleGetProjects } from './projects/getProjects.ts';
export { handleGetCurrentProjectId } from './projects/getCurrentProjectId.ts';
export { handleGetTasks } from './tasks/getTasks.ts';
export { handleGetTasksByProjectId } from './tasks/getTasksByProjectId.ts';
export { handleGetTaskById } from './tasks/getTaskById.ts';
export { handleCreateTask } from './tasks/createTask.ts';
export { handleUpdateTask } from './tasks/updateTask.ts';
export { handleDeleteTask } from './tasks/deleteTask.ts';
export { handleGetTaskListsByProjectId } from './tasks/getTaskListsByProjectId.ts'; 