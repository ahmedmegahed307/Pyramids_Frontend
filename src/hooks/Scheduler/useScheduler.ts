import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../Authentication/store";
import { Scheduler } from "../../models/Interfaces/Scheduler/Scheduler";
import { GetScheduler } from "../../services/Scheduler/schedulerService";


const useScheduler = () => {
  const { user } = useAuthStore();

  return useQuery<Scheduler[], Error>({
    queryKey: ["scheduler", {companyId: user?.companyId }],
    queryFn: GetScheduler,
  });
};

export default useScheduler;
