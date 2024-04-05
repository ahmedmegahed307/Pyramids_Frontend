import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Flex,
  Heading,
  Divider,
  Checkbox,
  VStack,
  FormErrorMessage,
  Spacer,
  Textarea,
  Grid,
  Card,
} from "@chakra-ui/react";
import Geocode from "react-geocode";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import moment from "moment";
import useClient from "../../../hooks/Settings/Client/useClient";
import useJobType from "../../../hooks/Settings/JobType/useJobType";
import JobType from "../../../models/JobType";
import useCreateContract from "../../../hooks/PPM/useCreateContract";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import { IContract } from "../../../models/Interfaces/IContract";
import Swal from "sweetalert2";
import useAuthStore from "../../../hooks/Authentication/store";
import IsLoading from "../../GeneralComponents/IsLoading";
const schema = z.object({
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
export type ContractFormValidation = z.infer<typeof schema>;

const AddContract = () => {
  const { data: clientsList } = useClient();
  const { data: jobTypeList } = useJobType();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContractFormValidation>({
    resolver: zodResolver(schema),
  });

  const contractQuery = useCreateContract();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: ContractFormValidation) => {
    setIsLoading(true);
    const contract: IContract = {
      companyId: user?.companyId!,
      clientId: parseInt(data.clientId),
      jobTypeId: parseInt(data.jobTypeId),
      jobSubTypeId: parseInt(data.jobSubTypeId),
      estimatedDurationMinutes: parseInt(data.estimatedDurationMinutes),
      contractCharge: parseInt(data.contractCharge),
      billingType: data.billingType,

      contractRef: data.contractRef,
      frequencyType: parseInt(data.frequencyType),
      isActive: data.isActive,
      startDate: moment(data.startDate).format("YYYY-MM-DD"),
      expiryDate: moment(data.expiryDate).format("YYYY-MM-DD"),
      description: data.description,
    };
    try {
      await contractQuery.mutateAsync(contract);

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding contract:", error);
      setIsLoading(false);
      Swal.fire(
        "Error",
        "An error occurred while adding the contract.",
        "error"
      );
    }
  };

  const selectedJobTypeId = watch("jobTypeId");
  const selectedJobTypeObject = jobTypeList?.find(
    (jobType) => jobType.id === parseInt(selectedJobTypeId)
  );

  const jobSubTypes = selectedJobTypeObject?.jobSubTypes || [];

  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Create Contract");
  }, []);

  if (isLoading) return <IsLoading />;
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
            <RequiredFormLabel label={"Client"} />

            <Select
              variant="outline"
              placeholder="Select Client"
              {...register("clientId")}
              //  onChange={handleClientSelect}
            >
              {clientsList &&
                clientsList!.map((item) => (
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
            <RequiredFormLabel label={"Job Type"} />
            <Select
              variant="outline"
              {...register("jobTypeId")}
              placeholder="Select JobType"
            >
              {jobTypeList &&
                jobTypeList!.map((item) => (
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
              placeholder="Select Subtype"
            >
              {jobSubTypes.map((subtype) => (
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
          <FormControl isInvalid={!!errors.billingType}>
            <RequiredFormLabel label={"Billing Type"} />
            <Select
              variant="outline"
              placeholder="Select Type"
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
          <FormControl isInvalid={!!errors.contractCharge}>
            <RequiredFormLabel label={"Contact Charge"} />
            <Input
              {...register("contractCharge")}
              type="number"
              className="FormControl"
              placeholder="Enter total or charger per visit depending on billing type"
            />
            {errors.contractCharge && (
              <FormErrorMessage>
                {errors.contractCharge.message}
              </FormErrorMessage>
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
            <RequiredFormLabel label={"PM Frequency"} />
            <Select
              {...register("frequencyType")}
              variant="outline"
              placeholder="Select PM Frequency"
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
              {...register("isActive")}
            />
            <FormLabel mb="0" ml="10px">
              PM Active
            </FormLabel>
          </FormControl>

          <FormControl isInvalid={!!errors.startDate}>
            <RequiredFormLabel label={"Start Date"} />

            <Input
              {...register("startDate")}
              type="date"
              className="FormControl"
              placeholder="Select Schedule Date"
            />
            {errors.startDate && (
              <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.expiryDate}>
            <FormLabel> Expiry Date</FormLabel>

            <Input
              {...register("expiryDate")}
              type="date"
              className="FormControl"
              placeholder="Select Schedule Date"
            />
            {errors.expiryDate && (
              <FormErrorMessage>{errors.expiryDate.message}</FormErrorMessage>
            )}
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
    </Card>
  );
};

export default AddContract;
