import { Alert } from "@chakra-ui/alert";
import { FormControl } from "@chakra-ui/form-control";
import React, { useState } from "react";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Flex, HStack, Spacer } from "@chakra-ui/layout";
import { format } from "date-fns";

import CombinedSiteSelect from "../../../Jobs/CreateJob/CombinedSiteSelect";
import CombinedJobTypeSelect from "../../../Jobs/CreateJob/CombinedJobTypeSelect";
import useJobCreationData from "../../../../hooks/DataCreation/useJobCreationData";
import { JobCreationData } from "../../../../models/Interfaces/IJobCreationData";
import { Select } from "chakra-react-select";
import { FormLabel, Textarea } from "@chakra-ui/react";
import useCreateJob from "../../../../hooks/Jobs/useCreateJob";
import { Job } from "../../../../models/Job";
import useAuthStore from "../../../../hooks/Authentication/store";
import Swal from "sweetalert2";
import moment from "moment";
interface Props {
  startDateDefault: any;
  createEventModal: any;
}
const CreateJobEvent = ({ createEventModal, startDateDefault }: Props) => {
  const { user } = useAuthStore();
  const [job, setJob] = useState({
    clientId: "",
    siteId: "",
    jobTypeId: "",
    jobSubTypeId: "",
    engineerId: "",
    startDate: startDateDefault,
    description: "Job Logged from Scheduler",
  });
  console.log("job::", job);

  // get job creation data
  const { data: jobCreationData } = useJobCreationData() as {
    data: JobCreationData;
  };

  // start client+site selection
  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedClient, setSelectedClient] = useState(0);

  const handleClientChange = (selectedClient) => {
    setSelectedClient(selectedClient.value);
    setSelectedSite(0);
    onSelect(`${selectedClient.value}/${0}`);
  };

  const handleSiteChange = (selectedSite) => {
    setSelectedSite(selectedSite.value);
    onSelect(`${selectedClient}/${selectedSite.value}`);
  };
  const onSelect = (selectedValue) => {
    const [clientId, siteId] = selectedValue.split("/").slice(1);
    setSelectedSite(parseInt(siteId));
    setJob({ ...job, clientId, siteId });
  };
  const siteOptions = jobCreationData?.clients?.flatMap((client) => {
    const clientSites = jobCreationData?.sites.filter(
      (site) => site.clientId === client.id
    );

    if (clientSites.length > 0) {
      return clientSites.map((site) => ({
        label: `${client.name}/${site.name}`,
        value: `${client.id}/${site.id}`,
      }));
    }

    // Include the client even if there are no sites
    return [{ label: client.name, value: `${client.id}/0` }];
  });

  // end client+site selection

  // start job type selection
  const [selectedJobType, setSelectedJobType] = useState(0);
  const [selectedJobSubType, setSelectedJobSubType] = useState(0);

  const handleJobTypeChange = (selectedJobType) => {
    setSelectedJobType(selectedJobType.value);
    setSelectedJobSubType(0);
    onSelectJobType(`${selectedJobType.value}/${0}`);
  };

  const handleJobSubTypeChange = (selectedJobSubType) => {
    setSelectedJobSubType(selectedJobSubType.value);
    onSelectJobType(`${selectedJobType}/${selectedJobSubType.value}`);
  };
  const onSelectJobType = (selectedValue) => {
    const [jobTypeId, jobSubTypeId] = selectedValue.split("/").slice(1);
    setSelectedJobSubType(parseInt(jobSubTypeId));
    setJob({ ...job, jobTypeId, jobSubTypeId });
  };

  const typeOptions = jobCreationData?.jobTypes?.flatMap((type) => {
    const subtypes = jobCreationData?.jobSubTypes.filter(
      (subtype) => subtype.jobTypeId === type.id
    );

    if (subtypes.length > 0) {
      return subtypes.map((subtype) => ({
        label: `${type.name}/${subtype.name}`,
        value: `${type.id}/${subtype.id}`,
      }));
    }

    // Include the client even if there are no sites
    return [{ label: type.name, value: `${type.id}/0` }];
  });

  // end job type selection

  const createJobMutation = useCreateJob(true);

  const handleJobSubmit = () => {
    const newJob: Job = {
      id: 0,
      companyId: user?.companyId,
      clientId: parseInt(job.clientId),
      siteId: job?.siteId !== "0" ? parseInt(job.siteId) : null,
      contactId: null,
      jobTypeId: parseInt(job.jobTypeId),
      jobSubTypeId:
        job?.jobSubTypeId !== "0" ? parseInt(job.jobSubTypeId) : null,
      description: job.description,
      engineerId: parseInt(job.engineerId),
      jobStatusId: job.engineerId ? 1 : 3,
      scheduleDateEnd: moment(job.startDate).format("YYYY-MM-DDTHH:mm"),
      estimatedDuration: 120,
      createdByUserId: user?.id,
      jobIssueCreateDto: [],
      jobPriorityId: 1,
      isActive: true,
    };

    console.log("newJob::", newJob);
    const createdJob = createJobMutation.mutateAsync(newJob);
    if (createdJob) {
      Swal.fire({
        title: "Success!",
        text: "Job Logged Successfully",
        icon: "success",
        timer: 1000,
      });
    }
    createEventModal.onClose();
  };
  return (
    <>
      <FormControl mt={5}>
        <RequiredFormLabel label={"Client/Site"} />

        <Select
          useBasicStyles
          placeholder="Select Client/Site"
          selectedOptionColorScheme="Primary"
          options={siteOptions}
          onChange={(selectedOption) => {
            if (selectedOption && (selectedOption as any).value !== undefined) {
              if ((selectedOption as any).value > 0) {
                handleClientChange(selectedOption);
              } else {
                handleSiteChange(selectedOption);
              }
            }
          }}
        />
      </FormControl>

      <FormControl mt={5}>
        <RequiredFormLabel label={"Type/Subtype"} />

        <Select
          useBasicStyles
          placeholder="Select Type/Subtype"
          selectedOptionColorScheme="Primary"
          options={typeOptions}
          onChange={(selectedOption) => {
            if (selectedOption && (selectedOption as any).value !== undefined) {
              if ((selectedOption as any).value > 0) {
                handleJobTypeChange(selectedOption);
              } else {
                handleJobSubTypeChange(selectedOption);
              }
            }
          }}
        />
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Engineer</FormLabel>

        <Select
          onChange={(event) =>
            setJob({
              ...job,
              engineerId: event.value.toString(),
            })
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
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Schedule Date"} />
        <Input
          defaultValue={format(startDateDefault, "yyyy-MM-dd'T'HH:mm") ?? ""}
          type="datetime-local"
          className="FormControl"
          placeholder="Start Date"
          onChange={(e) =>
            setJob({ ...job, startDate: new Date(e.target.value) })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Description"} />
        <Textarea
          placeholder="Enter Description"
          size="md"
          defaultValue={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
      </FormControl>

      <Flex justifyContent="flex-end" mt={10}>
        <Button
          isDisabled={job.clientId === "" || job.jobTypeId === ""}
          colorScheme="Primary"
          mr={2}
          onClick={handleJobSubmit}
        >
          Log Job
        </Button>
        <Button onClick={createEventModal.onClose}>Cancel</Button>
      </Flex>
    </>
  );
};

export default CreateJobEvent;
