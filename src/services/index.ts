// Core exports
export * from './core/apiClient.ts';
export * from './core/types.ts';

// Project-related exports
import getProjects from './projects/getProjects.ts';
import getCurrentProjectId from './projects/getCurrentProjectId.ts';

// Task-related exports
import getTasks from './tasks/getTasks.ts';
import getTasksByProjectId from './tasks/getTasksByProjectId.ts';
import getTaskListsByProjectId from './tasks/getTaskListsByProjectId.ts';
import getTaskById from './tasks/getTaskById.ts';
import createTask from './tasks/createTask.ts';
import updateTask from './tasks/updateTask.ts';
import deleteTask from './tasks/deleteTask.ts';

// Re-export all functions
export { getProjects, getCurrentProjectId };
export { getTasks, getTasksByProjectId, getTaskListsByProjectId, getTaskById, createTask, updateTask, deleteTask };

// Default export with all services
export default {
  // Projects
  getProjects,
  getCurrentProjectId,
  
  // Tasks
  getTasks,
  getTasksByProjectId,
  getTaskListsByProjectId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}; 