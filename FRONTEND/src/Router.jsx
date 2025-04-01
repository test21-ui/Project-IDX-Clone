import { Routes, Route } from 'react-router-dom' 
import { CreateProject } from './pages/createProject';
import { ProjectPlayground } from './pages/ProjectPlayground';
export const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateProject />} />
            <Route path="/projects/:projectId" element={<ProjectPlayground />} />
        </Routes>
    )
}    