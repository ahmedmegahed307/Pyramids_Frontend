import { useQuery } from "@tanstack/react-query";

import { Job } from "../../models/Job";
import { getAllClientJobs, getAllJobs } from "../../services/Job/jobService";

const useClientJobs = (jobStatusId?: number) => {
  const clientId = 12;
  return useQuery<Job[], Error>({
    queryKey: ["clientJobs", { jobStatusId: jobStatusId, clientId: clientId }],
    queryFn: getAllClientJobs,
  });
};
export default useClientJobs;
