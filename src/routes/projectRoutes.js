import express from 'express';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/getAllProjects', projectController.getProjects);

// GET single project
router.get('/getProject/:id', projectController.getProject);

// POST new project
router.post('/createProject', projectController.createProject);

// PUT update project
router.put('/updateProject/:id', projectController.updateProject);

// DELETE project
router.delete('/deleteProject/:id', projectController.deleteProject);

export default router; 