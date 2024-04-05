import { JobQueryFormData } from "../../Pages/Reports/JobQuery/JobQuery";
import { Job } from "../../models/Job";
import Api from "../api-fetch";

export const GetJobQueryData = async (jobQueryFormData : JobQueryFormData): Promise<Job[]> => {
    const queryParams = {
        companyId: jobQueryFormData.companyId,
        dateType: jobQueryFormData.dateType,
        dateFrom: jobQueryFormData.dateFrom.toString(),
        dateTo: jobQueryFormData.dateTo.toString(),
        jobTypeId: jobQueryFormData.jobTypeId,
        jobSubTypeId: jobQueryFormData.jobSubTypeId,
        jobStatusId: jobQueryFormData.jobStatusId,
        jobPriorityId: jobQueryFormData.jobPriorityId,
        clientId: jobQueryFormData.clientId,
        siteId: jobQueryFormData.siteId,
    };
    const jobQueryApi = new Api<any>("/Report/GetJobQueryData");
    const response = await jobQueryApi.get(queryParams);
    return response.data;
  };