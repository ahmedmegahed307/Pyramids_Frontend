import {
  Card,
  FormControl,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  FormErrorMessage,
  VStack,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import useGetClientById from "../../../hooks/Settings/Client/useGetClientById";
import { Select } from "chakra-react-select";
import useGetSitesByClientId from "../../../hooks/Settings/Client/Site/useGetSitesByClientId";
import CombinedContactSelect from "../../Jobs/CreateJob/CombinedContactSelect";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useJobCreationData from "../../../hooks/DataCreation/useJobCreationData";
import { JobCreationData } from "../../../models/Interfaces/IJobCreationData";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import { Job } from "../../../models/Job";
import useCreatePendingJob from "../../../hooks/ClientPortal/useCreatePendingJob";
import { EJobStatus } from "../../../models/Enums/EJobStatus";
import useGetCompanyById from "../../../hooks/Settings/Company/useGetCompanyById";
import LocationIcon from "../../../assets/icons/LocationIcon";

const schema = z.object({
  siteId: z.string().nonempty({ message: "Required" }),
  contactId: z.string().optional(),
  description: z.string().nonempty({ message: "Required" }),
  priorityId: z.string().optional(),
});

export type CreateRequestValidation = z.infer<typeof schema>;

const ClientPortalNewRequest = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateRequestValidation>({
    resolver: zodResolver(schema),
  });

  const { data: jobCreationData } = useJobCreationData() as {
    data: JobCreationData;
  };
  const { data: client } = useGetClientById(12);
  const { data: company } = useGetCompanyById(client?.companyId);
  const { data: sites, isLoading, isError } = useGetSitesByClientId(client?.id);
  console.log("sites::", sites);
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);
  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(
    1
  );

  //contacts
  const [selectedContactId, setSelectedContactId] = useState(0);
  useEffect(() => {
    if (selectedContactId !== 0)
      setValue("contactId", selectedContactId?.toString());
  }, [selectedContactId]);

  const filteredContacts = jobCreationData?.contacts?.filter((contact) => {
    return (
      (contact.siteId && contact.siteId === selectedSiteId) ||
      (!contact.siteId && contact.clientId === client?.id)
    );
  });
  const [siteAddress, setSiteAddress] = useState("");

  useEffect(() => {
    const selectedSiteData = sites?.find((site) => site.id === selectedSiteId);
    console.log("selectedSiteData", selectedSiteData);
    const addressLine1 = selectedSiteData?.addressLine1 ?? "";
    const addressLine2 = selectedSiteData?.addressLine2 ?? "";

    // Combine address lines with a space in between
    const combinedAddress = `${addressLine1} ${addressLine2}`.trim();
    setSiteAddress(combinedAddress);
  }, [selectedSiteId]);

  useEffect(() => {
    if (selectedSiteId) setValue("siteId", selectedSiteId?.toString());
  }, [selectedSiteId]);
  const createPendingJobMutation = useCreatePendingJob();

  const handleFormSubmit = async (data: CreateRequestValidation) => {
    console.log("data", data);
    const newJob: Job = {
      companyId: client?.companyId,
      clientId: client?.id,
      siteId: selectedSiteId,
      contactId: selectedContactId != 0 ? selectedContactId : null,
      description: data?.description,
      jobStatusId: EJobStatus.PENDING,
      jobPriorityId: selectedPriorityId ?? 1,
      createdByUserId: 2,
    };
    console.log("newJob::", newJob);
    await createPendingJobMutation.mutateAsync(newJob);
  };

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <VStack align={"start"} mb={4}>
        <Heading size={"md"}>
          Request Information for {company?.name ?? "-"}
        </Heading>
        <Text color={"Neutral.500"}>
          Please contact the service company if you want to add a new site{" "}
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <HStack spacing={10} mb={8}>
          <FormControl w={"lg"}>
            <RequiredFormLabel label={"Client"} />
            <InputGroup
              border={"1px solid var(--Neutral-300, #E2E2E2)"}
              borderRadius={8}
            >
              <Input
                bg={"#F8F9FA"}
                h={12}
                value={client?.name ?? ""}
                readOnly
                // disabled
              />
            </InputGroup>
          </FormControl>
          <FormControl w={"lg"} isInvalid={errors.siteId !== undefined}>
            <RequiredFormLabel label={"Site"} />

            <Select
              size={"lg"}
              // border={"1px solid var(--Neutral-300, #E2E2E2)"}
              // h={12}
              useBasicStyles
              placeholder="Select Site"
              selectedOptionColorScheme="Primary"
              options={
                sites?.map((site) => {
                  return {
                    label: site.name,
                    value: site.id,
                  };
                }) || []
              }
              onChange={(selectedSite: any) =>
                setSelectedSiteId(selectedSite.value as number)
              }
            />
            {errors.siteId && (
              <FormErrorMessage color="red">
                {errors.siteId.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <HStack w={"full"} spacing={10}>
          <FormControl pb={7} w={"lg"}>
            <RequiredFormLabel label={"Priority"} />

            <Select
              useBasicStyles
              defaultValue={{
                label: "Low",
                value: "1",
              }}
              size={"lg"}
              selectedOptionColorScheme="Primary"
              options={[
                {
                  label: "Low",
                  value: "1",
                },
                {
                  label: "Medium",
                  value: "2",
                },
                {
                  label: "High",
                  value: "3",
                },
              ]}
              onChange={(selectedPriority) =>
                setSelectedPriorityId(
                  selectedPriority.value as unknown as number
                )
              }
            />
          </FormControl>
          <FormControl pb={7} w={"lg"}>
            <FormLabel>Contact</FormLabel>
            <CombinedContactSelect
              setSelectedContactId={setSelectedContactId}
              selectedClientId={client?.id.toString()}
              selectedSiteId={selectedSiteId?.toString()}
              errors={errors}
              register={register}
              contacts={filteredContacts}
            />
          </FormControl>
        </HStack>
        <HStack w={"full"} spacing={10}>
          <FormControl w={"lg"} mb={14}>
            <FormLabel>Address </FormLabel>

            <InputGroup
              border={"1px solid var(--Neutral-300, #E2E2E2)"}
              borderRadius={8}
            >
              <Input
                h={12}
                p={5}
                pl={9}
                bg={"#F8F9FA"}
                placeholder="site address"
                value={siteAddress}
                readOnly
              />
              <InputLeftElement
                mt={0.5}
                pl={2}
                alignItems={"center"}
                _hover={{ color: "Primary.700" }}
              >
                <LocationIcon />
              </InputLeftElement>
              )
            </InputGroup>
          </FormControl>
          <FormControl w={"lg"} isInvalid={errors.description !== undefined}>
            <RequiredFormLabel label={"Description"} />

            <InputGroup
              border={"1px solid var(--Neutral-300, #E2E2E2)"}
              borderRadius={8}
            >
              <Textarea
                resize={"none"}
                h={"94px"}
                p={5}
                pl={8}
                // bg={"#F8F9FA"}
                placeholder="Enter Job Description"
                {...register("description")}
              ></Textarea>
            </InputGroup>
            {errors.description && (
              <FormErrorMessage color="red">
                {errors.description.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <Button
          borderRadius={"8px"}
          type="submit"
          mt={8}
          h={"12"}
          size={"md"}
          mr={3}
        >
          Send Request
        </Button>
        <Button
          borderRadius={"8px"}
          color={"#999"}
          mt={8}
          h={"12"}
          size={"md"}
          bg={"white"}
          border={"1px solid var(--Neutral-300, #E2E2E2)"}
        >
          Cancel
        </Button>
      </form>
    </Card>
  );
};

export default ClientPortalNewRequest;
