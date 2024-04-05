import AssetManufacturer from "../../../models/AssetManufacturer";
import Api from "../../api-fetch";

const AssetManufacturerApi = new Api<any>("/AssetManufacturer");

// Fetch all AssetManufacturers

export const getAllAssetManufacturers = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const AssetManufacturers = await AssetManufacturerApi.getAll(isActive, companyId);
  return AssetManufacturers.data;
};

export const updateAssetManufacturer = async (
  AssetManufacturerId: number,
  updatedData: any
) => {
  const updatedAssetManufacturer = await AssetManufacturerApi.update(
    AssetManufacturerId,
    updatedData
  );
  return updatedAssetManufacturer;
};


export const deleteAssetManufacturer = async (
  AssetManufacturerId: number
): Promise<ResponseData> => {
  const responseData = await AssetManufacturerApi.delete(AssetManufacturerId);
  return responseData;
};

export const createAssetManufacturer = async (AssetManufacturerData: AssetManufacturer) => {
  const newAssetManufacturer = await AssetManufacturerApi.post(AssetManufacturerData);
  return newAssetManufacturer;
};
