import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Resolution from "../../../models/Resolution";
import { createResolution } from "../../../services/ResolutionService/resolutionService";
import useAuthStore from "../../Authentication/store";

const useCreateResolution = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Resolution>(
    async (resolution: Resolution): Promise<ResponseData> => {
      return await createResolution(resolution);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["resolutionList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "Resolution has been Created successfully!",
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

export default useCreateResolution;
