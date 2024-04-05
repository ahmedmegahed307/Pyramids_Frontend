import { GroupBase, OptionBase, Select } from "chakra-react-select";
import React from "react";
import useClient from "../../hooks/Settings/Client/useClient";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
interface Props {
  onSelectedClients: (clientsId: number[] | undefined) => void;
}

const ClientSelect = ({ onSelectedClients }: Props) => {
  const { data: clientList, isLoading, isError } = useClient();
  const clientOptions = clientList?.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;
  const handleClientChange = (selectedClients) => {
    const clientIds = selectedClients.map((client) => client.value);
    onSelectedClients(clientIds);
  };
  return (
    <Select
      useBasicStyles
      styles={{
        control: (provided) => ({
          ...provided,
          border: 0,
          outline: "1px solid white",
        }),
      }}
      placeholder="Select Client(s)"
      isMulti
      colorScheme="Primary"
      options={clientOptions}
      onChange={handleClientChange}
    />
  );
};

export default ClientSelect;
