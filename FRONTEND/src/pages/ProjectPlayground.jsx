import {useParams} from "react-router-dom";
import { EditorComponent } from "../components/molecules/editorComponent/editorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure"
import { useEffect } from 'react';
import { useTreeStructureStorage } from "../store/treeStructureStorage"
export const ProjectPlayground = () => {

    const { projectId: projectIdFromUrl } = useParams();
    console.log(`Project Playground: ${projectIdFromUrl}`);

    const {projectId, setProjectId} = useTreeStructureStorage();

    useEffect(() => {
        setProjectId(projectId)
    },[])


    return (
        <>
            <h1>Project Playground</h1>
            <p>Project ID: {projectIdFromUrl}</p>
            <p>Welcome to the Project Playground!</p>
            {projectId && <TreeStructure />}
            <EditorButton isActive={false}/>
            <EditorButton isActive={true}/>
            <EditorComponent projectId={projectId} />
        </>
    )

}    