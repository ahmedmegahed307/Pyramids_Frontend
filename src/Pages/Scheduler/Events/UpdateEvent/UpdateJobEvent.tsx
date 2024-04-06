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
import useGetJobById from "../../../../hooks/Jobs/useGetJobById";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import useJobMutation from "../../../../hooks/Jobs/useJobMutation";

interface Props {
  jobToUpdate: any;
  updateEventModal: any;
}
const UpdateJobEvent = ({ jobToUpdate, updateEventModal }: Props) => {
  const [job, setJob] = useState<any>({
    clientId: jobToUpdate?.clientId,
    siteId: jobToUpdate?.siteId,
    jobTypeId: jobToUpdate?.jobTypeId,
    jobSubTypeId: jobToUpdate?.jobSubTypeId,
    engineerId: jobToUpdate?.engineerId,
    startDate: jobToUpdate?.scheduleDateEnd,
    description: jobToUpdate?.description,
  });
  const {
    data: currentJob,
    isLoading,
    isFetched,
    isError,
  } = useGetJobById(parseInt(jobToUpdate?.id));
  console.log("currentJob1", jobToUpdate);
  console.log("currentJob2", currentJob);

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
  const jobMutation = useJobMutation(() => {}, true);

  const handleJobSubmit = () => {
    const finalJobUpdate: Job = {
      ...currentJob,
      clientId: job?.clientId,
      siteId: job?.siteId,
      jobTypeId: job?.jobTypeId,
      jobSubTypeId: job?.jobSubTypeId,
      engineerId: job?.engineerId,
      scheduleDateEnd: job?.startDate,
      description: job?.description,
    };
    jobMutation.mutateAsync(finalJobUpdate);
    updateEventModal.onClose();
    console.log("finalJobUpdate::", finalJobUpdate);
  };

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;
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
          defaultValue={
            jobToUpdate?.clientId
              ? {
                  label: jobToUpdate?.clientName + "/" + jobToUpdate?.siteName,
                  value: jobToUpdate?.clientId,
                }
              : ""
          }
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
          defaultValue={
            jobToUpdate?.jobTypeId
              ? {
                  label:
                    jobToUpdate?.jobTypeName +
                    "/" +
                    jobToUpdate?.jobSubTypeName,
                  value: jobToUpdate?.jobTypeId,
                }
              : ""
          }
        />
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Engineer</FormLabel>

        <Select
          onChange={(event) =>
            setJob({
              ...job,
              engineerId: typeof event === "string" ? event : event?.value,
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
          defaultValue={
            jobToUpdate?.engineerId
              ? {
                  label:
                    jobCreationData?.engineers?.find(
                      (engineer) => engineer.id === jobToUpdate?.engineerId
                    )?.firstName +
                    " " +
                    jobCreationData?.engineers?.find(
                      (engineer) => engineer.id === jobToUpdate?.engineerId
                    )?.lastName,
                  value: jobToUpdate?.engineerId,
                }
              : ""
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Schedule Date"} />
        <Input
          defaultValue={jobToUpdate?.scheduleDateEnd ?? ""}
          type="datetime-local"
          className="FormControl"
          placeholder="Schedule Date"
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
          defaultValue={jobToUpdate?.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
      </FormControl>

      <Flex justifyContent="flex-end" mt={10}>
        <Button
          isDisabled={job?.clientId === "" || job?.jobTypeId === ""}
          colorScheme="Primary"
          mr={2}
          onClick={handleJobSubmit}
        >
          Log Job
        </Button>
        <Button onClick={updateEventModal.onClose}>Cancel</Button>
      </Flex>
    </>
  );
};

export default UpdateJobEvent;
