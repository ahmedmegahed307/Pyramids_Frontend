import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobType from "../../../models/JobType";
import { deleteJobType, updateJobType } from "../../../services/JobTypeService/jobTypeService";



const useJobTypeMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobType | number>(
    async (jobType: JobType | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (jobType as JobType).id;
        return await updateJobType(id ?? 0, jobType);
      } else {
        const id = jobType as number;
        return await deleteJobType(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobtypeList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "JobType has been updated successfully!"
            : "JobType has been deleted successfully!",
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

export default useJobTypeMutation;
