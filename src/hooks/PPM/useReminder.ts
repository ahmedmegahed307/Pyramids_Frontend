import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../Authentication/store";
import {  getReminderList } from "../../services/PPM/PPMService";
import { IReminder } from "../../models/Interfaces/IReminder";


const useReminder = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<IReminder[], Error>({
    queryKey: [
      "reminderList",
      { isActive: isActive, companyId: user?.companyId },
    ],
    queryFn: getReminderList,
  });
};

export default useReminder;
