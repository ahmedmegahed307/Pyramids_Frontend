import { IContract } from "../../models/Interfaces/IContract";
import Api from "../api-fetch";

export const getContractList = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const contractApi = new Api<any>("/PPM/GetContractList");
  const response = await contractApi.getAll(isActive, companyId);
  return response.data;
};

export const getContractById = async (
  contractId: number
): Promise<IContract> => {
  const queryParams = {
    contractId,
  };
  //const contractApi = new Api<any>(`/PPM/GetContractById`);
  const contractApi = new Api<any>(`/PPM/GetContractById/${contractId}`);
  const response = await contractApi.get(queryParams);
  console.log(response.data); 
  return response.data;
};

export const createContract = async (contractData: IContract) => {
  const contractApi = new Api<any>("/PPM/CreateContract");
  const newContract = await contractApi.post(contractData);
  return newContract;
};
export const updateContract = async (contractId: number, updatedData: any) => {
  const contractApi = new Api<any>("/PPM/UpdateContract");
  const updatedContract = await contractApi.update(contractId, updatedData);
  return updatedContract;
};
export const deleteContract = async (
  contractId: number
): Promise<ResponseData> => {
  const contractApi = new Api<any>("/PPM/deleteContract");
  const responseData = await contractApi.delete(contractId);
  return responseData;
};


export const getVisitList = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const visitApi = new Api<any>("/PPM/GetVisitList");
  const response = await visitApi.getAll(isActive, companyId);
  return response.data;
};

export const getReminderList = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const reminderApi = new Api<any>("/PPM/GetReminderList");
  const response = await reminderApi.getAll(isActive, companyId);
  return response.data;
};


export const reminderMarkSeen = async (remindersId: number[]) => {
  const reminderApi = new Api<any>("/PPM/ReminderMarkSeen");
  const response = await reminderApi.post(remindersId);
  return response;
};
export const generateVisits = async (visitsId: number[]) => {
  const visitApi = new Api<any>("/PPM/GenerateVisits");
  const response = await visitApi.post(visitsId);
  return response;
};