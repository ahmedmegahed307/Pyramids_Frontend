import {
  FormControl,
  FormLabel,
  // Select,
  FormErrorMessage,
  useDisclosure,
  HStack,
  Button,
  Drawer,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import { MdAdd } from "react-icons/md";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import useClient from "../../../hooks/Settings/Client/useClient";
import Client from "../../../models/Client";
import CreateClient from "./CreateClient";
import { useFormContext } from "react-hook-form";
interface Props extends FormValidation {
  clients: Client[];
  setSelectedClient: (client: string) => void;
}
const ClientSelect = ({
  clients,
  setSelectedClient,
  register,
  errors,
}: Props) => {
  //create client
  const createClientModal = useDisclosure();

  const handleClientChange = (selectedClient) => {
    setSelectedClient(selectedClient.value);
  };
  return (
    <>
      <FormControl w="full" isInvalid={errors.clientId !== undefined}>
        <HStack justify={"space-between"} w={"full"} m={0} p={0}>
          <FormLabel>Client</FormLabel>
          {/* <Button
            onClick={() => {
              createClientModal.onOpen();
            }}
            variant={"link"}
            aria-label="Search database"
            leftIcon={<MdAdd />}
          >
            Add new client
          </Button> */}
        </HStack>
        {/* <Select
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
        </Select> */}

        <Select
          placeholder="Select Client"
          selectedOptionColorScheme="Primary"
          {...register("clientId")}
          options={
            clients?.map((client) => {
              return {
                label: client.name,
                value: client.id,
              };
            }) || []
          }
          onChange={handleClientChange}
        />
        <FormErrorMessage>
          <FormErrorMessage>
            {errors.clientId && errors.clientId.message}
          </FormErrorMessage>
        </FormErrorMessage>
      </FormControl>

      {/* create client modal */}

      {/* <CreateClient createClientModal={createClientModal} /> */}
    </>
  );
};

export default ClientSelect;
