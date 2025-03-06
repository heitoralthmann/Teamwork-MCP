const teamworkService = require('../services/teamwork');
const logger = require('../utils/logger');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await teamworkService.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    logger.error(`Error fetching projects: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await teamworkService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    logger.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await teamworkService.getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    logger.error(`Error fetching task: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await teamworkService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    logger.error(`Error creating task: ${error.message}`);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const updatedTask = await teamworkService.updateTask(taskId, taskData);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    logger.error(`Error updating task: ${error.message}`);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const result = await teamworkService.deleteTask(taskId);
    
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting task: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};