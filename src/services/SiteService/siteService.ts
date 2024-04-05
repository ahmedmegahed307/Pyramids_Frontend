import Site from "../../models/Site";
import Api from "../api-fetch";
import axios from "axios";


const SiteApi = new Api<any>("/Site");


export const getAllSites = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Sites = await SiteApi.getAll(isActive, companyId);
  return Sites.data;
};


export const getAllSitesByClientId = async (clientId: number): Promise<Site[]> => {
  const queryParams = {
    clientId: clientId
   
  };
  const sitesApi = new Api<any>("/Site/GetAllSitesByClientId");
  const Sites = await sitesApi.get(queryParams);
  return Sites.data;
};



export const createSite = async (SiteData: Site) => {
  const newSite = await SiteApi.post(SiteData);
  return newSite;
};

export const updateSite = async (SiteId: number, updatedData: any) => {
  const updatedSite = await SiteApi.update(SiteId, updatedData);
  return updatedSite;
};

export const deleteSite = async (SiteId: number): Promise<ResponseData> => {
  const responseData = await SiteApi.delete(SiteId);
  return responseData;
};

