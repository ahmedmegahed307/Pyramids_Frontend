import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import { Status } from "../../../../StaticData/StaticData";
import { FormInterface } from "../../GeneralFilters/FormInterface";

const StatusSelect = ({ register, errors }: FormInterface) => {
  return (
    <FormControl w={"full"}>
      <FormLabel color={"grey"}>Status</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Select {...register("jobStatusId")} placeholder="select status">
          {Status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  );
};

export default StatusSelect;
