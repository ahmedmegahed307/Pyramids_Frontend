import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { createJob } from "../../services/Job/jobService";
import { Job } from "../../models/Job";
import { useNavigate } from "react-router-dom";

const useCreatePendingJob = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation<ResponseData, Error, Job>(
    async (job: Job): Promise<ResponseData> => {
      return await createJob(job);
    },
    {
      onSuccess: (responseData) => {
        Swal.fire({
          title: "Success",
          text: `Your request has been sent. Here is your call number: ${responseData.data.id}`,
          icon: "success",
          timer: 2000,
        });
          setTimeout(() => {
      
          navigate('/clientPortal/jobs/pending');
        }, 2000);
       
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useCreatePendingJob;
