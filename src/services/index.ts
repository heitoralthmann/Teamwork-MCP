// Core exports
export * from './core/apiClient.js';
export * from './core/types.js';

// Project-related exports
import getProjects from './projects/getProjects.js';
import getCurrentProject from './projects/getCurrentProject.js';
import createProject , { CreateProjectData } from './projects/createProject.js';

// Task-related exports
import getTasks from './tasks/getTasks.js';
import getTasksByProjectId from './tasks/getTasksByProjectId.js';
import getTaskListsByProjectId from './tasks/getTaskListsByProjectId.js';
import getTaskById from './tasks/getTaskById.js';
import createTask from './tasks/createTask.js';
import updateTask from './tasks/updateTask.js';
import deleteTask from './tasks/deleteTask.js';

// Re-export all functions
export { getProjects, getCurrentProject, createProject, CreateProjectData };
export { getTasks, getTasksByProjectId, getTaskListsByProjectId, getTaskById, createTask, updateTask, deleteTask };

// Default export with all services
export default {
  // Projects
  getProjects,
  getCurrentProject,
  createProject,
  
  // Tasks
  getTasks,
  getTasksByProjectId,
  getTaskListsByProjectId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};  