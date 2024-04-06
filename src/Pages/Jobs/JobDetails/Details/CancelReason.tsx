import { useState } from "react";
import {
  Flex,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Text,
  Textarea,
} from "@chakra-ui/react";

import Swal from "sweetalert2";
import { Job } from "../../../../models/Job";
import useAuthStore from "../../../../hooks/Authentication/store";
import JobAction from "../../../../models/JobAction";
import { EJobActionComments } from "../../../../models/Enums/EJobActionComments";
import { EJobActionType } from "../../../../models/Enums/EJobActionType";
import useCreateJobAction from "../../../../hooks/Jobs/useCreateJobAction";
import useJobStatusMutation from "../../../../hooks/Jobs/useJobStatusMutation";
import { EJobStatus } from "../../../../models/Enums/EJobStatus";
import { INotification } from "../../../../models/Interfaces/INotification";
import { ENotification } from "../../../../models/Enums/ENotification";
import useCreateNotification from "../../../../hooks/Notification/useCreateNotification";
import { useQueryClient } from "@tanstack/react-query";

interface ClientJobsProps {
  jobId: number | undefined;
  cancelReasonModal: any;
}

const CancelReason = ({ jobId, cancelReasonModal }: ClientJobsProps) => {
  const queryClient = useQueryClient();
  //Notification Query
  const notificationQuery = useCreateNotification();
  //JobAction
  const jobActionQuery = useCreateJobAction(jobId);
  const { user } = useAuthStore();
  const [cancelReason, setCancelReason] = useState("");

  const jobStatusMutation = useJobStatusMutation();

  const handleCancelReason = async () => {
    try {
      jobStatusMutation.mutateAsync({
        jobId: jobId,
        jobStatusId: EJobStatus.CANCELLED,
        cancelReason: cancelReason,
      });
      queryClient.invalidateQueries({
        queryKey: ["scheduler", { companyId: user?.companyId }],
      });
      Swal.fire({
        title: "Success",
        text: "Job status Updated successfully",
        icon: "success",
        timer: 1000,
      });
      cancelReasonModal.onClose();

      const jobAction: JobAction = {
        source: "Admin",
        actionDate: new Date(),
        comments: EJobActionComments.CANCELLED,
        jobActionTypeId: EJobActionType.Cancelled,
        createdByUserId: user?.id,
        jobId: jobId,
      };
      jobActionQuery.mutateAsync(jobAction);

      const notification: INotification = {
        message: `${ENotification.JOBCANCEL} ${jobId}`,
        createdByUserId: user?.id,
        companyId: user?.companyId,
      };
      notificationQuery.mutateAsync(notification);
    } catch (error) {
      console.error("Error updating job:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update job status",
        icon: "error",
      });
    }
  };
  return (
    <Flex direction={"column"} alignItems="center" maxW="7xl" mx="auto" px="5">
      <ModalOverlay />
      <ModalContent>
        <Text m={5} color={"red"}>
          Are you sure you want to cancel this job?
        </Text>
        <Text ml={5} color={"gray.700"}>
          If yes, please enter the reason below.
        </Text>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb={5} w={"sm"}>
            <Textarea
              className="FormControl"
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blackAlpha"
            bg={"Primary.500"}
            mr={3}
            isDisabled={cancelReason === ""}
            onClick={handleCancelReason}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Flex>
  );
};

export default CancelReason;
