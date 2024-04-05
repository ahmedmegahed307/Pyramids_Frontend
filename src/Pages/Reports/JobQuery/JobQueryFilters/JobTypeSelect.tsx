import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import { FormInterface } from "../../GeneralFilters/FormInterface";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";

const JobTypeSelect = ({ register, errors }: FormInterface) => {
  const { data: JobTypes } = useJobType();

  return (
    <FormControl width={"full"}>
      <FormLabel color={"grey"}>Job Type</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Select {...register("jobTypeId")}>
          <option value="">Select Job Type</option>
          {JobTypes?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  );
};

export default JobTypeSelect;
