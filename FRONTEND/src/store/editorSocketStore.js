import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStorage } from "./treeStructureStorage";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,

    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStorage.getState().setTreeStructure;

        const socketEventHandlers = {
            readFileSuccess: (data) => {
                console.log("Read file success", data);
                const fileExtension = data.path.split('.').pop();
                activeFileTabSetter(data.path, data.value, fileExtension);
            },

            writeFileSuccess: (data) => {
                console.log("Write file success", data);
                incomingSocket.emit("readFile", {
                    pathToFileOrFolder: data.path,
                });
            },

            deleteFileSuccess: (data) => {
                console.log("Delete file success", data);
                projectTreeStructureSetter(data.updatedTree); // ✅ Refresh tree after deletion
            },

            renameFileSuccess: (data) => {
                console.log("Rename file success", data);
                // You can also update open tab name if needed here
                projectTreeStructureSetter(data.updatedTree);
            },
        };

        // Register all handlers
        Object.entries(socketEventHandlers).forEach(([event, handler]) => {
            incomingSocket?.on(event, handler);
        });

        set({ editorSocket: incomingSocket });
    },
}));
