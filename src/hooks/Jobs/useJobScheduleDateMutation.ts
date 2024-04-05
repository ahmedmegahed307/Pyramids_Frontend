import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    updateJobScheduleDate,
  updateJobStatus,
} from "../../services/Job/jobService";
import useAuthStore from "../Authentication/store";

const useJobScheduleDateMutation = () => {
    const{user}=useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, any>(
    async (job: any): Promise<ResponseData> => {
      const id = (job as any).id;
      return await updateJobScheduleDate(id, job);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById"],
        });
        queryClient.invalidateQueries({
            queryKey: ["scheduler", {companyId: user?.companyId }],
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

export default useJobScheduleDateMutation;
