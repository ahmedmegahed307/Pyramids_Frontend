import "regenerator-runtime";
import {
  HStack,
  Button,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useDisclosure,
  Text,
  Flex,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Icon,
  Card,
  Heading,
  FormControl,
  FormLabel,
  Grid,
  Box,
  Spacer,
  Drawer,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import JobDescription from "./JobDescription";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import { useEffect, useRef, useState } from "react";
import JobPart from "../../../models/JobPart";
import useJobCreationData from "../../../hooks/DataCreation/useJobCreationData";
import { JobCreationData } from "../../../models/Interfaces/IJobCreationData";
import JobIssue from "../../../models/JobIssue";
import JobIssuesMain from "./Tabs/JobIssues/JobIssueMain";
import useGetAssetsByClientId from "../../../hooks/Settings/Assets/MainAsset/useGetAssetsByClientId";
import useCreateJob from "../../../hooks/Jobs/useCreateJob";
import { Job } from "../../../models/Job";
import useAuthStore from "../../../hooks/Authentication/store";
import moment from "moment";
import Swal from "sweetalert2";
import useCreateJobAttachment from "../../../hooks/Jobs/useCreateJobAttachment";
import AssignMain, { AssignTabModel } from "./Tabs/Assign/AssignMain";
import CombinedJobTypeSelect from "./CombinedJobTypeSelect";
import CombinedSiteSelect from "./CombinedSiteSelect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AITextProcessingRequest } from "../../../models/Interfaces/AITextProcessingRequest";
import useAITextProcessingRequest from "../../../hooks/AI/useAITextProcessingRequest";
import CombinedContactSelect from "./CombinedContactSelect";
import Address from "./Address";
import { FaExclamationCircle } from "react-icons/fa";
import { AddIcon } from "@chakra-ui/icons";
import CreateContact from "../../Settings/components/Clients/ClientInfo/ClientContacts/CreateContact";
import CreateClientContact from "./CreateClientContact";

const schema = z.object({
  clientId: z.string().nonempty({ message: "Client is required" }),
  siteId: z.string().optional(),
  contactId: z.string().optional(),
  jobTypeId: z.string().nonempty({ message: "Job Type is required" }),
  jobSubTypeId: z.string().optional(),
  description: z.string().nonempty({ message: "Required" }),
  engineerId: z.string().optional(),
  commentsToTech: z.string().optional(),
  jobPriorityId: z.number().optional(),
  scheduleDate: z.string().optional(),
  estimationDuration: z.string().optional(),
  jobParts: z
    .array(
      z.object({
        id: z.number().optional(),
        quantity: z.number().int().optional(),
        productId: z.number().optional(),
      })
    )
    .optional(),

  jobIssueCreateDto: z
    .array(
      z.object({
        id: z.number().optional(),
        assetId: z.number().int().optional(),
        description: z.string().optional(),
        jobIssuePriority: z.string().optional(),
      })
    )
    .optional(),
  filesToUpload: z.array(z.instanceof(File)).optional(),
});

export type JobValidation = z.infer<typeof schema>;
const CreateJobMain = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const pageTitleStore = usePageTitleStore();

  // get job creation data
  const { data: jobCreationData } = useJobCreationData() as {
    data: JobCreationData;
  };
  console.log("jobCreationData", jobCreationData);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<JobValidation>({
    resolver: zodResolver(schema),
  });

  const selectedClientId = watch("clientId");
  // get assets according to selected client
  const { data: clientAssets } = useGetAssetsByClientId(
    parseInt(selectedClientId)
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const leastDestructiveRef = useRef(null);

  const onSubmit: SubmitHandler<JobValidation> = async (data) => {
    console.log("data", data);
    if (
      data.jobIssueCreateDto === undefined ||
      data.jobIssueCreateDto.length === 0
    ) {
      setIsErrorModalOpen(true);
      return;
    }
    const newJob: Job = {
      id: 0,
      companyId: user?.companyId,
      clientId: parseInt(data.clientId),
      siteId: data?.siteId !== "0" ? parseInt(data.siteId) : null,
      contactId: data?.contactId !== "0" ? parseInt(data.contactId) : null,
      jobTypeId: parseInt(data.jobTypeId),
      jobSubTypeId:
        data?.jobSubTypeId !== "0" ? parseInt(data.jobSubTypeId) : null,
      description: data.description,
      engineerId: parseInt(data.engineerId),
      techComments: data.commentsToTech,
      jobStatusId: data.engineerId ? 2 : 1,
      scheduleDateEnd: data.scheduleDate,
      estimatedDuration: parseInt(data.estimationDuration),
      createdByUserId: user?.id,
      jobIssueCreateDto: data.jobIssueCreateDto,
      jobPriorityId: 1,
      // filesToUpload: attachments?.length > 0 ? attachments : null,
      // jobParts: data.jobParts,
      isActive: true,
    };

    console.log("newJob!!!!", newJob);
    const createdJob = createJobMutation.mutateAsync(newJob);
    // for (const attachment of attachments) {
    //   await createAttachmentQuery.mutateAsync({
    //     jobId: (await createdJob).data.id,
    //     fileName: attachment.name,
    //     fileType: attachment.type,
    //     fileURL: "",
    //     createdByUserId: user?.id,
    //     fileToUpload: attachment,
    //   });
    // }
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Job created successfully!",
      timer: 1000,
    });
    setTimeout(async () => {
      navigate(`/jobs/${(await createdJob).data?.id}`);
    }, 1000);
  };

  //assign tab
  const createAssignModal = useDisclosure();
  const [assignList, setAssignList] = useState<AssignTabModel[]>(); // Initialize with an empty array
  const updateAssign = (newAssign: any) => {
    console.log("newAssign::", newAssign);
    setAssignList(newAssign);
  };
  console.log("assignList!!!", assignList);

  useEffect(() => {
    console.log("assignList", assignList);
    const mappedAssign = assignList?.map((assign) => ({
      id: 0,
      engineerId: assign.engineerId,
      estimatedDuration: assign.estimatedDuration,
      scheduleDate: assign.scheduleDate,
      commentsToTech: assign.commentsToTech,
    }));
    console.log("mappedAssign", mappedAssign);
    if (mappedAssign && mappedAssign.length > 0) {
      // Assuming these fields are part of your form
      setValue("engineerId", mappedAssign[0].engineerId?.toString());
      setValue(
        "estimationDuration",
        mappedAssign[0].estimatedDuration?.toString()
      );
      setValue("scheduleDate", mappedAssign[0]?.scheduleDate);
      setValue("commentsToTech", mappedAssign[0]?.commentsToTech);
    }
  }, [assignList]);

  //active lists
  const [activeTab, setActiveTab] = useState("Issues");

  //searchable dropdown

  const [selectedSite, setSelectedSite] = useState(0);

  const [selectedEngineer, setSelectedEngineer] = useState(0);
  useEffect(() => {
    if (selectedEngineer !== 0)
      setValue("engineerId", selectedEngineer?.toString());
  }, [selectedEngineer]);

  //attachments
  const createAttachmentModal = useDisclosure();
  const [attachments, setAttachments] = useState<File[]>(); // Initialize with an empty array
  const updateAttachments = (newAttachments: any) => {
    console.log("newAttachments::", newAttachments);
    setAttachments(newAttachments);
  };

  //issues
  const createIssueModal = useDisclosure();
  const [issues, setIssues] = useState<JobIssue[]>(); // Initialize with an empty array
  const [hasIssues, setHasIssues] = useState(false);
  useEffect(() => {
    setHasIssues(issues && issues.length > 0);
  }, [issues]);

  const updateIssues = (newIssues: any) => {
    console.log("newIssues::", newIssues);
    setIssues(newIssues);
  };
  useEffect(() => {
    console.log("issues", issues);
    const mappedIssues = issues?.map((issue) => ({
      id: 0,
      description: issue.issue,
      assetId: issue.assetId,
      jobIssuePriority: issue.priority, // Convert the cost to a number
    }));

    console.log("mappedIssues", mappedIssues);
    setValue("jobIssueCreateDto", mappedIssues);
  }, [issues]);

  //parts
  const createPartModal = useDisclosure();
  const [parts, setParts] = useState<JobPart[]>(); // Initialize with an empty array
  // Callback function to update the parts state in the parent
  const updateParts = (newParts: any) => {
    setParts(newParts);
  };
  useEffect(() => {
    console.log("parts", parts);
    const mappedParts = parts?.map((part) => ({
      id: 0,
      productId: part.productId,
      quantity: part.quantity,
    }));

    console.log("mappedParts", mappedParts);
    setValue("jobParts", mappedParts);
  }, [parts]);
  const [isAttachmentAdded, setIsAttachmentAdded] = useState(false);

  const createJobMutation = useCreateJob(isAttachmentAdded);
  const createAttachmentQuery = useCreateJobAttachment();

  useEffect(() => {
    setIsAttachmentAdded(attachments?.length > 0 ? true : false);
  }, [attachments]);

  //contacts
  const [selectedContactId, setSelectedContactId] = useState(0);
  useEffect(() => {
    if (selectedContactId !== 0)
      setValue("contactId", selectedContactId?.toString());
  }, [selectedContactId]);

  const filteredContacts = jobCreationData?.contacts?.filter((contact) => {
    return (
      (contact.siteId && contact.siteId === selectedSite) ||
      (!contact.siteId && contact.clientId === parseInt(selectedClientId))
    );
  });
  const [siteAddress, setSiteAddress] = useState("");

  useEffect(() => {
    const selectedSiteData = jobCreationData?.sites?.find(
      (site) => site.id === selectedSite
    );
    const addressLine1 = selectedSiteData?.addressLine1 ?? "";
    const addressLine2 = selectedSiteData?.addressLine2 ?? "";

    // Combine address lines with a space in between
    const combinedAddress = `${addressLine1} ${addressLine2}`.trim();

    // Update the siteAddress state
    setSiteAddress(combinedAddress);
  }, [selectedSite]);
  console.log("siteAddress", siteAddress);

  console.log("filteredContacts", filteredContacts);

  //Log Job By AI
  const [userInput, setUserInput] = useState("");
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  const logJobByAI = useAITextProcessingRequest();
  const handleTextSubmit = async (userInput) => {
    if (!userInput) return;
    setIsAIProcessing(true);
    const logJobModel: AITextProcessingRequest = {
      companyId: user?.companyId,
      userId: user?.id,
      text: userInput,
    };
    try {
      await logJobByAI.mutateAsync(logJobModel);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAIProcessing(false);
    }
  };

  // speech recognition
  const {
    transcript,
    listening,

    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }
  const handleSpeechRecognition = () => {
    console.log("click microphone");
    console.log("listening", listening);

    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    if (transcript) {
      setUserInput(transcript);
    }
  }, [transcript]);

  const createClientContactModal = useDisclosure();

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size="lg" mb={5}>
        Log Job
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
          gridColumnGap={6}
          gridRowGap={6}
          position={"relative"}
          width={{
            base: "100%",
            md: "100%",
            lg: "80%",
          }}
        >
          <CombinedSiteSelect
            label="Client / Site"
            clients={jobCreationData?.clients ?? []}
            sites={jobCreationData?.sites ?? []}
            register={register}
            errors={errors}
            onSelect={(selectedValue) => {
              console.log("selectedValue::", selectedValue);
              // Extract clientId and siteId without the leading "0"
              const [clientId, siteId] = selectedValue.split("/").slice(1);
              setSelectedSite(parseInt(siteId));
              console.log("clientId/siteId::", clientId + "/" + siteId);
              // Use the values from the selected option
              setValue("clientId", clientId);
              setValue("siteId", siteId);
            }}
          />

          <CombinedJobTypeSelect
            label="JobType / SubType"
            jobTypes={jobCreationData?.jobTypes ?? []}
            jobSubTypes={jobCreationData?.jobSubTypes ?? []}
            onSelect={(selectedValue) => {
              console.log("selectedValue::", selectedValue);

              // Extract jobTypeId and jobSubTypeId without the leading "0"
              const [jobTypeId, jobSubTypeId] = selectedValue
                .split("/")
                .slice(1);

              console.log("jobtype/subtype::", jobTypeId + "/" + jobSubTypeId);

              // Use the values from the selected option
              setValue("jobTypeId", jobTypeId);
              setValue("jobSubTypeId", jobSubTypeId);
            }}
            register={register}
            errors={errors}
          />

          <FormControl>
            <HStack>
              <FormLabel>Contact</FormLabel>
              <Spacer />
              {selectedClientId !== undefined && (
                <Button
                  onClick={createClientContactModal.onOpen}
                  variant="link"
                  colorScheme="primary"
                  leftIcon={<AddIcon />}
                >
                  Add
                </Button>
              )}
            </HStack>
            <CombinedContactSelect
              setSelectedContactId={setSelectedContactId}
              selectedClientId={selectedClientId}
              selectedSiteId={selectedSite?.toString()}
              errors={errors}
              register={register}
              contacts={filteredContacts}
            />
          </FormControl>

          <Address siteAddress={siteAddress} />
        </Grid>
        <Tabs
          mb={5}
          color={"Neutral.500"}
          width={{
            base: "100%",
            md: "100%",
            lg: "80%",
          }}
        >
          <TabList>
            <Tab
              color={activeTab === "Issues" ? "Primary.700" : "gray.500"}
              onClick={() => setActiveTab("Issues")}
            >
              Issues <span style={{ color: "red" }}> *</span>
            </Tab>
            {/* <Tab
                  color={activeTab === "Parts" ? "Primary.700" : "gray.500"}
                  onClick={() => setActiveTab("Parts")}
                >
                  Parts
                </Tab>
                <Tab
                  color={
                    activeTab === "Attachments" ? "Primary.700" : "gray.500"
                  }
                  onClick={() => setActiveTab("Attachments")}
                >
                  Attachments
                </Tab> */}

            <Tab
              color={activeTab === "Assign" ? "Primary.700" : "gray.500"}
              onClick={() => setActiveTab("Assign")}
            >
              Assign
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <JobIssuesMain
                createIssueModal={createIssueModal}
                clientAssets={clientAssets ?? []}
                issues={issues ?? []}
                updateIssues={updateIssues}
              />
            </TabPanel>

            {/* <TabPanel>
                  <JobPartsMain
                    createPartModal={createPartModal}
                    parts={parts ?? []}
                    updateParts={updateParts}
                  />
                </TabPanel>
                <TabPanel>
                  <JobAttachmentsMain
                    createAttachmentModal={createAttachmentModal}
                    attachments={attachments}
                    updateAttachments={updateAttachments}
                  />
                </TabPanel> */}
            <TabPanel>
              <AssignMain
                assignlist={assignList ?? []}
                createAssignModal={createAssignModal}
                engineers={jobCreationData?.engineers ?? []}
                updateAssign={updateAssign}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <JobDescription register={register} errors={errors} />
        <Box position={"absolute"} bottom={4}>
          <Link to="/jobs">
            <Button
              borderColor={"Neutral.500"}
              color={"gray"}
              variant={"outline"}
              mr={4}
            >
              Cancel
            </Button>
          </Link>
          {assignList?.[0]?.engineerId === undefined ||
          assignList?.[0]?.engineerId === null ||
          assignList?.[0]?.engineerId === 0 ? (
            <Button
              type="submit"
              colorScheme="Primary"
              borderRadius={6}
              bg={"Neutral.400"}
            >
              Log
            </Button>
          ) : (
            <Button type="submit" colorScheme="Primary" bg={"Neutral.400"}>
              Log & Assign
            </Button>
          )}
        </Box>
        <br />
        <br />
      </form>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        isCentered
        leastDestructiveRef={leastDestructiveRef}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          p={2}
          borderRadius="md"
          borderWidth={1}
          boxShadow="lg"
          bgColor="white"
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={"red"}>
            <Icon as={FaExclamationCircle} mr={2} /> Validation Error
          </AlertDialogHeader>
          <AlertDialogBody fontSize={"lg"}>
            Please enter at least 1 issue!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="primary"
              onClick={() => setIsErrorModalOpen(false)}
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CreateClientContact
        createClientContactModal={createClientContactModal}
        selectedClientId={
          selectedClientId !== undefined ? parseInt(selectedClientId) : 0
        }
      />
    </Card>
  );
};

export default CreateJobMain;
