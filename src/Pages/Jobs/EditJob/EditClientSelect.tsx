import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  useDisclosure,
  HStack,
  Button,
  Drawer,
  Spinner,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import { MdAdd } from "react-icons/md";
import { useState } from "react";

import useClient from "../../../hooks/Settings/Client/useClient";
import Client from "../../../models/Client";
interface Props extends FormValidation {
  clients: Client[];
  defaultValue: number;
}
const EditClientSelect = ({
  clients,
  register,
  errors,
  defaultValue,
}: Props) => {
  if (!clients) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>Client</FormLabel>
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
  const selectedClient = clients?.find((c) => c.id === defaultValue);
  if (!selectedClient) {
    return (
      <FormControl width={"full"}>
        <FormLabel>Client</FormLabel>
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
    <>
      <FormControl w="full" isInvalid={errors.clientId !== undefined}>
        <FormLabel>Client</FormLabel>

        <Select
          defaultValue={selectedClient?.id}
          variant="outline"
          placeholder="Select Client"
          size={"md"}
          {...register("clientId")}
        >
          {clients?.map((client) => {
            return (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            );
          })}
        </Select>
        <FormErrorMessage>
          <FormErrorMessage>
            {errors.clientId && errors.clientId.message}
          </FormErrorMessage>
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default EditClientSelect;
