import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuthStore from "../Authentication/store";
import { SchedulerEventCreate } from "../../models/Interfaces/Scheduler/SchedulerEventCreate";
import { createEvent } from "../../services/Scheduler/schedulerService";

const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<ResponseData, Error, SchedulerEventCreate>(
    async (event: SchedulerEventCreate): Promise<ResponseData> => {
      return await createEvent(event);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["scheduler", { companyId: user?.companyId }],
        });

        Swal.fire({
          title: "Success",
          text: "Event has been Created successfully!",
          icon: "success",
          timer: 500,
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

export default useCreateEvent;
