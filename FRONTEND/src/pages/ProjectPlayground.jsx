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
        setProjectId(projectIdFromUrl)
    },[setProjectId, projectIdFromUrl]);


    return (
        <>
            <div style={{display:"flex"}} >
            {projectId && (
                <div 
                    style={{
                        backgroundColor: "#30495f",
                        minWidth: "250px",
                        paddingTop: "0.3vg",
                        maxWidth: "25%",
                        height: "99.7vh",
                        overflow: "auto",
                        paddingRight: "10px"
                    }}
                >
                    <TreeStructure />
                </div>
            )}
            <EditorComponent />
            </div>    
            <EditorButton isActive="false"/>
            <EditorButton isActive=""/>
        </>
    )

}    