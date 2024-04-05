import { Asset } from "../../../models/Asset";
import Api from "../../api-fetch";

const AssetApi = new Api<any>("/Asset");

export const getAllAssets = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Assets = await AssetApi.getAll(isActive, companyId);
  return Assets.data;
};
export const getAllAssetsByClientId = async (clientId: number): Promise<Asset[]> => {
  const queryParams = {
    clientId: clientId
   
  };
  const assetsApi = new Api<any>("/Asset/GetAllAssetsByClientId");
  const assets = await assetsApi.get(queryParams);
  return assets.data;
};

export const getAllAssetsBySiteId = async (siteId: number): Promise<Asset[]> => {
  const queryParams = {
    siteId: siteId
   
  };
  const assetsApi = new Api<any>("/Asset/GetAllAssetsBySiteId");
  const assets = await assetsApi.get(queryParams);
  return assets.data;
};


export const updateAsset = async (
  AssetId: number,
  updatedData: any
) => {
  const updatedAsset = await AssetApi.update(
    AssetId,
    updatedData
  );
  return updatedAsset;
};


export const deleteAsset = async (
  AssetId: number
): Promise<ResponseData> => {
  const responseData = await AssetApi.delete(AssetId);
  return responseData;
};

export const createAsset = async (AssetData: Asset) => {
  const newAsset = await AssetApi.post(AssetData);
  return newAsset;
};
