import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobType from "../../../models/JobType";
import { createJobType } from "../../../services/JobTypeService/jobTypeService";


const useCreateJobType = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobType>(
    async (jobtype: JobType): Promise<ResponseData> => {
      return await createJobType(jobtype);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobtypeList"],
        });
        Swal.fire({
          title: "Success",
          text: "JobType has been Created successfully!",
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

export default useCreateJobType;
