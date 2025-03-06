const axios = require('axios');
const logger = require('../utils/logger');

// Configure Teamwork API client
const teamworkApi = axios.create({
  baseURL: process.env.TEAMWORK_API_URL,
  headers: {
    'Authorization': `Basic ${Buffer.from(process.env.TEAMWORK_USERNAME + ':' + process.env.TEAMWORK_PASSWORD).toString('base64')}`,
    'Content-Type': 'application/json'
  }
});

// Get all projects
exports.getProjects = async () => {
  try {
    const response = await teamworkApi.get('/projects.json');
    return response.data.projects;
  } catch (error) {
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error('Failed to fetch projects from Teamwork API');
  }
};

// Get all tasks
exports.getTasks = async () => {
  try {
    const response = await teamworkApi.get('/tasks.json');
    return response.data.tasks;
  } catch (error) {
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error('Failed to fetch tasks from Teamwork API');
  }
};

// Get task by ID
exports.getTaskById = async (taskId) => {
  try {
    const response = await teamworkApi.get(`/tasks/${taskId}.json`);
    return response.data.task;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error(`Failed to fetch task ${taskId} from Teamwork API`);
  }
};

// Create a new task
exports.createTask = async (taskData) => {
  try {
    const response = await teamworkApi.post('/tasks.json', {
      'todo-item': taskData
    });
    return response.data;
  } catch (error) {
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error('Failed to create task in Teamwork API');
  }
};

// Update a task
exports.updateTask = async (taskId, taskData) => {
  try {
    const response = await teamworkApi.put(`/tasks/${taskId}.json`, {
      'todo-item': taskData
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error(`Failed to update task ${taskId} in Teamwork API`);
  }
};

// Delete a task
exports.deleteTask = async (taskId) => {
  try {
    await teamworkApi.delete(`/tasks/${taskId}.json`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    logger.error(`Teamwork API error: ${error.message}`);
    throw new Error(`Failed to delete task ${taskId} in Teamwork API`);
  }
};