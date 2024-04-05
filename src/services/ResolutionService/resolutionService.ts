import Resolution from "../../models/Resolution";
import Api from "../api-fetch";

const ResolutionApi = new Api<any>("/Resolution");


export const getAllResolutions = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Resolutions = await ResolutionApi.getAll(isActive, companyId);
  return Resolutions.data;
};

export const updateResolution = async (
  ResolutionId: number,
  updatedData: any
) => {
  const updatedResolution = await ResolutionApi.update(
    ResolutionId,
    updatedData
  );
  return updatedResolution;
};

export const deleteResolution = async (
  ResolutionId: number
): Promise<ResponseData> => {
  const responseData = await ResolutionApi.delete(ResolutionId);
  return responseData;
};

export const createResolution = async (ResolutionData: Resolution) => {
  const newResolution = await ResolutionApi.post(ResolutionData);
  return newResolution;
};
