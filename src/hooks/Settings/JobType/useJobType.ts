import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Authentication/store";
import JobType from "../../../models/JobType";
import { getAllJobTypes } from "../../../services/JobTypeService/jobTypeService";

const useJobType = () => {
  const { user } = useAuthStore();

  return useQuery<JobType[], Error>({
    queryKey: ["jobtypeList", { isActive: true, companyId: user?.companyId }],
    queryFn: getAllJobTypes,
  });
};

export default useJobType;
