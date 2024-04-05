import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import JobAttachment from "../../models/JobAttachment";
import { createJobAttachment } from "../../services/Attachments/attachmentService";


const useCreateJobAttachment = (OnClose?: () => void, jobId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, JobAttachment>(
    async (Attachment: JobAttachment): Promise<ResponseData> => {
      return await createJobAttachment(Attachment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobById", { id: jobId }],
        });
        // handle success
        // Swal.fire({
        //   title: "Success",
        //   text: "Attachment has been Created successfully!",
        //   icon: "success",
        //   timer: 1000,
        //   showConfirmButton: false,
        // });
        // OnClose();
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

export default useCreateJobAttachment;
