import Company from "../../models/Company";
import Api from "../api-fetch";

const companyApi = new Api<any>("/Company");

export const getAllCompanies = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const companies = await companyApi.getAll(isActive, companyId);
  return companies.data;
};
export const getCompanyById = async (id: number): Promise<Company> => {
  const GetByIdApi = await new Api<any>("/Company/" + id).get();
  return GetByIdApi.data;
};
export const updateCompany = async (companyId: number, updatedData: any) => {
  const updatedCompany = await companyApi.update(companyId, updatedData);
  return updatedCompany;
};

export const deleteCompany = async (
  companyId: number
): Promise<ResponseData> => {
  const responseData = await companyApi.delete(companyId);
  return responseData;
};

export const createCompany = async (companyData: Company) => {
  const newCompany = await companyApi.post(companyData);
  return newCompany;
};


export const updateCompanyLogo = async (companyId:number,file: File) => {
  const formData = new FormData();
  formData.append("logo", file);

  const companyLogoAPI = new Api<any>(`/Company/${companyId}/UploadLogo`);
  const newLogo = await companyLogoAPI.updateMultiForm(null,formData);
 return newLogo;
};