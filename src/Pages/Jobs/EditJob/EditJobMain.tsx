import {
  HStack,
  Button,
  Flex,
  useDisclosure,
  VStack,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Card,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { EJobStatus } from "../../../models/Enums/EJobStatus";
import useJobCreationData from "../../../hooks/DataCreation/useJobCreationData";
import { JobCreationData } from "../../../models/Interfaces/IJobCreationData";
import EditPrioritySelect from "./EditPrioritySelect";
import EditEstimatedDuration from "./EditEstimatedDuration";
import EditScheduleDateSelect from "./EditScheduleDateSelect";
import EditClientSelect from "./EditClientSelect";
import EditSiteSelect from "./EditSiteSelect";
import EditEngineerSelect from "./EditEngineerSelect";
import useGetSubTypesByTypeId from "../../../hooks/Settings/JobSubType/useGetSubTypesByTypeId";
import EditJobTypeSelect from "./EditJobTypeSelect";
import EditJobSubTypeSelect from "./EditJobSubTypeSelect";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import IsLoading from "../../GeneralComponents/IsLoading";
import EditJobDescription from "./EditJobDescription";
import useGetSitesByClientId from "../../../hooks/Settings/Client/Site/useGetSitesByClientId";
import { Job } from "../../../models/Job";
import PartsMain from "../JobDetails/Details/Parts/PartsMain";
import IssuesMain from "../JobDetails/Details/Issues/IssuesMain";
import useGetAssetsByClientId from "../../../hooks/Settings/Assets/MainAsset/useGetAssetsByClientId";
import AttachmentsMain from "../JobDetails/Details/Attachments/AttachmentsMain";
import useGetJobById from "../../../hooks/Jobs/useGetJobById";
import useJobMutation from "../../../hooks/Jobs/useJobMutation";
import IsError from "../../GeneralComponents/IsError";

const schema = z.object({
  clientId: z.string().nonempty({ message: "Client is required" }),
  siteId: z.string().optional(),
  jobTypeId: z.string().nonempty({ message: "Job Type is required" }),
  jobSubTypeId: z.string().optional(),
  description: z.string().nonempty({ message: "Description is required" }),
  engineerId: z.string().optional(),
  jobPriorityId: z.number().optional(),
  scheduleDate: z.string().nonempty({ message: "Schedule Date is required" }),
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
  //fileToUpload: z.array(z.instanceof(File)).optional(),
  fileToUpload: z.instanceof(File).optional(),
});

export type EditJobValidation = z.infer<typeof schema>;
type EditJobFormProps = {
  onSubmit: (data: EditJobValidation) => void;
};
const EditJobMain = () => {
  const {
    handleSubmit: mainFormSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EditJobValidation>({
    resolver: zodResolver(schema),
  });
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle(`Edit Job N.${job?.id}`);
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isError, isLoading } = useGetJobById(parseInt(id));
  // const location = useLocation();
  // const job = location.state?.job as Job;
  console.log("job is::", job);

  useEffect(() => {
    setValue("clientId", job?.clientId?.toString());
    setValue("siteId", job?.siteId?.toString());
    setValue("jobTypeId", job?.jobTypeId?.toString());
    setValue("jobSubTypeId", job?.jobSubTypeId?.toString());
    setValue("description", job?.description);
    setValue("engineerId", job?.engineerId?.toString());
    setValue("jobPriorityId", job?.jobPriorityId);
    setValue("scheduleDate", job?.scheduleDateEnd);
    setValue("estimationDuration", job?.estimatedDuration?.toString());
  }, [job]);

  const [isSaveAndClose, setIsSaveAndClose] = useState(false);
  const { data: clientAssets } = useGetAssetsByClientId(job?.clientId);

  const selectedClientId = watch("clientId");
  // get sites according to selected client
  const { data: clientSites } = useGetSitesByClientId(
    parseInt(selectedClientId)
  );
  const selectedJobTypeId = watch("jobTypeId");
  // get subTypes according to selected jobType
  const { data: jobSubTypes } = useGetSubTypesByTypeId(
    parseInt(selectedJobTypeId)
  );
  //parts
  const createPartModal = useDisclosure();
  //sessions
  const createSessionModal = useDisclosure();

  // get job creation data
  const { data: jobCreationData } = useJobCreationData() as {
    data: JobCreationData;
  };
  const [activeTab, setActiveTab] = useState("Issues");

  //submitting the form
  // track whether the main form should be submitted(only when save is clicked)
  const [shouldSubmitMainForm, setShouldSubmitMainForm] = useState(false);
  const jobMutation = useJobMutation(() => {}, true);
  const handleMainFormSubmit: SubmitHandler<EditJobValidation> = async (
    data
  ) => {
    if (shouldSubmitMainForm) {
      const updatedJob: Job = {
        ...job,
        clientId: parseInt(data.clientId),
        siteId: parseInt(data.siteId),
        jobTypeId: parseInt(data.jobTypeId),
        jobSubTypeId: parseInt(data.jobSubTypeId),
        description: data.description,
        engineerId: parseInt(data.engineerId),
        jobStatusId: !data?.engineerId ? 1 : 2,
        jobPriorityId: data.jobPriorityId,
        scheduleDateEnd: data.scheduleDate,
        estimatedDuration: parseInt(data.estimationDuration),
      };
      jobMutation.mutateAsync(updatedJob);
      setTimeout(() => {
        navigate(`/jobs/${job?.id}`);
      }, 1000);
    }
  };
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError />;
  }
  return (
    <>
      <form onSubmit={mainFormSubmit(handleMainFormSubmit)}>
        <HStack spacing={10} w={"full"} align={"start"}>
          <VStack w={"100vw"} mb={0} spacing={8} pr={2}>
            <EditPrioritySelect
              priorities={jobCreationData?.priorities || []}
              defaultValue={job?.jobPriorityId || 0}
              onPrioritySelect={(priority) => {
                console.log("priorityId::", priority);
                setValue("jobPriorityId", priority?.id);
              }}
              register={register}
              errors={errors}
            />
            <HStack w={"full"} align={"start"} spacing={20}>
              <EditClientSelect
                register={register}
                errors={errors}
                defaultValue={job?.clientId || 0}
                clients={jobCreationData?.clients || []}
              />
              <EditSiteSelect
                register={register}
                errors={errors}
                selectedClientId={parseInt(selectedClientId)}
                sites={clientSites ?? []}
                defaultValue={job?.siteId || 0}
              />
            </HStack>

            <HStack w={"full"} align={"start"}>
              <Flex w="46%" gap={1}>
                <EditJobTypeSelect
                  jobTypes={jobCreationData?.jobTypes ?? []}
                  defaultValue={job?.jobTypeId || 0}
                  register={register}
                  errors={errors}
                />

                <EditJobSubTypeSelect
                  jobSubTypes={jobSubTypes}
                  defaultValue={job?.jobSubTypeId || 0}
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Spacer />
              <Flex w="46%">
                <EditEngineerSelect
                  engineers={jobCreationData?.engineers ?? []}
                  defaultValue={job?.engineerId || 0}
                  register={register}
                  errors={errors}
                />
              </Flex>
            </HStack>

            <HStack w={"full"} align={"start"} spacing={20}>
              <EditScheduleDateSelect
                defaultValue={job?.scheduleDateEnd || ""}
                register={register}
                errors={errors}
              />
              <EditEstimatedDuration
                defaultValue={job?.estimatedDuration || 0}
                register={register}
                errors={errors}
              />
            </HStack>

            <Tabs color={"Neutral.500"} w={"full"}>
              <TabList>
                <Tab
                  color={activeTab === "Issues" ? "Primary.700" : "gray.500"}
                  onClick={() => setActiveTab("Issues")}
                >
                  Issues
                </Tab>
                <Tab
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
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <IssuesMain
                    issues={job?.jobIssues?.filter((a) => a.isActive) ?? []}
                    clientAssets={clientAssets ?? []}
                    jobId={job?.id}
                  />
                </TabPanel>

                <TabPanel>
                  <PartsMain
                    parts={job?.jobParts?.filter((a) => a.isActive) ?? []}
                    jobId={job?.id}
                  />
                </TabPanel>
                <TabPanel>
                  <AttachmentsMain
                    attachments={
                      job?.jobAttachments?.filter((a) => a.isActive) ?? []
                    }
                    jobId={job?.id}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <HStack w={"full"} align={"start"} mt={2}>
              <EditJobDescription
                defaultValue={job?.description || ""}
                register={register}
                errors={errors}
              />
            </HStack>
            <HStack m={2} w={"full"} justify={"start"}>
              <Link to="/jobs">
                <Button
                  borderColor={"Neutral.500"}
                  color={"gray"}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                onClick={() => setShouldSubmitMainForm(true)}
              >
                Save
              </Button>
              {job?.jobStatus.id === EJobStatus.RESOLVED && (
                <Button type="submit" onClick={() => setIsSaveAndClose(true)}>
                  Save And Close
                </Button>
              )}
            </HStack>
          </VStack>

          <VStack />

          <VStack align={"start"} pr={3}>
            <FormControl w={"full"}>
              <FormLabel>
                Select the site from the map and then see the available
              </FormLabel>
            </FormControl>
          </VStack>
        </HStack>
      </form>
    </>
  );
};

export default EditJobMain;
