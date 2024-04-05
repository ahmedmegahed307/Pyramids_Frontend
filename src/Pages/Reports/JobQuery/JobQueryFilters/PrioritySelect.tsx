import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import { FormInterface } from "../../GeneralFilters/FormInterface";
import { Priority } from "../../../../StaticData/StaticData";

const PrioritySelect = ({ register, errors }: FormInterface) => {
  return (
    <FormControl w={"full"}>
      <FormLabel color={"grey"}>Priority</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Select {...register("jobPriorityId")}>
          <option value="">Select Priority</option>
          {Priority.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  );
};

export default PrioritySelect;
