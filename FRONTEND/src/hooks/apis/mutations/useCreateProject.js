import { useMutation } from "@tanstack/react-query";
import { createprojectApi } from "../../../apis/projects";

export const useCreateProject = () => {
    const { mutateAsync, isPending, isSuccess, error } = useMutation({
        mutationFn: createprojectApi,
        queryKey: "createProject",
        onSuccess: (data, variables) => {
            console.log("Project created successfully", data, variables);
        },
        onError: (error) => {
            console.error("Error creating project", error);
        },
    });

    return {
        createProject: (variables) => mutateAsync(variables),
        isPending,
        isSuccess,
        error,
    }
}

