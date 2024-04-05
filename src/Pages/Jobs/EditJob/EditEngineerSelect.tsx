import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import useEngineer from "../../../hooks/Settings/User/useEngineer";
import User from "../../../models/User";
interface Props extends FormValidation {
  engineers: User[];
  defaultValue: number;
}
const EditEngineerSelect = ({
  register,
  errors,
  engineers,
  defaultValue,
}: Props) => {
  if (!engineers) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>Engineer</FormLabel>
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
  const selectedEngineer = engineers?.find((c) => c.id === defaultValue);
  if (defaultValue !== 0 && !selectedEngineer) {
    return (
      <FormControl width={"full"}>
        <FormLabel>Engineer</FormLabel>
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
      <FormLabel>Engineer</FormLabel>

      <Select
        defaultValue={selectedEngineer?.id}
        variant="outline"
        placeholder="Select Engineer"
        {...register("engineerId")}
      >
        {engineers?.map((engineer) => (
          <option key={engineer.id} value={engineer.id}>
            {engineer.firstName + " " + engineer.lastName}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditEngineerSelect;
