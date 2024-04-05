import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobIssue from "../../../models/JobIssue";
import { deleteIssue, updateIssue } from "../../../services/Issues/issueService";

const useIssueMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean,
  jobId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobIssue | number>(
    async (Issue: JobIssue | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (Issue as JobIssue).id;
        return await updateIssue(id ?? 0, Issue);
      } else {
        const id = Issue as number;
        return await deleteIssue(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById", { id: jobId }],
        });

        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Issue has been updated successfully!"
            : "Issue has been deleted successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useIssueMutation;
