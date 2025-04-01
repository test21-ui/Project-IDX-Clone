import { createProjectService, getProjectTreeService } from '../service/projectService.js';

export const createProjectController = async (req, res) => {
    
    const projectId = await createProjectService();
        
    return res.json({ messsage: 'Project created', data: projectId });
};

export const getProjectTreeController = async (req, res) => {
    const projectId = req.params.projectId;
    const tree = await getProjectTreeService(projectId);
    
    return res.json({
        messsage: 'Project tree',
        data: tree,
        success: true
    });
}

