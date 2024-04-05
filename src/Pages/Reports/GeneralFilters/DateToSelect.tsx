import { useEffect, useState } from "react";
import { FormControl, FormLabel, Flex, Select, Input } from "@chakra-ui/react";
import { FormInterface } from "./FormInterface";

const DateToSelect = ({ register, errors }: FormInterface) => {
  return (
    <FormControl width={"full"}>
      <FormLabel color={"grey"}>Date To</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Input
          {...register("dateTo")}
          type="date"
          className="FormControl"
          placeholder="Select Schedule Date"
          defaultValue={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 10)}
        />
      </Flex>
    </FormControl>
  );
};

export default DateToSelect;
