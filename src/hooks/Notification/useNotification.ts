import { useQuery } from "@tanstack/react-query";
import { INotification } from "../../models/Interfaces/INotification";
import useAuthStore from "../Authentication/store";
import { getAllNotificationes } from "../../services/Notification/notificationService";



const useNotification = () => {
  const { user } = useAuthStore();

  return useQuery<INotification[], Error>({
    queryKey: [
      "notificationList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllNotificationes,
  });
};

export default useNotification;
