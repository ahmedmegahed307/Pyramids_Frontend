import { AITextProcessingRequest } from "../../models/Interfaces/AITextProcessingRequest";
import { Job } from "../../models/Job";
import Api from "../api-fetch";

export const textProcessingRequest = async (
  request: AITextProcessingRequest
) => {
  const processText = new Api<any>("/OpenAI/ProcessText");
  const result = await processText.post(request);
  return result;
};


export const createJobByAI = async (jobData: Job) => {
  const createJob = new Api<any>("/OpenAI/createJobByAI");
  const result = await createJob.post(jobData);
  return result;
}