import Project from '../models/Project.js';

// Get all projects
export const getAllProjects = async () => {
  try {
    const projects = await Project.findAll({
      order: [['createdAt', 'DESC']]
    });
    return {
      status: 200,
      msg: 'Projects retrieved successfully',
      data: projects
    };
  } catch (error) {
    return {
      status: 500,
      msg: error.message,
      data: null
    };
  }
};

// Get project by ID
export const getProjectById = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return {
        status: 404,
        msg: 'Project not found',
        data: null
      };
    }
    return {
      status: 200,
      msg: 'Project retrieved successfully',
      data: project
    };
  } catch (error) {
    return {
      status: 500,
      msg: error.message,
      data: null
    };
  }
};

// Create new project
export const createNewProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    return {
      status: 201,
      msg: 'Project created successfully',
      data: project
    };
  } catch (error) {
    return {
      status: 400,
      msg: error.message,
      data: null
    };
  }
};

// Update project
export const updateProjectById = async (id, projectData) => {
  try {
    const [updated] = await Project.update(projectData, {
      where: { id }
    });
    
    if (updated) {
      const updatedProject = await Project.findByPk(id);
      return {
        status: 200,
        msg: 'Project updated successfully',
        data: updatedProject
      };
    }
    
    return {
      status: 404,
      msg: 'Project not found',
      data: null
    };
  } catch (error) {
    return {
      status: 400,
      msg: error.message,
      data: null
    };
  }
};

// Delete project
export const deleteProjectById = async (id) => {
  try {
    const deleted = await Project.destroy({
      where: { id }
    });
    
    if (deleted) {
      return {
        status: 200,
        msg: 'Project deleted successfully',
        data: null
      };
    }
    
    return {
      status: 404,
      msg: 'Project not found',
      data: null
    };
  } catch (error) {
    return {
      status: 500,
      msg: error.message,
      data: null
    };
  }
}; 