import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';

const execPromisified = promisify(exec);

export const createProjectController = async (req, res) => {
    
    // Create a unique id and then inside the Projects folder create a new folder with that id
    const projectid = uuid4();
    console.log("New project created with id: ", projectid);

    await fs.mkdir(`Projects/${projectid}`);

    // After this call the npm create vite command inside the newly created project folder

    const response = await execPromisified('npm create vite@latest sandbox -- --template react',{
        cwd: `Projects/${projectid}`
    });

    return res.json({message: 'Project created successfully', projectid});    
};
