import express from 'express';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/', projectController.getProjects);

// GET single project
router.get('/:id', projectController.getProject);

// POST new project
router.post('/', projectController.createProject);

// PUT update project
router.put('/:id', projectController.updateProject);

// DELETE project
router.delete('/:id', projectController.deleteProject);

export default router; 