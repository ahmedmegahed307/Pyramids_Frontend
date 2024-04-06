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
  Select,
  Input,
  Center,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { Job } from "../../../../models/Job";
import useAuthStore from "../../../../hooks/Authentication/store";
import useEngineer from "../../../../hooks/Settings/User/useEngineer";
import useJobMutation from "../../../../hooks/Jobs/useJobMutation";
import { EJobStatus } from "../../../../models/Enums/EJobStatus";
import JobAction from "../../../../models/JobAction";
import { EJobActionComments } from "../../../../models/Enums/EJobActionComments";
import { EJobActionType } from "../../../../models/Enums/EJobActionType";
import useCreateJobAction from "../../../../hooks/Jobs/useCreateJobAction";
import User from "../../../../models/User";
import useJobStatusMutation from "../../../../hooks/Jobs/useJobStatusMutation";
import { INotification } from "../../../../models/Interfaces/INotification";
import { ENotification } from "../../../../models/Enums/ENotification";
import useCreateNotification from "../../../../hooks/Notification/useCreateNotification";

interface AssignJobsProps {
  job: Job | undefined;
  assignEngineerModal: any;
}

const AssignEngineer = ({ job, assignEngineerModal }: AssignJobsProps) => {
  //Notification Query
  const notificationQuery = useCreateNotification();
  //JobAction
  const jobActionQuery = useCreateJobAction(job?.id);
  const { user } = useAuthStore();
  const jobStatusMutation = useJobStatusMutation();

  const { data: engineersList } = useEngineer(true);
  const [assignEngineer, setAssignEngineer] = useState<User>(undefined);
  const [schedule, setSchedule] = useState<Date>();
  const handleAssignEngineer = async () => {
    jobStatusMutation.mutateAsync({
      jobId: job?.id,
      engineerId: assignEngineer.id,
      jobStatusId: EJobStatus.ASSIGNED,
    });

    assignEngineerModal.onClose();

    const jobAction: JobAction = {
      source: "Admin",
      actionDate: new Date(),
      comments:
        EJobActionComments.ASSIGNED +
        assignEngineer?.firstName +
        " " +
        assignEngineer?.lastName,
      jobActionTypeId: EJobActionType.Assigned,
      createdByUserId: user?.id,
      jobId: job?.id,
    };
    jobActionQuery.mutateAsync(jobAction);

    const notification: INotification = {
      message: `${ENotification.JOBASSIGN} ${job?.id} to Eng. ${assignEngineer?.firstName} ${assignEngineer?.lastName}`,
      createdByUserId: user?.id,
      companyId: user?.companyId,
    };
    notificationQuery.mutateAsync(notification);
  };
  return (
    <Flex direction={"column"} alignItems="center" mx="auto" px="5">
      <ModalOverlay />
      <ModalContent height={"auto"}>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb={5} w={"sm"} mt={10}>
            <Select
              onChange={(e) =>
                setAssignEngineer(
                  engineersList.find(
                    (option) => option.id === parseInt(e.target.value)
                  ) || {}
                )
              }
            >
              <option value="">Select Engineer</option>
              {engineersList?.map((option) => (
                <option key={option.id} value={option.id || ""}>
                  {option?.firstName + " " + option?.lastName}
                </option>
              ))}
            </Select>
          </FormControl>
          {job?.scheduleDateEnd === null && (
            <FormControl pb={5} w={"sm"} mt={5}>
              <Input
                onChange={(e) => setSchedule(new Date(e.target.value))}
                type="datetime-local"
                className="FormControl"
                placeholder="Select Schedule Date"
              />
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            bg={"Primary.500"}
            mr={3}
            isDisabled={assignEngineer === undefined}
            onClick={handleAssignEngineer}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Flex>
  );
};

export default AssignEngineer;
