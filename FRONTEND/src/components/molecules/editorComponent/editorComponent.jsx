import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

export const EditorComponent = () => {
    const { editorSocket } = useEditorSocketStore();
    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

    const [editorState, setEditorState] = useState({
        theme: null
    });

    // Download and apply the custom theme
    async function downloadTheme() {
        try {
            const response = await fetch('/NightOwl.json');
            const data = await response.json();
            console.log("Theme data:", data);
            setEditorState((prev) => ({ ...prev, theme: data }));
        } catch (error) {
            console.error("Failed to load theme:", error);
        }
    }

    // Apply the theme after editor is mounted
    function handleEditorTheme(editor, monaco) {
        if (editorState.theme) {
            monaco.editor.defineTheme('nightowl', editorState.theme);
            monaco.editor.setTheme('nightowl');
        }
    }

    // Socket listener for file read
    useEffect(() => {
        if (!editorSocket) return;

        const handleReadFileSuccess = (data) => {
            console.log("Read File success:", data);
            setActiveFileTab(data.path, data.value);
        };

        editorSocket.on("readFileSuccess", handleReadFileSuccess);

        return () => {
            editorSocket.off("readFileSuccess", handleReadFileSuccess);
        };
    }, [editorSocket, setActiveFileTab]);

    // Load the theme once on mount
    useEffect(() => {
        downloadTheme();
    }, []);

    return (
        <>
            {editorState.theme && (
                <Editor
                    height="100vh"
                    defaultLanguage="javascript"
                    defaultValue="Welcome to the playground"
                    onMount={handleEditorTheme}
                    options={{
                        fontSize: 18,
                        fontFamily: "JetBrains Mono",
                        lineNumbers: "on",
                        minimap: {
                            enabled: true,
                            scale: 1,
                        },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                    value={activeFileTab?.value || '//'}
                />
            )}
        </>
    );
};
