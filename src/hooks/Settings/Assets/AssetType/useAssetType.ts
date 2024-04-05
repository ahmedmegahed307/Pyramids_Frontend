import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import AssetType from "../../../../models/AssetType";
import { getAllAssetTypes } from "../../../../services/AssetService/AssetTypeService/assetTypeService";


const useAssetType = () => {
  const { user } = useAuthStore();

  return useQuery<AssetType[], Error>({
    queryKey: [
      "assetTypeList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllAssetTypes,
  });
};

export default useAssetType;
