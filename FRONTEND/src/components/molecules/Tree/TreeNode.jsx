import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
    const [isVisible, setIsVisible] = useState(false);

    const {editorSocket} = useEditorSocketStore();

    function computeExtension(data) {
        if (!data?.name) return ""; // Prevents error
        const parts = data.name.split(".");
        return parts.length > 1 ? parts.pop() : "";
    }

    function toggleVisibility() {
        setIsVisible(!isVisible);
    }

    function handleDoubleClick(fileFolderData){
        console.log("Double clicked on ",fileFolderData);
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path
        })
    }

    if (!fileFolderData) return null;

    console.log("Rendering TreeNode for:", fileFolderData); // Debugging

    return (
        <div style={{ paddingLeft: "20px", color: "black" }}>
            {fileFolderData.children ? (
                <button
                    onClick={toggleVisibility}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        paddingTop: "5px",
                        color: "white",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {isVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    {fileFolderData.name || "Unnamed Folder"}
                </button>
            ) : (
                fileFolderData?.name && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FileIcon extension={computeExtension(fileFolderData)} />
                        <p style={{ paddingTop: "5px", fontSize: "14px", marginLeft: "20px", color: "white" }}
                            onDoubleClick={() => handleDoubleClick(fileFolderData)}
                        >
                            {fileFolderData.name}
                        </p>
                    </div>
                )
            )}

            {isVisible && fileFolderData.children && (
                fileFolderData.children.map((child, index) => (
                    <TreeNode fileFolderData={child} key={`${fileFolderData.name || "Unnamed"}-${index}`} />
                ))
            )}
        </div>
    );
};
