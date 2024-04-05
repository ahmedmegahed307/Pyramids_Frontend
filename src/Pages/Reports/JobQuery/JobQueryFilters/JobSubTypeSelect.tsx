import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import useJobSubType from "../../../../hooks/Settings/JobSubType/useJobSubType";
import { FormInterface } from "../../GeneralFilters/FormInterface";
import JobSubType from "../../../../models/JobSubType";
import { FormValidation } from "../../../Jobs/CreateJob/FormValidation";
type JobSubTypeSelectProps = FormValidation & {
  jobSubTypes: JobSubType[];
};

const JobSubTypeSelect = ({
  register,
  errors,
  jobSubTypes,
}: JobSubTypeSelectProps) => {
  return (
    <FormControl w={"full"}>
      <FormLabel color={"grey"}>Job SubType</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Select {...register("jobSubTypeId")} placeholder="Select Subtype">
          {jobSubTypes?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  );
};

export default JobSubTypeSelect;
