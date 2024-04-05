import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Job } from "../../models/Job";
import JobAction from "../../models/JobAction";
import { EJobActionComments } from "../../models/Enums/EJobActionComments";
import { EJobActionType } from "../../models/Enums/EJobActionType";
import useAuthStore from "../Authentication/store";
import useCreateNotification from "../Notification/useCreateNotification";
import { INotification } from "../../models/Interfaces/INotification";
import { ENotification } from "../../models/Enums/ENotification";
import { useNavigate } from "react-router-dom";
import useCreateJobAction from "../Jobs/useCreateJobAction";
import { createJobByAI } from "../../services/AIService/AIService";

const useCreateJobWithAI = (isAttachmentAdded?: boolean) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const jobActionQuery = useCreateJobAction(0);
  //Notification Query
  const notificationQuery = useCreateNotification();
  const navigate = useNavigate();

  return useMutation<ResponseData, Error, Job>(
    async (job: Job): Promise<ResponseData> => {
      return await createJobByAI(job);
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
        notificationQuery.mutateAsync(notification);
        queryClient.invalidateQueries({
          queryKey: ["jobsList"],
        });

        Swal.fire({
          title: "Success",
          text: "Job has been created successfully!",
          icon: "success",
          timer: 1000,
        });


       
        setTimeout(() => {
            if (responseData && responseData.data) {
              const jobId = responseData.data.id;
              const newTab = window.open(`/jobs/${jobId}`, "_blank");
              if (newTab) {
                newTab.focus();
              }
            }
          }, 1000);
      
      },
      onError: (error: any) => {
        Swal.fire({
          text: error.response.data.message,
        
          icon: "error",
        });
      },
    }
  );
};

export default useCreateJobWithAI;
