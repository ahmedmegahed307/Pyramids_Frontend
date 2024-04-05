import { useQuery } from "@tanstack/react-query";
import {  getAllAssetsBySiteId } from "../../../../services/AssetService/MainAssetService/mainAssetService";
import { Asset } from "../../../../models/Asset";

const useGetAssetsBySiteId = (siteId: number) => {
  return useQuery<Asset[], Error>(
    ["assetsBySiteId", { siteId }],
    () => getAllAssetsBySiteId(siteId)
  );
};

export default useGetAssetsBySiteId;
