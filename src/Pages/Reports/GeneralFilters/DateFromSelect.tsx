import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select, Input } from "@chakra-ui/react";
import { FormInterface } from "./FormInterface";

const DateFromSelect = ({ register, errors }: FormInterface) => {
  return (
    <FormControl width={"full"}>
      <FormLabel color={"grey"}>Date From</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Input
          {...register("dateFrom")}
          type="date"
          className="FormControl"
          placeholder="Select Schedule Date"
          defaultValue={new Date().toISOString().substr(0, 10)}
        />
      </Flex>
    </FormControl>
  );
};

export default DateFromSelect;
