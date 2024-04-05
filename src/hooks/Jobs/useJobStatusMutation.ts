import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Job } from "../../models/Job";
import {
  deleteJob,
  updateJob,
  updateJobStatus,
} from "../../services/Job/jobService";
import { IJobStatusUpdateData } from "../../models/Interfaces/IJobStatusUpdateData";

const useJobStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, IJobStatusUpdateData>(
    async (jobStatus: IJobStatusUpdateData): Promise<ResponseData> => {
      const jobId = (jobStatus as IJobStatusUpdateData).jobId;
      return await updateJobStatus(jobId, jobStatus);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById"],
        });

        Swal.fire({
          title: "Success",
          text: "Job Status has been updated successfully!",
          icon: "success",
        });
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

export default useJobStatusMutation;
