import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Select,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Geocode from "react-geocode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import TablesMain from "./TablesTabs/TablesMain";
import useClient from "../../../../hooks/Settings/Client/useClient";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";
import useContractMutation from "../../../../hooks/PPM/useContractMutation";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import { IContract } from "../../../../models/Interfaces/IContract";
import useGetContractById from "../../../../hooks/PPM/useGetContractById";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import useAuthStore from "../../../../hooks/Authentication/store";
const schema = z.object({
  id: z.number().optional(),
  clientId: z.string().nonempty({ message: "Client is required" }),
  // siteId: z.string().optional(),
  contractRef: z.string().optional(),
  description: z.string().optional(),
  jobTypeId: z.string().nonempty({ message: "Job Type is required" }),
  jobSubTypeId: z.string().optional(),
  estimatedDurationMinutes: z.string().optional(),
  frequencyType: z.string().nonempty({ message: "PM Frequency is required" }),
  contractCharge: z
    .string()
    .nonempty({ message: "Contact Charge is required" }),
  billingType: z.string().nonempty({ message: "Billing Type is required" }),
  startDate: z.string().nonempty({ message: "Start Date is required" }),
  expiryDate: z.string().nonempty({ message: "Expiry Date is required" }),
  isActive: z.boolean().optional(),
});

