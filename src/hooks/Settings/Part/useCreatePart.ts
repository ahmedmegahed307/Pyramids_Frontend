import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobPart from "../../../models/JobPart";
import { createPart } from "../../../services/Parts/partService";

const useCreatePart = (OnClose: () => void, jobId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobPart>(
    async (part: JobPart): Promise<ResponseData> => {
      return await createPart(part);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById", { id: jobId }],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "Part has been Created successfully!",
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

export default useCreatePart;
