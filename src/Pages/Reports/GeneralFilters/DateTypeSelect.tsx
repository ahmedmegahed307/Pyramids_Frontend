import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import { FormInterface } from "./FormInterface";
import { DateType } from "../../../StaticData/StaticData";

const DateTypeSelect = ({ register, errors }: FormInterface) => {
  return (
    <FormControl width={"full"}>
      <FormLabel color={"grey"}>Date Type</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Select {...register("dateType")}>
          <option value="">Select Date Type</option>
          {DateType.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
    </FormControl>
  );
};

export default DateTypeSelect;
