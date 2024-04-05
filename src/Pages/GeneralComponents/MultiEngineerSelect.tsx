import { GroupBase, OptionBase, Select } from "chakra-react-select";
import React from "react";
import useClient from "../../hooks/Settings/Client/useClient";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
import useUser from "../../hooks/Settings/User/useUser";
import useEngineer from "../../hooks/Settings/User/useEngineer";
interface Props {
  onSelectedEngineers: (engineersId: number[] | undefined) => void;
  defaultEngineersId?: number[];
}

const EngineerSelect = ({ onSelectedEngineers, defaultEngineersId }: Props) => {
  const { data: engineers, isLoading, isError } = useEngineer(true);
  const clientOptions = engineers?.map((engineer) => ({
    value: engineer.id,
    label: engineer.firstName + " " + engineer.lastName,
  }));

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  const handleEngineerChange = (selectedEngineers) => {
    const engineerIds = selectedEngineers.map((engineer) => engineer.value);
    onSelectedEngineers(engineerIds);
  };
  return (
    <Select
      useBasicStyles
      placeholder="Select Engineer(s)"
      isMulti
      colorScheme="Primary"
      options={clientOptions}
      onChange={handleEngineerChange}
      defaultValue={clientOptions.filter((option) =>
        defaultEngineersId?.includes(option.value)
      )}
    />
  );
};

export default EngineerSelect;
