import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import { Asset } from "../../../../models/Asset";
import { getAllAssets } from "../../../../services/AssetService/MainAssetService/mainAssetService";


const useAsset = () => {
  const { user } = useAuthStore();

  return useQuery<Asset[], Error>({
    queryKey: [
      "assetList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllAssets,
  });
};

export default useAsset;
