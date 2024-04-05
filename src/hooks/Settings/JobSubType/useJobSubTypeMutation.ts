import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import JobSubType from "../../../models/JobSubType";
import { deleteSubType, updateSubType } from "../../../services/JobSubTypeService/jobSubTypeService";



const useJobSubTypeMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobSubType | number>(
    async (jobSubType: JobSubType | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (jobSubType as JobSubType).id;
        return await updateSubType(id ?? 0, jobSubType);
      } else {
        const id = jobSubType as number;
        return await deleteSubType(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobSubtypeList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "JobSubType has been updated successfully!"
            : "JobSubType has been deleted successfully!",
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

export default useJobSubTypeMutation;
