import { useQuery } from "@tanstack/react-query";
import { JobQueryFormData } from "../../../Pages/Reports/JobQuery/JobQuery";
import { Job } from "../../../models/Job";
import { GetJobQueryData } from "../../../services/Reports/reportService";

const useGetJobQueryData = (jobQueryFormData : JobQueryFormData) => {
  return useQuery<Job[], Error>(
    ["jobQueryData", { jobQueryFormData }],
    () => GetJobQueryData(jobQueryFormData)
  );
};

export default useGetJobQueryData;
