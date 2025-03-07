import teamworkService from '../services/teamwork.js';
import logger from '../utils/logger.js';

// Get all projects
export const getProjects = async (req: any, res: any) => {
  try {
    const projects = await teamworkService.getProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    logger.error(`Error fetching projects: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get all tasks
export const getTasks = async (req: any, res: any) => {
  try {
    const tasks = await teamworkService.getTasks();
    res.status(200).json(tasks);
  } catch (error: any) {
    logger.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get tasks by project ID
export const getTasksByProjectId = async (req: any, res: any) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await teamworkService.getTasksByProjectId(projectId);
    res.status(200).json(tasks);
  } catch (error: any) {
    logger.error(`Error fetching tasks by project ID: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch tasks by project ID' });
  }
};



// Get task by ID
export const getTaskById = async (req: any, res: any) => {
  try {
    const taskId = req.params.id;
    const task = await teamworkService.getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error: any) {
    logger.error(`Error fetching task: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create a new task
export const createTask = async (req: any, res: any) => {
  try {
    const taskData = req.body;
    const newTask = await teamworkService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error: any) {
    logger.error(`Error creating task: ${error.message}`);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task
export const updateTask = async (req: any, res: any) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const updatedTask = await teamworkService.updateTask(taskId, taskData);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error: any) {
    logger.error(`Error updating task: ${error.message}`);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req: any, res: any) => {
  try {
    const taskId = req.params.id;
    const result = await teamworkService.deleteTask(taskId);
    
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Error deleting task: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};