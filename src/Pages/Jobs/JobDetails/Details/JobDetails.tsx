import {
  Flex,
  VStack,
  Button,
  HStack,
  useDisclosure,
  Card,
  CardBody,
  Divider,
  Modal,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
  Textarea,
  useBreakpointValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import moment from "moment";

import { IconJobAssignee } from "../../../../assets/icons/jobs/IconJobAssignee";
import { IconJobClient } from "../../../../assets/icons/jobs/IconJobClient";
import { IconJobJobtype } from "../../../../assets/icons/jobs/IconJobJobtype";
import { IconJobSubtype } from "../../../../assets/icons/jobs/IconJobSubtype";
import { IconJobSite } from "../../../../assets/icons/jobs/IconJobSite";
import { IconJobPriority } from "../../../../assets/icons/jobs/IconJobPriority";
import { IconJobSchedule } from "../../../../assets/icons/jobs/IconJobSchedule";
import { IconJobDuration } from "../../../../assets/icons/jobs/IconJobduration";
import { IconJobDescription } from "../../../../assets/icons/jobs/IconJobDescription";

import { Job } from "../../../../models/Job";
import JobRowSetting from "../JobRowSetting";
import { EJobStatus } from "../../../../models/Enums/EJobStatus";
import AssignEngineer from "./AssignEngineer";
import useJobMutation from "../../../../hooks/Jobs/useJobMutation";
import CancelReason from "./CancelReason";
import { useState } from "react";
import Swal from "sweetalert2";
import useCreateJobAction from "../../../../hooks/Jobs/useCreateJobAction";
import JobAction from "../../../../models/JobAction";
import { EJobActionType } from "../../../../models/Enums/EJobActionType";
import { EJobActionComments } from "../../../../models/Enums/EJobActionComments";
import useAuthStore from "../../../../hooks/Authentication/store";
import PartsMain from "./Parts/PartsMain";
import { id } from "date-fns/locale";
import useGetAssetsByClientId from "../../../../hooks/Settings/Assets/MainAsset/useGetAssetsByClientId";
import IssuesMain from "./Issues/IssuesMain";
import AttachmentsMain from "./Attachments/AttachmentsMain";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import useJobStatusMutation from "../../../../hooks/Jobs/useJobStatusMutation";
import useCreateNotification from "../../../../hooks/Notification/useCreateNotification";
import { ENotification } from "../../../../models/Enums/ENotification";
import { INotification } from "../../../../models/Interfaces/INotification";
interface Props {
  job: Job | undefined;
}
const JobDetails = ({ job }: Props) => {
  const { user } = useAuthStore();

  //JobAction
  const jobActionQuery = useCreateJobAction(job?.id);
  //job mutation
  const jobStatusMutation = useJobStatusMutation();

  //Notification Query
  const notificationQuery = useCreateNotification();

  //assignEngineer popup
  const assignEngineerModal = useDisclosure();

  //resolve job

  const handleResolveJob = async () => {
    jobStatusMutation.mutateAsync({
      jobId: job?.id,
      jobStatusId: EJobStatus.RESOLVED,
    });

    const jobAction: JobAction = {
      source: "Admin",
      actionDate: new Date(),
      comments: EJobActionComments.RESOLVED,
      jobActionTypeId: EJobActionType.Resolved,
      createdByUserId: user?.id,
      jobId: job?.id,
    };
    jobActionQuery.mutateAsync(jobAction);

    const notification: INotification = {
      message: `${ENotification.JOBRSOLVE} ${job?.id}`,
      createdByUserId: user?.id,
      companyId: user?.companyId,
    };
    notificationQuery.mutateAsync(notification);
  };

  //send job back to open

  const handleSendJobToOpen = async () => {
    jobStatusMutation.mutateAsync({
      jobId: job?.id,
      jobStatusId: EJobStatus.OPEN,
      engineerId: null,
    });

    const jobAction: JobAction = {
      source: "Admin",
      actionDate: new Date(),
      comments: EJobActionComments.REOPENED,
      jobActionTypeId: EJobActionType.Reopened,
      createdByUserId: user?.id,
      jobId: job?.id,
    };
    jobActionQuery.mutateAsync(jobAction);
    const notification: INotification = {
      message: `${ENotification.JOBREOPEN} ${job?.id}`,
      createdByUserId: user?.id,
      companyId: user?.companyId,
    };
    notificationQuery.mutateAsync(notification);
  };

  //cancel reason popup
  const cancelReasonModal = useDisclosure();

  //tabs
  const [activeTab, setActiveTab] = useState("Issues");

  // get assets according to selected client
  const { data: clientAssets } = useGetAssetsByClientId(job?.clientId);
  const navigate = useNavigate();
  // Add state for editing description
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(job?.description);
  const [editedDescription, setEditedDescription] = useState(job?.description);
  // edit job from job details
  const jobMutation = useJobMutation(() => {}, true);
  const handleUpdateJob = async () => {
    if (isEditingDescription || editedDescription === job?.description) {
      return Swal.fire({
        title: "Error",
        text: "There is nothing to update, please make some changes first.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    await jobMutation.mutateAsync({
      ...job,
      description: editedDescription,
    });
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex direction={"column"} mt={5}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          gap={5}
        >
          <GridItem>
            <VStack spacing={5}>
              <JobRowSetting
                icon={<IconJobClient />}
                label="Client"
                value={job?.client?.name ?? "-"}
              />
              <JobRowSetting
                icon={<IconJobSite />}
                label="Site"
                value={job?.site?.name ?? "-"}
              />
              <JobRowSetting
                icon={<IconJobJobtype />}
                label="Job type"
                value={job?.jobType?.name ?? "-"}
              />
              <JobRowSetting
                icon={<IconJobSubtype />}
                label="Sub type"
                value={job?.jobSubType?.name ?? "-"}
              />
              <JobRowSetting
                icon={<IconJobSite />}
                label="Address"
                value={
                  job?.site
                    ? job.site.addressLine1 + ", " + job.site.addressLine2
                    : "-"
                }
              />
              <JobRowSetting
                icon={<IconJobClient />}
                label="Contact"
                value={
                  (job?.contact?.name ? job?.contact?.name + " || " : "") +
                  (job?.contact?.phone ? job?.contact?.phone + " || " : "") +
                  (job?.contact?.email ? job?.contact?.email : "-")
                }
              />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing={5}>
              <JobRowSetting
                icon={<IconJobAssignee />}
                label="Assignee"
                value={
                  job?.engineer
                    ? job?.engineer?.firstName + " " + job?.engineer?.lastName
                    : "-"
                }
              />
              <JobRowSetting
                icon={<IconJobClient />}
                label="Tech Comments"
                value={
                  job?.techComments == "undefined" ? "-" : job?.techComments
                }
              />

              <JobRowSetting
                label="Priority"
                icon={<IconJobPriority />}
                value={job?.jobPriority?.priority ?? "-"}
              />

              <JobRowSetting
                label="Status"
                icon={<IconJobPriority />}
                value={job?.jobStatus?.status ?? "-"}
              />
              <JobRowSetting
                icon={<IconJobSchedule />}
                label="Schedule date"
                value={
                  moment(job?.scheduleDateEnd).format("DD/MM/YYYY hh:mm a") ??
                  ""
                }
              />
              <JobRowSetting
                label="Est. duration "
                icon={<IconJobDuration />}
                value={job?.estimatedDuration ?? 0}
              />
            </VStack>
          </GridItem>
        </Grid>

        <Card
          mt={10}
          mb={5}
          w={{
            base: "100%",
            md: "100%",
            lg: "80%",
          }}
          h={"120px"}
          boxShadow={"none"}
        >
          <HStack pl={2} pb={1} bg={"#F0F1F3"}>
            <IconJobDescription />
            <Text color={"Neutral.500"}>Description</Text>
            {!isEditingDescription ? (
              <IconButton
                aria-label="Edit description"
                icon={<EditIcon />}
                onClick={() => setIsEditingDescription(true)}
                variant={"outline"}
                color={"Primary.700"}
                border={"none"}
                size={"sm"}
              />
            ) : (
              <HStack spacing={0}>
                <IconButton
                  aria-label="Save description"
                  icon={<CheckIcon />}
                  onClick={() => {
                    setIsEditingDescription(false);
                    setDescription(editedDescription); // Update description with editedDescription
                  }}
                  variant={"outline"}
                  color={"Primary.700"}
                  border={"none"}
                  size={"sm"}
                />
                <IconButton
                  aria-label="Cancel editing description"
                  icon={<CloseIcon />}
                  onClick={() => {
                    setIsEditingDescription(false);
                    setEditedDescription(description); // Reset editedDescription to the current description
                  }}
                  variant={"outline"}
                  color={"red.500"}
                  border={"none"}
                  size={"sm"}
                />
              </HStack>
            )}
          </HStack>{" "}
          {isEditingDescription ? (
            <Textarea
              p={5}
              h={"90px"}
              border={"1px solid #E2E2E2"}
              color={"Neutral.500"}
              defaultValue={job?.description}
              onChange={(e) => setEditedDescription(e.target.value)} // Update editedDescription on change
              value={editedDescription} // Use editedDescription instead of job?.description
            />
          ) : (
            <CardBody border={"1px solid #E2E2E2"} color={"Neutral.500"}>
              {description}
            </CardBody>
          )}
        </Card>
        <Flex
          gap={2}
          mt={{
            base: 10,
            md: 5,
          }}
          justifyContent={"flex-start"}
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <Button
            size={"md"}
            variant={"outline"}
            onClick={() => handleUpdateJob()}
          >
            Save Changes
          </Button>
          {job?.jobStatus?.id !== EJobStatus.CANCELLED &&
            job?.jobStatus?.id !== EJobStatus.CLOSED && (
              // <Link to={`/jobs/edit/${job?.id}`}>
              <Button
                size={"md"}
                variant={"outline"}
                onClick={() => {
                  Swal.fire({
                    title: "Ahmed Note:",
                    text: "Not Implemented Yet",
                    icon: "warning",
                  });
                }}
              >
                Edit Job
              </Button>
              // </Link>
            )}

          {job?.jobStatus?.id !== EJobStatus.RESOLVED &&
            job?.jobStatus?.id !== EJobStatus.CLOSED &&
            job?.jobStatus?.id !== EJobStatus.PENDING &&
            job?.jobStatus?.id !== EJobStatus.CANCELLED && (
              <Button
                size={"md"}
                variant={"outline"}
                onClick={async () => {
                  handleResolveJob();
                }}
              >
                Resolve Job
              </Button>
            )}

          {job?.jobStatus?.id == EJobStatus.OPEN && (
            <Button
              size={"md"}
              variant={"outline"}
              onClick={assignEngineerModal.onOpen}
            >
              Assignee
            </Button>
          )}

          {job?.jobStatus?.id !== EJobStatus.ASSIGNED &&
            job?.jobStatus?.id !== EJobStatus.CLOSED &&
            job?.jobStatus?.id !== EJobStatus.PENDING &&
            job?.jobStatus?.id !== EJobStatus.CANCELLED && (
              <Button
                size={"md"}
                variant={"outline"}
                onClick={cancelReasonModal.onOpen}
              >
                Cancel Job
              </Button>
            )}
          {job?.jobStatus?.id !== EJobStatus.PENDING &&
            job?.jobStatus?.id !== EJobStatus.CLOSED &&
            job?.jobStatus?.id !== EJobStatus.OPEN &&
            job?.jobStatus?.id !== EJobStatus.CANCELLED && (
              <Button
                size={"md"}
                variant={"outline"}
                onClick={async () => {
                  handleSendJobToOpen();
                }}
              >
                Reopen Job
              </Button>
            )}
          {/* )} */}

          {job?.jobStatus?.id !== EJobStatus.ASSIGNED &&
            job?.jobStatus?.id !== EJobStatus.OPEN &&
            job?.jobStatus?.id !== EJobStatus.PENDING &&
            job?.jobStatus?.id !== EJobStatus.CANCELLED && (
              // <Link to={`/jobs/${job?.id}/workDocket`}>
              <Button
                size={"md"}
                variant={"outline"}
                onClick={() => {
                  Swal.fire({
                    title: "Ahmed Note:",
                    text: "Not Implemented Yet",
                    icon: "warning",
                  });
                }}
              >
                Work Docket
              </Button>
              // </Link>
            )}
        </Flex>

        <Tabs
          color={"Neutral.500"}
          width={{
            base: "100%",
            md: "100%",
            lg: "80%",
          }}
          mt={10}
        >
          <TabList>
            <Tab
              color={activeTab === "Issues" ? "Primary.700" : "gray.500"}
              onClick={() => setActiveTab("Issues")}
            >
              Issues
            </Tab>

            {/* <Tab
              color={activeTab === "Attachments" ? "Primary.700" : "gray.500"}
              onClick={() => setActiveTab("Attachments")}
            >
              Attachments
            </Tab> */}
            {/* <Tab
              color={activeTab === "Parts" ? "Primary.700" : "gray.500"}
              onClick={() => setActiveTab("Parts")}
            >
              Parts
            </Tab> */}
          </TabList>

          <TabPanels>
            <TabPanel>
              <IssuesMain
                issues={job?.jobIssues?.filter((a) => a.isActive) ?? []}
                clientAssets={clientAssets ?? []}
                jobId={job?.id}
              />
            </TabPanel>

            {/* <TabPanel>
              <AttachmentsMain
                attachments={
                  job?.jobAttachments?.filter((a) => a.isActive) ?? []
                }
                jobId={job?.id}
              />
            </TabPanel>
            <TabPanel>
              <PartsMain
                parts={job?.jobParts.filter((a) => a.isActive) ?? []}
                jobId={job?.id}
              />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>

      {/* Cancel Reason popup */}
      <Modal
        isOpen={cancelReasonModal.isOpen}
        onClose={cancelReasonModal.onClose}
      >
        <CancelReason
          jobId={job.id || undefined}
          cancelReasonModal={cancelReasonModal}
        />
      </Modal>

      {/* Assign Engineer */}
      <Modal
        isOpen={assignEngineerModal.isOpen}
        onClose={assignEngineerModal.onClose}
      >
        <AssignEngineer
          job={job || undefined}
          assignEngineerModal={assignEngineerModal}
        />
      </Modal>
    </>
  );
};

export default JobDetails;
