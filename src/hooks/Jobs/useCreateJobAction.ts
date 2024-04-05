import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobAction from "../../models/JobAction";
import { createJobAction } from "../../services/JobAction/JobActionSerivce";

const useCreateClient = (jobId: number) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobAction>(
    async (jobAction: JobAction): Promise<ResponseData> => {
      return await createJobAction(jobAction);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["jobById ", jobId ?? 0],
        });
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

export default useCreateClient;
