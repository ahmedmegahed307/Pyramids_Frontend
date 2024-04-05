import { FormControl, FormLabel, HStack, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useClient from "../../../../hooks/Settings/Client/useClient";

interface ClientProps {
  register: any;
  optionalClientId?: string;
}

const SingleClientSelect = ({ register, optionalClientId }: ClientProps) => {
  const { data: clientsList } = useClient();

  const defaultClient = clientsList?.find(
    (client) => client.id === parseInt(optionalClientId)
  );
  const defaultClientName = defaultClient?.name || "";

  return (
    <>
      {" "}
      <FormControl w={"full"}>
        <FormLabel color={"gray.500"}>Client</FormLabel>

        <Select
          {...register("clientId")}
          {...(defaultClientName && { value: defaultClientName })}
          size={"md"}
          variant="outline"
          placeholder="Select Client"
        >
          {clientsList &&
            clientsList!.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SingleClientSelect;
