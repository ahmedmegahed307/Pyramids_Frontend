import JobAction from "../../models/JobAction";
import Api from "../api-fetch";

export const createJobAction = async (jobAction: JobAction) => {
  const jobActionAPI = new Api<any>("/JobAction/Create");

  const newJobAction = await jobActionAPI.post(jobAction);
  return newJobAction;
};
