import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobPart from "../../../models/JobPart";
import { deletePart, updatePart } from "../../../services/Parts/partService";

const usePartMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean,
  jobId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobPart | number>(
    async (part: JobPart | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (part as JobPart).id;
        return await updatePart(id ?? 0, part);
      } else {
        const id = part as number;
        return await deletePart(id);
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
            ? "Part has been updated successfully!"
            : "Part has been deleted successfully!",
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

export default usePartMutation;
