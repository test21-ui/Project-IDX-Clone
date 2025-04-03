export const useProjectTree = (projectId) => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: () => getProjectTree({ projectId }),
        queryKey: ["projectTree", projectId],
        staleTime: 10000,
    });

    return {
        isLoading,
        isError,
        data,
        error
    };
}