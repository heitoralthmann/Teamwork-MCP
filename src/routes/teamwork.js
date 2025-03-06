const express = require('express');
const router = express.Router();
const teamworkController = require('../controllers/teamwork');

// Get projects
router.get('/projects', teamworkController.getProjects);

// Get tasks
router.get('/tasks', teamworkController.getTasks);

// Get task by ID
router.get('/tasks/:id', teamworkController.getTaskById);

// Create task
router.post('/tasks', teamworkController.createTask);

// Update task
router.put('/tasks/:id', teamworkController.updateTask);

// Delete task
router.delete('/tasks/:id', teamworkController.deleteTask);

module.exports = router;