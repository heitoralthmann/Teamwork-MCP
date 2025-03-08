// Core exports
export * from './core/apiClient.js';
export * from './core/types.js';

// Project-related exports
import getProjects from './projects/getProjects.js';
import getCurrentProject from './projects/getCurrentProject.js';

// Task-related exports
import getTasks from './tasks/getTasks.js';
import getTasksByProjectId from './tasks/getTasksByProjectId.js';
import getTaskListsByProjectId from './tasks/getTaskListsByProjectId.js';
import getTaskById from './tasks/getTaskById.js';
import createTask from './tasks/createTask.js';
import updateTask from './tasks/updateTask.js';
import deleteTask from './tasks/deleteTask.js';

// Re-export all functions
export { getProjects, getCurrentProject };
export { getTasks, getTasksByProjectId, getTaskListsByProjectId, getTaskById, createTask, updateTask, deleteTask };

// Default export with all services
export default {
  // Projects
  getProjects,
  getCurrentProject,
  
  // Tasks
  getTasks,
  getTasksByProjectId,
  getTaskListsByProjectId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}; 