import { useQuery } from "@tanstack/react-query";
import { Job } from "../../models/Job";
import { getLastFiveJobsForSiteId } from "../../services/Job/jobService";

const useGetLastFiveJobsBySiteId = (siteId: number) => {
  return useQuery<Job[], Error>(["lastFiveJobsBySiteId", { siteId }], () =>
    getLastFiveJobsForSiteId(siteId)
  );
};
export default useGetLastFiveJobsBySiteId;
