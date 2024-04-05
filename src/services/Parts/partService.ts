import JobPart from "../../models/JobPart";
import Api from "../api-fetch";

const partApi = new Api<any>("/Part");

export const getAllParts = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const response = await partApi.getAll(isActive, companyId);
  return response.data;
};

export const getPartsByJobId = async (jobId: number): Promise<JobPart[]> => {
  const queryParams = {
    jobId: jobId,
  };
  const partApi = new Api<any>("/Part/GetPartsByJobId");
  const response = await partApi.get(queryParams);
  return response.data;
};
export const updatePart = async (partId: number, updatedData: any) => {
  const updatedPart = await partApi.update(partId, updatedData);
  return updatedPart;
};

export const deletePart = async (partId: number): Promise<ResponseData> => {
  const responseData = await partApi.delete(partId);
  return responseData;
};

export const createPart = async (partData: JobPart) => {
  const newPart = await partApi.post(partData);
  return newPart;
};
