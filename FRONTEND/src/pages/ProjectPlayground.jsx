import {useParams} from "react-router-dom";
import { EditorComponent } from "../components/molecules/editorComponent/editorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
export const ProjectPlayground = () => {

    const { projectId } = useParams();
    console.log(`Project Playground: ${projectId}`);
    return (
        <>
            <h1>Project Playground</h1>
            <p>Project ID: {projectId}</p>
            <p>Welcome to the Project Playground!</p>
            <EditorButton isActive={false}/>
            <EditorButton isActive={true}/>
            <EditorComponent projectId={projectId} />
        </>
    )

}    