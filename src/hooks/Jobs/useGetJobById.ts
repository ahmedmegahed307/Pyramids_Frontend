import { useQuery } from "@tanstack/react-query";
import { Job } from "../../models/Job";
import { getJobById } from "../../services/Job/jobService";

const useGetJobById = (id: number) => {
  return useQuery<Job, Error>(["jobById", { id }], () => getJobById(id));
};

export default useGetJobById;
