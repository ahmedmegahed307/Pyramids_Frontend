import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { generateVisits,  } from "../../services/PPM/PPMService";

const useGenerateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, number[]>(
    async (visitsId: number[]): Promise<ResponseData> => {
      return await generateVisits(visitsId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["visitList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["contractById"],
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Visit(s) generated successfully",
        });
       
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

export default useGenerateVisit;
