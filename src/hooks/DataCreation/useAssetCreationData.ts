import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../Authentication/store";
import { GetِAssetCreationData } from "../../services/GeneralData/generalDataService";

const useAssetCreationData = (isAccessedFromClientPortal?:Boolean) => {
  const { user } = useAuthStore();

  return useQuery<any[], Error>({
    queryKey: ["assetCreationData", { companyId: isAccessedFromClientPortal ? 3 :user?.companyId }],
    queryFn: GetِAssetCreationData,
  });
};
export default useAssetCreationData;
