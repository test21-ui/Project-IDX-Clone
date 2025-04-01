import fs from 'fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverconfig.js';
import {execPromisified} from '../utils/execUtil.js'
import path from 'path';
import directoryTree from 'directory-tree';

export const createProjectService = async () => {
    // Create a unique id and then inside the Projects folder create a new folder with that id
    const projectid = uuid4();
    console.log("New project created with id: ", projectid);

    await fs.mkdir(`Projects/${projectid}`);

    // After this call the npm create vite command inside the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND,{
        cwd: `Projects/${projectid}`
    });

    return projectId;
}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`Projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}
