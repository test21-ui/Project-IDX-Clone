import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { getProjectTree } from '../apis/projects'

export const useTreeStructureStorage = create((set, get) => {

    const queryClient = new QueryClient();

    return {
        projectId:null,
        treeStructure : null,
        setTreeStructure: async () => {
            const id = get().projectId;
            const data = await queryClient.fetchQuery({
                queryFn: () => getProjectTree({ projectId: id }),
                queryKey: [`projecttree-${id}`]
            });
            console.log(data);
            set({
                treeStructure : data
            });
            },
            setProjectId: (projectId) => {
                set({
                    projectId: projectId
                })
            }
    }
}    );