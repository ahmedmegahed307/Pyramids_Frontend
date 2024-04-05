import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobSubType from "../../../models/JobSubType";
import { createSubType } from "../../../services/JobSubTypeService/jobSubTypeService";


const useCreateJobSubType = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobSubType>(
    async (jobSubType: JobSubType): Promise<ResponseData> => {
      return await createSubType(jobSubType);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobSubtypeList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["jobtypeList"],
        });
        Swal.fire({
          title: "Success",
          text: "Job SubType has been Created successfully!",
          icon: "success",
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

export default useCreateJobSubType;
