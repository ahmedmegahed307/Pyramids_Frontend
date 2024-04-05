import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Resolution from "../../../models/Resolution";
import {
  updateResolution,
  deleteResolution,
} from "../../../services/ResolutionService/resolutionService";
import useAuthStore from "../../Authentication/store";

const useResolutionMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Resolution | number>(
    async (resolution: Resolution | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (resolution as Resolution).id;
        return await updateResolution(id ?? 0, resolution);
      } else {
        const id = resolution as number;
        return await deleteResolution(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["resolutionList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Resolution has been updated successfully!"
            : "Resolution has been deleted successfully!",
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

export default useResolutionMutation;
