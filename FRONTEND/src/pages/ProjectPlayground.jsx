import {useParams} from "react-router-dom";
import { EditorComponent } from "../components/molecules/editorComponent/editorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure"
import { useEffect } from 'react';
import { useTreeStructureStorage } from "../store/treeStructureStorage"
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
export const ProjectPlayground = () => {

    const { projectId: projectIdFromUrl } = useParams();
    console.log(`Project Playground: ${projectIdFromUrl}`);

    const {projectId, setProjectId} = useTreeStructureStorage();

    const { setEditorSocket } = useEditorSocketStore();

    useEffect(() => {
        setProjectId(projectIdFromUrl);
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,
            {
                query: {
                    projectId: projectIdFromUrl
                },
            }
        );
        setEditorSocket(editorSocketConn);
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