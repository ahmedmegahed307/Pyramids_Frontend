import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Divider,
  HStack,
  Flex,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import useCreateJobWithAI from "../../hooks/AI/useCreateJobWithAI";
import { Job } from "../../models/Job";
import useAuthStore from "../../hooks/Authentication/store";
import { useEffect, useState } from "react";
import useJobCreationData from "../../hooks/DataCreation/useJobCreationData";
import { JobCreationData } from "../../models/Interfaces/IJobCreationData";
import { Select } from "chakra-react-select";
import IsLoading from "../GeneralComponents/IsLoading";
import IsError from "../GeneralComponents/IsError";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobInfoFromBackend: any;
}

function CheckJobInfoPopUp({ isOpen, onClose, jobInfoFromBackend }: Props) {
  const {
    data: jobCreationData,
    isLoading,
    isError,
  } = useJobCreationData() as {
    data: JobCreationData;
    isLoading: boolean;
    isError: boolean;
  };
  const { user } = useAuthStore();
  const jobCreationQuery = useCreateJobWithAI();

  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(false);
  const [jobToCreate, setJobToCreate] = useState<Job>({
    companyId: user?.companyId,
    createdByUserId: user?.id,
    clientId: jobInfoFromBackend?.clientId,
    siteId: jobInfoFromBackend?.siteId,
    jobTypeId: jobInfoFromBackend?.jobTypeId,
    jobSubTypeId: jobInfoFromBackend?.jobSubTypeId,
    engineerId: jobInfoFromBackend?.engineerId,
    scheduleDateEnd: moment(jobInfoFromBackend?.jobDate).format(
      "yyyy-MM-DDTHH:mm"
    ),
    description: jobInfoFromBackend?.description,
  });

  const handleConfirmAndLog = () => {
    const jobToCreateWithAI: Job = {
      ...jobToCreate,
      jobStatusId: jobToCreate?.engineerId ? 2 : 1,
      jobPriorityId: 1,

      jobIssueCreateDto: jobInfoFromBackend?.issueDescription
        ? [
            {
              jobIssuePriority: "Low",
              assetId: null,
              description: jobInfoFromBackend.issueDescription,
            },
          ]
        : [],
    };
    jobCreationQuery.mutateAsync(jobToCreateWithAI);
  };

  useEffect(() => {
    console.log("jobToCreate", jobToCreate);
    if (
      jobToCreate?.clientId &&
      jobToCreate?.siteId &&
      jobToCreate?.jobTypeId
    ) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
  }, [jobToCreate]);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError />;
  }
  console.log("jobCreationData", jobCreationData);
  console.log("jobCreationData2", jobInfoFromBackend);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay
          bg="blackAlpha.500"
          // backdropFilter="blur(0px) hue-rotate(0deg)"
        />

        <ModalContent>
          <ModalHeader>Log Job Confirmation</ModalHeader>
          <Divider />
          <ModalCloseButton />

          <ModalBody mb={4}>
            <HStack w={"full"} spacing={12} mt={4}>
              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  Client <span style={{ color: "red" }}>*</span>
                </FormLabel>

                <Select
                  variant="unstyled"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: 0,
                      outline: "1px solid white",
                    }),
                  }}
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      clientId: event.value,
                    })
                  }
                  defaultValue={
                    jobInfoFromBackend?.clientId && {
                      label: jobInfoFromBackend?.clientName,
                      value: jobInfoFromBackend?.clientId,
                    }
                  }
                  useBasicStyles
                  placeholder="Select Client"
                  selectedOptionColorScheme="Primary"
                  options={
                    jobCreationData?.clients?.map((client) => {
                      return {
                        label: client.name,
                        value: client.id,
                      };
                    }) || []
                  }
                />

                <VStack align={"start"} spacing={0}>
                  <Divider
                    style={{
                      marginLeft: "2px",
                      borderWidth: "1px",
                      width: "98%",
                      borderColor:
                        jobInfoFromBackend?.clientName === "NOTENTERED"
                          ? "darkdarkorange"
                          : jobCreationData?.clients?.find(
                              (client) =>
                                client.id === jobInfoFromBackend?.clientId
                            )
                          ? "#0C9D61"
                          : "#EC2D30",
                    }}
                  />
                  {jobInfoFromBackend?.clientName !== "NOTENTERED" &&
                    !jobCreationData?.clients?.find(
                      (client) => client.id === jobInfoFromBackend?.clientId
                    ) && (
                      <Text color={"#EC2D30"} fontSize={"sm"} mb={-4}>
                        We couldn’t define client name '
                        {jobInfoFromBackend?.clientName}'
                      </Text>
                    )}
                </VStack>
              </FormControl>
              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  Site <span style={{ color: "red" }}>*</span>
                </FormLabel>

                <Select
                  variant="unstyled"
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      siteId: event.value,
                    })
                  }
                  defaultValue={
                    jobInfoFromBackend?.siteId && {
                      label: jobInfoFromBackend?.siteName,
                      value: jobInfoFromBackend?.siteId,
                    }
                  }
                  useBasicStyles
                  placeholder="Select Site"
                  selectedOptionColorScheme="Primary"
                  options={
                    jobCreationData?.sites?.map((site) => {
                      return {
                        label: site.name,
                        value: site.id,
                      };
                    }) || []
                  }
                />

                <VStack align={"start"} spacing={0}>
                  <Divider
                    style={{
                      marginLeft: "2px",
                      borderWidth: "1px",
                      width: "98%",
                      borderColor:
                        jobInfoFromBackend?.siteName === "NOTENTERED"
                          ? "darkorange"
                          : jobCreationData?.sites?.find(
                              (site) => site.id === jobInfoFromBackend?.siteId
                            )
                          ? "#0C9D61"
                          : "red",
                    }}
                  />
                  {jobInfoFromBackend?.siteName !== "NOTENTERED" &&
                    !jobCreationData?.sites?.find(
                      (site) => site.id === jobInfoFromBackend?.siteId
                    ) && (
                      <Text color={"#EB5046"} fontSize={"sm"} mb={-4}>
                        We couldn’t define site name '
                        {jobInfoFromBackend?.siteName}'
                      </Text>
                    )}
                </VStack>
              </FormControl>
            </HStack>
            <HStack mt={12} spacing={12}>
              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  JobType <span style={{ color: "red" }}>*</span>
                </FormLabel>

                <Select
                  variant="unstyled"
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      jobTypeId: event.value,
                    })
                  }
                  defaultValue={
                    jobInfoFromBackend?.jobTypeId && {
                      label: jobInfoFromBackend?.jobTypeName,
                      value: jobInfoFromBackend?.jobTypeId,
                    }
                  }
                  useBasicStyles
                  placeholder="Select Jobtype"
                  selectedOptionColorScheme="Primary"
                  options={
                    jobCreationData?.jobTypes?.map((jobtype) => {
                      return {
                        label: jobtype.name,
                        value: jobtype.id,
                      };
                    }) || []
                  }
                />

                <VStack align={"start"} spacing={0}>
                  <Divider
                    style={{
                      marginLeft: "2px",
                      borderWidth: "1px",
                      width: "98%",
                      borderColor:
                        jobInfoFromBackend?.jobTypeName === "NOTENTERED"
                          ? "darkorange"
                          : jobCreationData?.jobTypes?.find(
                              (jobType) =>
                                jobType.id === jobInfoFromBackend?.jobTypeId
                            )
                          ? "#0C9D61"
                          : "red",
                    }}
                  />
                  {jobInfoFromBackend?.jobTypeName !== "NOTENTERED" &&
                    !jobCreationData?.jobTypes?.find(
                      (jobType) => jobType.id === jobInfoFromBackend?.jobTypeId
                    ) && (
                      <Text color={"#EB5046"} fontSize={"sm"} mb={-4}>
                        We couldn’t define jobtype name '
                        {jobInfoFromBackend?.jobTypeName}'
                      </Text>
                    )}
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  Job SubType
                </FormLabel>

                <Select
                  variant="unstyled"
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      jobSubTypeId: event.value,
                    })
                  }
                  defaultValue={
                    jobInfoFromBackend?.jobSubTypeId && {
                      label: jobInfoFromBackend?.jobSubTypeName,
                      value: jobInfoFromBackend?.jobSubTypeId,
                    }
                  }
                  useBasicStyles
                  placeholder="Select Job Subtype"
                  selectedOptionColorScheme="Primary"
                  options={
                    jobCreationData?.jobSubTypes?.map((subtype) => {
                      return {
                        label: subtype.name,
                        value: subtype.id,
                      };
                    }) || []
                  }
                />

                <VStack align={"start"} spacing={0}>
                  <Divider
                    style={{
                      marginLeft: "2px",
                      borderWidth: "1px",
                      width: "98%",
                      borderColor:
                        jobInfoFromBackend?.jobSubTypeName === "NOTENTERED"
                          ? "darkorange"
                          : jobCreationData?.jobSubTypes?.find(
                              (subtype) =>
                                subtype.id === jobInfoFromBackend?.jobSubTypeId
                            )
                          ? "#0C9D61"
                          : "red",
                    }}
                  />
                  {jobInfoFromBackend?.jobSubTypeName !== "NOTENTERED" &&
                    !jobCreationData?.jobSubTypes?.find(
                      (subtype) =>
                        subtype.id === jobInfoFromBackend?.jobSubTypeId
                    ) && (
                      <Text color={"#EB5046"} fontSize={"sm"} mb={-4}>
                        We couldn’t define subtype name '
                        {jobInfoFromBackend?.jobSubTypeName}'
                      </Text>
                    )}
                </VStack>
              </FormControl>
            </HStack>
            <HStack mt={12} spacing={12}>
              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  Assignee
                </FormLabel>

                <Select
                  variant="unstyled"
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      engineerId: event.value,
                    })
                  }
                  defaultValue={
                    jobInfoFromBackend?.engineerId && {
                      label: jobInfoFromBackend?.engineerName,
                      value: jobInfoFromBackend?.engineerId,
                    }
                  }
                  useBasicStyles
                  placeholder="Select Engineer"
                  selectedOptionColorScheme="Primary"
                  options={
                    jobCreationData?.engineers?.map((engineer) => {
                      return {
                        label: engineer?.firstName + " " + engineer?.lastName,
                        value: engineer.id,
                      };
                    }) || []
                  }
                />

                <VStack align={"start"} spacing={0}>
                  <Divider
                    style={{
                      marginLeft: "2px",
                      borderWidth: "1px",
                      width: "98%",
                      borderColor:
                        jobInfoFromBackend?.engineerName === "NOTENTERED"
                          ? "darkorange"
                          : jobCreationData?.engineers?.find(
                              (engineer) =>
                                engineer.id === jobInfoFromBackend?.engineerId
                            )
                          ? "#0C9D61"
                          : "red",
                    }}
                  />
                  {jobInfoFromBackend?.engineerName !== "NOTENTERED" &&
                    !jobCreationData?.engineers?.find(
                      (engineer) =>
                        engineer.id === jobInfoFromBackend?.engineerId
                    ) && (
                      <Text color={"#EB5046"} fontSize={"sm"} mb={-4}>
                        We couldn’t define engineer name '
                        {jobInfoFromBackend?.engineerName}'
                      </Text>
                    )}
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel color={"Neutral.500"} fontWeight={"normal"} mb={-1}>
                  Schedule Date
                </FormLabel>

                <Input
                  variant="flushed"
                  onChange={(event) =>
                    setJobToCreate({
                      ...jobToCreate,
                      scheduleDateEnd: event.target.value,
                    })
                  }
                  defaultValue={moment(jobInfoFromBackend?.jobDate).format(
                    "yyyy-MM-DDTHH:mm"
                  )}
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                />
              </FormControl>
            </HStack>
            <FormControl mt={12} mb={20}>
              <FormLabel color={"Neutral.500"} fontWeight={"normal"}>
                Description
              </FormLabel>
              <Textarea
                onChange={(event) =>
                  setJobToCreate({
                    ...jobToCreate,
                    description: event.target.value,
                  })
                }
                defaultValue={jobInfoFromBackend?.description}
                placeholder="Enter Description"
                size="md"
              />
            </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Flex w={"full"} justifyContent="space-between" alignItems="center">
              <Button
                flex="1"
                _hover={{ bg: "#049FA9" }}
                mr={3}
                isDisabled={isDisableSubmit}
                onClick={() => {
                  handleConfirmAndLog();
                  onClose();
                }}
              >
                Confirm & Log
              </Button>
              <Button
                border={"1px solid #E2E2E2"}
                bg={"white"}
                textColor={"#B0B0B0"}
                _hover={{ bg: "#E2E2E2" }}
                flex="1"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CheckJobInfoPopUp;
