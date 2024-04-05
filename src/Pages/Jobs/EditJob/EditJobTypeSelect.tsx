import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import useJobType from "../../../hooks/Settings/JobType/useJobType";
import JobType from "../../../models/JobType";
interface Props extends FormValidation {
  jobTypes: JobType[];
  defaultValue: number;
}
const EditJobTypeSelect = ({
  jobTypes,
  register,
  errors,
  defaultValue,
}: Props) => {
  if (!jobTypes) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>Job Type</FormLabel>
        <Spinner
          size="md"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </FormControl>
    );
  }
  const selectedJobType = jobTypes?.find((c) => c.id === defaultValue);
  if (!selectedJobType) {
    return (
      <FormControl width={"full"}>
        <FormLabel>Job Type</FormLabel>
        <Spinner
          size="md"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </FormControl>
    );
  }
  return (
    <FormControl w={"full"} isInvalid={errors.jobTypeId !== undefined}>
      <FormLabel>Job Type</FormLabel>

      <Select
        defaultValue={selectedJobType?.id}
        {...register("jobTypeId")}
        placeholder="Select Jobtype"
      >
        {jobTypes?.map((option) => (
          <option key={option.id} value={option.id || ""}>
            {option.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.jobTypeId && errors.jobTypeId.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default EditJobTypeSelect;
