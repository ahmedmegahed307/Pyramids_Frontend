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
import JobSubType from "../../../models/JobSubType";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
type JobSubTypeSelectProps = FormValidation & {
  jobSubTypes: JobSubType[];
  defaultValue: number;
};
const EditJobSubTypeSelect = ({
  register,
  errors,
  defaultValue,
  jobSubTypes,
}: JobSubTypeSelectProps) => {
  const [selectedSubTypeId, setSelectedSubTypeId] =
    useState<number>(defaultValue);
  useEffect(() => {
    setSelectedSubTypeId(defaultValue);
  }, [defaultValue]);

  if (!jobSubTypes) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>SubTypes</FormLabel>
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
    <FormControl w={"full"}>
      <FormLabel>Job SubType</FormLabel>

      <Select
        value={selectedSubTypeId}
        placeholder="Select Subtype"
        {...register("jobSubTypeId")}
        variant="outline"
        size={"md"}
        onChange={(e) => setSelectedSubTypeId(parseInt(e.target.value))}
      >
        {jobSubTypes?.map((jobSubType) => (
          <option key={jobSubType.id} value={jobSubType.id}>
            {jobSubType.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditJobSubTypeSelect;