export type ContractEditFormValidation = z.infer<typeof schema>;
const EditContract = () => {
  const { id } = useParams();
  const {
    data: editContract,
    isError,
    isLoading,
  } = useGetContractById(parseInt(id));

  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle(
      `Edit Contract- ${editContract?.contractRef ?? "loading.."} `
    );
  }, [editContract]);
  const { data: clientsList } = useClient();
  const { data: jobTypeList } = useJobType();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,

    formState: { errors, isValid },
  } = useForm<ContractEditFormValidation>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   // jobSubTypeId: editContract?.jobSubTypeId?.toString(),
    //   isActive: editContract?.isActive,

    // },
  });
  console.log("editContract:::", editContract);
  useEffect(() => {
    setValue("clientId", editContract?.clientId?.toString());
    setValue("jobTypeId", editContract?.jobTypeId?.toString());
    setValue("jobSubTypeId", editContract?.jobSubTypeId?.toString());
    setValue("frequencyType", editContract?.frequencyType?.toString());
    setValue("contractCharge", editContract?.contractCharge?.toString());
    setValue("billingType", editContract?.billingType?.toString());
    setValue("startDate", editContract?.startDate?.toString());
    setValue("expiryDate", editContract?.expiryDate?.toString());
    setValue("isActive", editContract?.isActive);

    setValue("contractRef", editContract?.contractRef || "");
    setValue("description", editContract?.description?.toString());
    setValue(
      "estimatedDurationMinutes",
      editContract?.estimatedDurationMinutes?.toString()
    );
  }, [editContract, setValue]);

  const updateContract = useContractMutation(() => {}, true);
  const { user } = useAuthStore();
  const handleFormSubmit = (data: ContractEditFormValidation) => {
    data.id = editContract.id;
    const updatedContract: IContract = {
      ...data,
      id: data.id,
      companyId: user?.companyId,
      clientId: parseInt(data.clientId),
      jobTypeId: parseInt(data.jobTypeId),
      jobSubTypeId: parseInt(data.jobSubTypeId),
      estimatedDurationMinutes: parseInt(data.estimatedDurationMinutes),
      contractCharge: parseInt(data.contractCharge),
      billingType: data.billingType,
      contractRef: data.contractRef,
      frequencyType: parseInt(data.frequencyType),
      isActive: data.isActive || false,
      expiryDate: data.expiryDate,
      startDate: data.startDate,
      description: data.description,
    };
    console.log("update!!", updatedContract);
    updateContract.mutate(updatedContract);
  };

  //SUBTYPE
  const selectedJobType = watch("jobTypeId");

  const selectedJobTypeObject = jobTypeList?.find(
    (jobType) => jobType.id === parseInt(selectedJobType)
  );

  const jobSubTypes = selectedJobTypeObject?.jobSubTypes || [];

  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError />;
  }

  return (
    <Card mr={12} mb={5} p={10} pb={20} borderRadius={8} boxShadow={"none"}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gridColumnGap={6}
          gridRowGap={6}
          px={5}
          position={"relative"}
        >
          <FormControl isInvalid={!!errors.clientId}>
            <FormLabel>Client</FormLabel>

            <Select variant="outline" {...register("clientId")}>
              <option></option>
              {clientsList &&
                clientsList!.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {errors.clientId && (
              <FormErrorMessage>{errors.clientId.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.jobTypeId}>
            <FormLabel>Job Type</FormLabel>
            <Select
              placeholder="select jobtype"
              variant="outline"
              {...register("jobTypeId")}
            >
              {jobTypeList &&
                jobTypeList!.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {errors.jobTypeId && (
              <FormErrorMessage>{errors.jobTypeId.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Sub Type</FormLabel>
            <Select
              {...register("jobSubTypeId")}
              variant="outline"
              placeholder="Select job subtype"
            >
              {jobSubTypes.map((subtype, index) => (
                <option key={subtype.id} value={subtype.id || ""}>
                  {subtype.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Estimated Duration</FormLabel>
            <Input
              {...register("estimatedDurationMinutes")}
              className="FormControl"
              placeholder="0"
            />
          </FormControl>
          <FormControl isInvalid={!!errors.contractCharge}>
            <FormLabel>Contract Charge</FormLabel>
            <Input
              {...register("contractCharge")}
              type="number"
              className="FormControl"
              placeholder="Enter total or per visit charge depending on billing type"
            />
            {errors.contractCharge && (
              <FormErrorMessage>
                {errors.contractCharge.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.billingType}>
            <FormLabel>Billing Type</FormLabel>
            <Select
              variant="outline"
              placeholder="Select type"
              {...register("billingType")}
            >
              <option value={"INVOICE_PER_CONTRACT"}>
                Invoice per contract
              </option>
              <option value={"INVOICE_PER_VISIT"}>Invoice per visit</option>
            </Select>
            {errors.billingType && (
              <FormErrorMessage>{errors.billingType.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Contract Reference (optional)</FormLabel>
            <Input
              {...register("contractRef")}
              className="FormControl"
              placeholder=""
            />
          </FormControl>

          <FormControl isInvalid={!!errors.frequencyType}>
            <FormLabel>PM Frequency</FormLabel>
            <Select
              {...register("frequencyType")}
              variant="outline"
              placeholder="Select the job priority"
            >
              <option value={1}>Daily</option>
              <option value={7}>Weekly</option>
              <option value={30}>Monthly</option>

              <option value={120}>Quarterly</option>
              <option value={180}>Semi-annual</option>
              <option value={360}>Annually</option>
            </Select>
            {errors.frequencyType && (
              <FormErrorMessage>
                {errors.frequencyType.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl display="flex" alignItems="center" pt={10}>
            <Checkbox
              size="lg"
              colorScheme="Primary"
              defaultChecked={editContract?.isActive}
              {...register("isActive")}
            />
            <FormLabel mb="0" ml="10px">
              PM Active
            </FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel> Start Date</FormLabel>

            <Input
              {...register("startDate")}
              type="datetime-local"
              className="FormControl"
            />
          </FormControl>
          <FormControl>
            <FormLabel> Expiry Date</FormLabel>

            <Input
              {...register("expiryDate")}
              type="datetime-local"
              className="FormControl"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              {...register("description")}
              className="FormControl"
              placeholder=""
            />
          </FormControl>

          <Box position={"absolute"} bottom={-16} right={5}>
            <Link to="/ppm">
              <Button float={"right"} size={"md"}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" mr={2} float={"right"} size={"md"}>
              Save
            </Button>
          </Box>
        </Grid>
      </form>
      <br />
      <br />

      <TablesMain contract={editContract} />
    </Card>
  );
};

export default EditContract;
