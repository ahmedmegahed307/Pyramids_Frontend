import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { INotification } from "../../models/Interfaces/INotification";
import { deleteNotification, updateNotification } from "../../services/Notification/notificationService";


const useNotificationMutation = (
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, INotification | number>(
    async (notification: INotification | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (notification as INotification).id;
        return await updateNotification(id ?? 0, notification);
      } else {
        const id = notification as number;
        return await deleteNotification(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notificationList"],
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

export default useNotificationMutation;
