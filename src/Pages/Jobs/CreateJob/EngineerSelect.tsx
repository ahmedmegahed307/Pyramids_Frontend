import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  //Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import useEngineer from "../../../hooks/Settings/User/useEngineer";
import User from "../../../models/User";
import { Select } from "chakra-react-select";
import { Label } from "recharts";
interface Props extends FormValidation {
  engineers: User[];
  setSelectedEngineer: (engineer: number) => void;
}
const EngineerSelect = ({
  register,
  errors,
  engineers,
  setSelectedEngineer,
}: Props) => {
  const handleEngineerChange = (selectedEngineer) => {
    setSelectedEngineer(selectedEngineer.value);
  };

  const options = [
    { label: "Select engineer", value: 0 }, // Empty option
    ...(engineers?.map((engineer) => ({
      label: engineer.firstName + " " + engineer.lastName,
      value: engineer.id,
    })) || []),
  ];
  return (
    <FormControl w={"full"}>
      <FormLabel>Engineer</FormLabel>

      <Select
        selectedOptionColorScheme="Primary"
        {...register("engineerId")}
        options={options}
        onChange={handleEngineerChange}
      />
    </FormControl>
  );
};

export default EngineerSelect;
