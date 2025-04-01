import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"

export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null
    });

    async function downloadTheme(){
        const response = await fetch('/NightOwl.json');
        const data = await response.json();
        console.log(data);
        setEditorState({...editorState, theme: data});
    }

    function handleEditorTheme(editor, monaco){
        if (editorState.theme) {
            monaco.editor.defineTheme('nightowl', editorState.theme);
            monaco.editor.setTheme('nightowl');
        }
    }

    useEffect(() => {
        downloadTheme();
    },[]);

    return (
        <>
            {   editorState.theme &&
                <Editor
                height="80vh"
                defaultLanguage="javascript"
                defaultValue="// Welcome to the playground"
                onMount={handleEditorTheme}
                options={{
                    fontSize: 18,
                    fontFamily: "jetbrains mono",
                    lineNumbers: "on",
                    minimap: {
                        enabled: true,
                        scale: 1,
                    },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                
            />}
        </>
    )
}  