import { useQuery } from "@tanstack/react-query";
import { getAllAssetsByClientId } from "../../../../services/AssetService/MainAssetService/mainAssetService";
import { Asset } from "../../../../models/Asset";

const useGetAssetsByClientId = (clientId: number) => {
  return useQuery<Asset[], Error>(
    ["assetsByClientId", { clientId }],
    () => getAllAssetsByClientId(clientId)
  );
};

export default useGetAssetsByClientId;
