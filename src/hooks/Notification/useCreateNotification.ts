import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { INotification } from "../../models/Interfaces/INotification";
import { createNotification } from "../../services/Notification/notificationService";


const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, INotification>(
    async (notification: INotification): Promise<ResponseData> => {
      return await createNotification(notification);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notificationList"],
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

export default useCreateNotification;
