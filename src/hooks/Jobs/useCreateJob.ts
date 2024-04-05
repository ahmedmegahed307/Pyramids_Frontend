import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { createJob } from "../../services/Job/jobService";
import { Job } from "../../models/Job";
import useCreateJobAction from "./useCreateJobAction";
import JobAction from "../../models/JobAction";
import { EJobActionComments } from "../../models/Enums/EJobActionComments";
import { EJobActionType } from "../../models/Enums/EJobActionType";
import useAuthStore from "../Authentication/store";
import useCreateNotification from "../Notification/useCreateNotification";
import { INotification } from "../../models/Interfaces/INotification";
import { ENotification } from "../../models/Enums/ENotification";
import { useNavigate } from "react-router-dom";
import useCreateIssue from "../Settings/Issue/useCreateIssue";
import JobIssue from "../../models/JobIssue";

const useCreateJob = (isAttachmentAdded?: boolean,isPendingJob?:boolean) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const jobActionQuery = useCreateJobAction(0);

  const notificationQuery = useCreateNotification();
  const issueQuery = useCreateIssue();
  const navigate = useNavigate();

  return useMutation<ResponseData, Error, Job>(
    async (job: Job): Promise<ResponseData> => {
      return await createJob(job);
    },
    {
      onSuccess: (responseData) => {
        const jobAction: JobAction = {
          source: "Admin",
          actionDate: new Date(),
          comments: EJobActionComments.Created,
          jobActionTypeId: EJobActionType.Created,
          createdByUserId: user?.id,
          jobId: responseData.data.id,
        };
        jobActionQuery.mutateAsync(jobAction);
        const notification: INotification = {
          message: `${ENotification.JOBCREATE} ${responseData.data.id} `,
          createdByUserId: user?.id,
          companyId: user?.companyId,
        };
        const issue: JobIssue = {
          jobId: responseData.data.id,
        };
        notificationQuery.mutateAsync(notification);
        queryClient.invalidateQueries({
          queryKey: ["jobsList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["scheduler", { companyId: user?.companyId }],
        });

        // Swal.fire({
        //   title: "Success",
        //   text: "Job has been Created successfully!",
        //   icon: "success",
        // });

        // Redirect to the newly created job's URL
        if(isPendingJob)
        {
          setTimeout(() => {
         Swal.fire({
           title: "Success",
           text: `Your request has been sent. Here is your call number: ${responseData.data.id}`,
           icon: "success",
         });
          navigate('/clientPortal/jobs/pending');
        }, 2000);
        }
        else if (!isAttachmentAdded) {
          setTimeout(() => {
            if (responseData && responseData.data) {
              const jobId = responseData.data.id;
              navigate(`/jobs/${jobId}`);
            }
          }, 1000);
        }
       
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

export default useCreateJob;
