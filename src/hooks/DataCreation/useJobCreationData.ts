import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../Authentication/store";
import { GetJobCreationData } from "../../services/GeneralData/generalDataService";

const useJobCreationData = () => {
  const { user } = useAuthStore();

  return useQuery<any[], Error>({
    queryKey: ["jobCreationData", { companyId: user?.companyId }],
    queryFn: GetJobCreationData,
  });
};
export default useJobCreationData;
