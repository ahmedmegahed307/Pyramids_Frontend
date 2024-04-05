import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobIssue from "../../../models/JobIssue";
import { createIssue } from "../../../services/Issues/issueService";

const useCreateIssue = (OnClose?: () => void, jobId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobIssue>(
    async (Issue: JobIssue): Promise<ResponseData> => {
      return await createIssue(Issue);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById", { id: jobId }],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "Issue has been Created successfully!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        OnClose();
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useCreateIssue;
