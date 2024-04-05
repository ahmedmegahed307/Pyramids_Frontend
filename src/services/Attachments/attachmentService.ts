import JobAttachment from "../../models/JobAttachment";
import Api from "../api-fetch";

const attachmentApi = new Api<any>("/Attachment");
//Job Attachment
export const deleteJobAttachment = async (attachmentId: number): Promise<ResponseData> => {

  const responseData = await attachmentApi.delete(attachmentId);
  return responseData;
};

export const createJobAttachment = async (jobAttachmentData: JobAttachment) => {
  const formData = new FormData();
  formData.append("jobId", jobAttachmentData.jobId.toString());
  formData.append("fileName", jobAttachmentData.fileName.toString());
  formData.append("fileType", jobAttachmentData.fileType?.toString());
  formData.append("fileURL", jobAttachmentData.fileURL?.toString());
  formData.append("fileToUpload", jobAttachmentData?.fileToUpload);

  const jobAttachmentAPI = new Api<any>("/Attachment/CreateJobAttachment");

  const newJobAttachment = await jobAttachmentAPI.postMultiForm(formData);
  return newJobAttachment;
};
