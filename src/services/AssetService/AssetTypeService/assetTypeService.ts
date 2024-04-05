import AssetType from "../../../models/AssetType";
import Api from "../../api-fetch";

const AssetTypeApi = new Api<any>("/AssetType");

// Fetch all AssetTypes

export const getAllAssetTypes = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const AssetTypes = await AssetTypeApi.getAll(isActive, companyId);
  return AssetTypes.data;
};

export const updateAssetType = async (
  AssetTypeId: number,
  updatedData: any
) => {
  const updatedAssetType = await AssetTypeApi.update(
    AssetTypeId,
    updatedData
  );
  return updatedAssetType;
};


export const deleteAssetType = async (
  AssetTypeId: number
): Promise<ResponseData> => {
  const responseData = await AssetTypeApi.delete(AssetTypeId);
  return responseData;
};

export const createAssetType = async (AssetTypeData: AssetType) => {
  const newAssetType = await AssetTypeApi.post(AssetTypeData);
  return newAssetType;
};
