import Address from "../../models/Address";
import Api from "../api-fetch";

const addressApi = new Api<any>("/Address");

export const getAllAddresses = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Addresss = await addressApi.getAll(isActive, companyId);
  return Addresss.data;
};

export const updateAddress = async (
  addressId: number,
  updatedData: any
) => {
  const updatedAddress = await addressApi.update(
    addressId,
    updatedData
  );
  return updatedAddress;
};


export const deleteAddress = async (
  addressId: number
): Promise<ResponseData> => {
  const responseData = await addressApi.delete(addressId);
  return responseData;
};

export const createAddress = async (addressData: Address) => {
  const newAddress = await addressApi.post(addressData);
  return newAddress;
};
