import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Authentication/store";
import JobType from "../../../models/JobType";
import { getAllSubTypes } from "../../../services/JobSubTypeService/jobSubTypeService";

const useJobType = () => {
  const { user } = useAuthStore();

  return useQuery<JobType[], Error>({
    queryKey: ["jobSubtypeList", { isActive: true, companyId: user?.companyId }],
    queryFn: getAllSubTypes,
  });
};

export default useJobType;
