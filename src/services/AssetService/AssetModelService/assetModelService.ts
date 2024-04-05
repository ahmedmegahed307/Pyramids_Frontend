import AssetModel from "../../../models/AssetModel";
import Api from "../../api-fetch";

const AssetModelApi = new Api<any>("/AssetModel");


export const getAllAssetModels = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const AssetModels = await AssetModelApi.getAll(isActive, companyId);
  return AssetModels.data;
};

export const updateAssetModel = async (
  AssetModelId: number,
  updatedData: any
) => {
  const updatedAssetModel = await AssetModelApi.update(
    AssetModelId,
    updatedData
  );
  return updatedAssetModel;
};


export const deleteAssetModel = async (
  AssetModelId: number
): Promise<ResponseData> => {
  const responseData = await AssetModelApi.delete(AssetModelId);
  return responseData;
};

export const createAssetModel = async (AssetModelData: AssetModel) => {
  const newAssetModel = await AssetModelApi.post(AssetModelData);
  return newAssetModel;
};
