import {
  FormControl,
  FormLabel,
  Flex,
  //Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import useJobType from "../../../hooks/Settings/JobType/useJobType";
import JobSubType from "../../../models/JobSubType";
import { Select } from "chakra-react-select";
type JobSubTypeSelectProps = FormValidation & {
  jobSubTypes: JobSubType[];
  setSelectedJobSubType: (jobSubType: number) => void;
};
const JobSubTypeSelect = ({
  register,
  errors,
  setSelectedJobSubType,
  jobSubTypes,
}: JobSubTypeSelectProps) => {
  const handleJobSubTypeChange = (selectedJobSubType) => {
    setSelectedJobSubType(selectedJobSubType.value);
  };

  const options = [
    { label: "Select JobType", value: 0 }, // Empty option
    ...(jobSubTypes?.map((subtype) => ({
      label: subtype.name,
      value: subtype.id,
    })) || []),
  ];
  return (
    <FormControl w={"full"}>
      <FormLabel>Job SubType</FormLabel>

      <Select
        placeholder="Select subtype"
        selectedOptionColorScheme="Primary"
        {...register("jobSubTypeId")}
        options={options}
        onChange={handleJobSubTypeChange}
      />
    </FormControl>
  );
};

export default JobSubTypeSelect;
