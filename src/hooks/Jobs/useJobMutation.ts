import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Job } from "../../models/Job";
import { deleteJob, updateJob } from "../../services/Job/jobService";
import useAuthStore from "../Authentication/store";

const useJobMutation = (onUpdateOrDelete: () => void, isUpdate: boolean) => {
  const{user}=useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Job | number>(
    async (job: Job | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (job as Job).id;
        return await updateJob(id ?? 0, job);
      } else {
        const id = job as number;
        return await deleteJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById"],
        });
        queryClient.invalidateQueries({
          queryKey: ["scheduler", {companyId: user?.companyId }],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Job has been updated successfully!"
            : "Job has been Deactivated successfully!",
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

export default useJobMutation;
