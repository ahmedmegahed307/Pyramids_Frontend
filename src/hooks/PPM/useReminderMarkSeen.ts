import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { reminderMarkSeen } from "../../services/PPM/PPMService";

const useReminderMarkSeen = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, number[]>(
    async (remindersId: number[]): Promise<ResponseData> => {
      return await reminderMarkSeen(remindersId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reminderList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["contractById"],
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reminder(s) marked as seen",
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

export default useReminderMarkSeen;
