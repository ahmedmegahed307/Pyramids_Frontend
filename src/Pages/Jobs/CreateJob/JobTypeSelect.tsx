import {
  FormControl,
  FormLabel,
  Flex,
  //Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import { FormValidation } from "./FormValidation";
import useJobType from "../../../hooks/Settings/JobType/useJobType";
import JobType from "../../../models/JobType";
interface Props extends FormValidation {
  jobTypes: JobType[];
  setSelectedJobType: (jobType: string) => void;
}
const JobTypeSelect = ({
  jobTypes,
  setSelectedJobType,
  register,
  errors,
}: Props) => {
  const handleJobTypeChange = (selectedJobType) => {
    setSelectedJobType(selectedJobType.value);
  };
  return (
    <FormControl w={"full"} isInvalid={errors.jobTypeId !== undefined}>
      <FormLabel>Job Type</FormLabel>

      <Select
        placeholder="Select Jobtype"
        selectedOptionColorScheme="Primary"
        {...register("jobTypeId")}
        options={
          jobTypes?.map((jobtype) => {
            return {
              label: jobtype.name,
              value: jobtype.id,
            };
          }) || []
        }
        onChange={handleJobTypeChange}
      />
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.jobTypeId && errors.jobTypeId.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default JobTypeSelect;
