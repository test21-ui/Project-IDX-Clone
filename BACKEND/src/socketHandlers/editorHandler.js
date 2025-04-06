import fs from "fs/promises";

export const handleEditorSocketEvents = (socket,editorNamespace) => {
    
    socket.on("writeFile", async ({data, pathToFileOrFolder}) => {
        try{
            const response = await fs.writeFile(pathToFileOrFolder, data);
            editorNamespace.emit("writeFileSuccess",{
                data: "File written successfully",
                path: pathToFileOrFolder
            })
        } catch (error) {
            console.error("Error writing file", error);
            socket.emit("error",{
                data: "Error writing file",
            })
        }
    });

    socket.on("readFile", async ({pathToFileOrFolder}) => {
        try{
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response.toString());
            socket.emit("readFileSuccess",{
                value: response.toString(),
                path: pathToFileOrFolder,
            })
        } catch (error) {
            console.error("Error reading file", error);
            socket.emit("error",{
                data: "Error reading file",
            })
        }
    });

    socket.on("deleteFile", async ({pathToFileOrFolder}) => {
        try{
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data: "File deleted successfully",
            })
        } catch (error) {
            console.error("Error deleting file", error);
            socket.emit("error",{
                data: "Error deleting file",
            })
        }
    });

    socket.on("createFolder", async ({pathToFileOrFolder}) => {
        try{
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess",{
                data: "Folder created successfully",
            })
        } catch (error) {
            console.error("Error creating folder", error);
            socket.emit("error",{
                data: "Error creating folder",
            })
        }
    }
    );

    socket.on("deleteFolder", async ({pathToFileOrFolder}) => {
        try{
            const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
            socket.emit("deleteFolderSuccess",{
                data: "Folder deleted successfully",
            })
        } catch (error) {
            console.error("Error deleting folder", error);
            socket.emit("error",{
                data: "Error deleting folder",
            })
        }
    });

    socket.on("createFile", async ({pathToFileOrFolder}) => {
        const isFileAlreadyExists = await fs.stat(pathToFileOrFolder);
        if(isFileAlreadyExists) {
            socket.emit("error",{
                data: "File already exists",
            })
            return;
        }

        try{
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess",{
                data: "File created successfully",
            })
        }
        catch (error) {
            console.error("Error creating file", error);
            socket.emit("error",{
                data: "Error creating file",
            })
        }
    });

}