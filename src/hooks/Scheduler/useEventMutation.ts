import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SchedulerEventUpdate } from "../../models/Interfaces/Scheduler/SchedulerEventUpdate";
import {
  deleteEvent,
  updateEvent,
} from "../../services/Scheduler/schedulerService";
import useAuthStore from "../Authentication/store";

const useEventMutation = (onUpdateOrDelete: () => void, isUpdate: boolean) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, SchedulerEventUpdate | number>(
    async (event: SchedulerEventUpdate | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (event as SchedulerEventUpdate).id;
        return await updateEvent(id ?? 0, event);
      } else {
        const id = event as number;
        return await deleteEvent(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["scheduler", { companyId: user?.companyId }],
        });

        // Swal.fire({
        //   title: "Success",
        //   text: isUpdate
        //     ? "Event has been updated successfully!"
        //     : "Event has been deleted successfully!",
        //   icon: "success",
        //   timer: 500,
        // });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: "Job has not been updated! Please Implement Drag&Drop feature!",
          icon: "error",
        });
      },
    }
  );
};

export default useEventMutation;
