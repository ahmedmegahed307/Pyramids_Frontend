import { useQuery } from "@tanstack/react-query";
import JobPart from "../../../models/JobPart";
import { getPartsByJobId } from "../../../services/Parts/partService";

const useGetPartsByJobId = (jobId: number) => {
  return useQuery<JobPart[], Error>(["partByJobId", { jobId }], () =>
    getPartsByJobId(jobId)
  );
};

export default useGetPartsByJobId;
