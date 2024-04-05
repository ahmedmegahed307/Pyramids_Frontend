import Api from "../api-fetch";

const GeneralDataApi = new Api<any>("/Data");

// Fetch Data needed to create Job(reason:performance)
export const GetJobCreationData = async ({ queryKey }: any) => {
  const [, { companyId }] = queryKey;
  const getJobApi = new Api<any>("/Data/GetJobCreationData");
  const getJobCreationData = await getJobApi.getAll(true, companyId);

  return getJobCreationData.data;
};
export const GetِAssetCreationData = async ({ queryKey }: any) => {
  const [, { companyId }] = queryKey;
  const getAssetApi = new Api<any>("/Data/GetAssetCreationData");
  const getِAssetCreationData = await getAssetApi.getAll(true, companyId);

  return getِAssetCreationData.data;
};
