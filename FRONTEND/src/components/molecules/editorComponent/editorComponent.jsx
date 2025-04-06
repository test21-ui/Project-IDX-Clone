import { Editor } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";

export const EditorComponent = () => {
    const { editorSocket } = useEditorSocketStore();
    const { activeFileTab } = useActiveFileTabStore();

    const [editorState, setEditorState] = useState({
        theme: null
    });

    const timerIdRef = useRef(null);  // useRef to persist timer between renders

    // Load and apply the custom theme once on mount
    useEffect(() => {
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

        downloadTheme();
    }, []);

    // Apply theme when editor is mounted
    function handleEditorTheme(editor, monaco) {
        if (editorState.theme) {
            monaco.editor.defineTheme('nightowl', editorState.theme);
            monaco.editor.setTheme('nightowl');
        }
    }

    // Handle editor changes with debounced socket emit
    function handleChange(value) {
        if (timerIdRef.current !== null) {
            clearTimeout(timerIdRef.current);
        }

        timerIdRef.current = setTimeout(() => {
            if (!editorSocket || !activeFileTab?.path) return;

            console.log("Sending writeFile event");
            editorSocket.emit("writeFile", {
                pathToFileOrFolder: activeFileTab.path,
                data: value
            });
        }, 2000);
    }

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
                    onChange={handleChange}
                    value={activeFileTab?.value || '//'}
                />
            )}
        </>
    );
};
