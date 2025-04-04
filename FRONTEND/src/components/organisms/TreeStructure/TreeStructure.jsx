import { useTreeStructureStorage } from "../../../store/treeStructureStorage";
import { useEffect } from 'react';
import { TreeNode } from "../../molecules/Tree/TreeNode";
export const TreeStructure = () => {

    const {treeStructure, setTreeStructure } = useTreeStructureStorage();

    useEffect(() => {
        if(treeStructure){
            console.log("tree : ",treeStructure)
        }
        else{
            setTreeStructure();
        }
    },[setTreeStructure,treeStructure]);

    return (
        <div>
            <TreeNode fileFolderData={treeStructure || []}/>
        </div>
    )
}