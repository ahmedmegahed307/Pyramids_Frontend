import JobIssue from "../../models/JobIssue";
import Api from "../api-fetch";

const issueApi = new Api<any>("/JobIssue");

export const getAllIssues = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const response = await issueApi.getAll(isActive, companyId);
  return response.data;
};

export const getIssuesByJobId = async (jobId: number): Promise<JobIssue[]> => {
  const queryParams = {
    jobId: jobId,
  };
  const issueApi = new Api<any>("/JobIssue/GetIssuesByJobId");
  const response = await issueApi.get(queryParams);
  return response.data;
};
export const updateIssue = async (issueId: number, updatedData: any) => {
  const updatedIssue = await issueApi.update(issueId, updatedData);
  return updatedIssue;
};

export const deleteIssue = async (issueId: number): Promise<ResponseData> => {
  const responseData = await issueApi.delete(issueId);
  return responseData;
};

export const createIssue = async (issueData: JobIssue) => {
  const newIssue = await issueApi.post(issueData);
  return newIssue;
};
