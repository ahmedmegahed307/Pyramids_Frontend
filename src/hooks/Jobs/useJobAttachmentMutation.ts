import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobAttachment from "../../models/JobAttachment";
import { deleteJobAttachment } from "../../services/Attachments/attachmentService";


const useAttachmentMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean,
  jobId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobAttachment | number>(
    async (attachment: JobAttachment | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (attachment as JobAttachment).id;
        return;
      } else {
        const id = attachment as number;
        return await deleteJobAttachment(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById", { id: jobId }],
        });

        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Attachment has been updated successfully!"
            : "Attachment has been deleted successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useAttachmentMutation;
