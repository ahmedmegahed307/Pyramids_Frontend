import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import AssetModel from "../../../../models/AssetModel";
import { getAllAssetModels } from "../../../../services/AssetService/AssetModelService/assetModelService";


const useAssetModel = () => {
  const { user } = useAuthStore();

  return useQuery<AssetModel[], Error>({
    queryKey: [
      "assetModelList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllAssetModels,
  });
};

export default useAssetModel;
