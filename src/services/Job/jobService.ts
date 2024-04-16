import { IJobStatusUpdateData } from "../../models/Interfaces/IJobStatusUpdateData";
import { Job } from "../../models/Job";
import Api from "../api-fetch";

const JobApi = new Api<any>("/Job");

export const getAllJobs = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const getAll = new Api<any>("/Job/GetAllJobs");
  const Jobs = await getAll.getAll(isActive, companyId);
  console.log(Jobs);
  return Jobs.data;
};

export const getLastFiveJobsForSiteId = async (
  siteId: number
): Promise<Job[]> => {
  const queryParams = {
    siteId: siteId,
  };
  const getJobsBySiteId = new Api<Job[]>("/Job/GetLastFiveJobsForSiteId");
  const response = await getJobsBySiteId.get(queryParams);
  return response.data;
};
export const getJobById = async (id: number): Promise<Job> => {
  const queryParams = {
    id: id,
  };
  const GetByIdApi = await new Api<any>("/Job/" + id).getAll();

  return GetByIdApi.data;
};

export const updateJob = async (JobId: number, updatedData: any) => {
  const updatedJob = await JobApi.update(JobId, updatedData);
  return updatedJob;
};

export const deleteJob = async (JobId: number): Promise<ResponseData> => {
  const responseData = await JobApi.delete(JobId);
  return responseData;
};

export const updateJobStatus = async (
  jobId: number,
  jobStatusUpdateData: IJobStatusUpdateData
) => {
  const jobStatusAPI = new Api<any>(`/Job/${jobId}/JobStatus`);
  const response = await jobStatusAPI.update(null, jobStatusUpdateData);
  return response;
};

export const updateJobScheduleDate = async (id: number, job: any) => {
  const jobScheduleDateAPI = new Api<any>(`/Job/${id}/UpdateJobScheduleDate`);
  const response = await jobScheduleDateAPI.update(null, job);
  return response;
};
export const createJob = async (jobData: Job) => {
  console.log("jobData::", jobData);
  const formData = new FormData();
  // Append individual fields from jobData
  formData.append("companyId", jobData.companyId.toString());
  formData.append("clientId", jobData.clientId.toString());
  formData.append("siteId", jobData.siteId?.toString() || null);
  formData.append("contactId", jobData.contactId?.toString() || null);
  formData.append("techComments", jobData?.techComments || "");
  formData.append("jobTypeId", jobData.jobTypeId?.toString() || null);
  formData.append("jobSubTypeId", jobData.jobSubTypeId?.toString() || null);
  formData.append("description", jobData?.description || "");
  formData.append("engineerId", jobData.engineerId?.toString() || null);
  formData.append("jobStatusId", jobData.jobStatusId.toString() || null);
  formData.append("jobPriorityId", jobData.jobPriorityId?.toString() || null);
  formData.append("scheduleDateEnd", jobData.scheduleDateEnd || null);
  formData.append(
    "EstimatedDuration",
    jobData.estimatedDuration?.toString() || null
  );
  formData.append(
    "createdByUserId",
    jobData.createdByUserId?.toString() || null
  );

  jobData.jobIssueCreateDto?.forEach((issue, index) => {
    formData.append(`jobIssueCreateDto[${index}].id`, issue.id.toString());
    formData.append(
      `jobIssueCreateDto[${index}].assetId`,
      issue?.assetId !== 0 ? issue.assetId.toString() : null
    );
    formData.append(
      `jobIssueCreateDto[${index}].description`,
      issue.description
    );
    formData.append(
      `jobIssueCreateDto[${index}].jobIssuePriority`,
      issue.jobIssuePriority
    );
  });

  // Append each jobParts as a separate part
  // jobData.jobParts?.forEach((part, index) => {
  //   formData.append(`jobParts[${index}].id`, part.id.toString());
  //   formData.append(`jobParts[${index}].quantity`, part.quantity.toString());
  //   formData.append(`jobParts[${index}].productId`, part.productId.toString());
  // });
  // jobData?.filesToUpload?.forEach((file, index) => {
  //   formData.append(`filesToUpload[${index}]`, file);
  // } );
  const createJob = new Api<any>("/Job/CreateJob");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const newJob = await createJob.postMultiForm(formData);
  return newJob;
};

//client portal
export const getAllClientJobs = async ({ queryKey }: any) => {
  const [, { jobStatusId, clientId }] = queryKey;
  const clientJob = new Api<any>("/ClientPortal/GetAllJobsByClientId");
  const response = await clientJob.getClientPortalAll(jobStatusId, clientId);
  return response.data;
};
