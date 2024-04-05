import JobSubType from "../../models/JobSubType";
import Api from "../api-fetch";

const SubTypeApi = new Api<any>("/JobSubType");

export const getAllSubTypes = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const getAllSubTypes = new Api<any>("/JobSubType/GetAllJobSubTypes");

  const SubTypes = await getAllSubTypes.getAll(isActive, companyId);
  return SubTypes.data;
};
export const getAllSubTypesByTypeId = async (typeId: number): Promise<JobSubType[]> => {
  const queryParams = {
    typeId: typeId
   
  };
  const SubTypesApi = new Api<any>("/JobSubType/GetAllSubTypesByTypeId");
  const SubTypes = await SubTypesApi.get(queryParams);
  return SubTypes.data;
};
export const updateSubType = async (
  SubTypeId: number,
  updatedData: any
) => {
  const updatedSubType = await SubTypeApi.update(
    SubTypeId,
    updatedData
  );
  return updatedSubType;
};


export const deleteSubType = async (
  SubTypeId: number
): Promise<ResponseData> => {
  const responseData = await SubTypeApi.delete(SubTypeId);
  return responseData;
};

export const createSubType = async (SubTypeData: JobSubType) => {
  const newSubType = await SubTypeApi.post(SubTypeData);
  return newSubType;
};
