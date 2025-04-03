import { useTreeStructureStorage } from "../../../store/treeStructureStorage";
import { useEffect } from 'react';

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
            <h1>Tree Structure</h1>
        </div>
    )
}