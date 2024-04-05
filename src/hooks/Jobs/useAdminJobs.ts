import { useQuery } from "@tanstack/react-query";

import { Job } from "../../models/Job";
import useAuthStore from "../Authentication/store";
import { getAllJobs } from "../../services/Job/jobService";

const useAdminJobs = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<Job[], Error>({
    // queryKey: ["jobsList", { isActive: isActive, companyId: user?.companyId }],
    queryKey: ["jobsList", { isActive: isActive, companyId: user?.companyId }],
    queryFn: getAllJobs,
  });
};
export default useAdminJobs;
