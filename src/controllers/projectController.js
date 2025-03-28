import * as projectService from '../services/projectService.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const response = await projectService.getAllProjects();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const response = await projectService.getProjectById(req.params.id);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    // If technologies is a string, convert it to array
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(tech => tech.trim());
    }
    
    // imageUrl is expected to be provided directly in the request body
    
    const response = await projectService.createNewProject(projectData);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(400).send({
      status: 400,
      msg: error.message,
      data: null
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    // If technologies is a string, convert it to array
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(tech => tech.trim());
    }
    
    // imageUrl is expected to be provided directly in the request body
    
    const response = await projectService.updateProjectById(req.params.id, projectData);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(400).send({
      status: 400,
      msg: error.message,
      data: null
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const response = await projectService.deleteProjectById(projectId);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
}; 