import { GroupBase, OptionBase, Select } from "chakra-react-select";
import React from "react";
import useClient from "../../hooks/Settings/Client/useClient";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
import useUser from "../../hooks/Settings/User/useUser";
interface Props {
  onSelectedUsers: (usersId: number[] | undefined) => void;
  defaultUsersId?: number[];
}

const MultiUserSelect = ({ onSelectedUsers, defaultUsersId }: Props) => {
  const { data: users, isLoading, isError } = useUser(true);
  const usersOptions = users?.map((user) => ({
    value: user.id,
    label: user.firstName + " " + user.lastName,
  }));

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  const handleUserChange = (selectedUsers) => {
    const engineerIds = selectedUsers.map((user) => user.value);
    onSelectedUsers(engineerIds);
  };
  return (
    <Select
      useBasicStyles
      placeholder="Select User(s)"
      isMulti
      colorScheme="Primary"
      options={usersOptions}
      onChange={handleUserChange}
      defaultValue={usersOptions.filter((option) =>
        defaultUsersId?.includes(option.value)
      )}
    />
  );
};

export default MultiUserSelect;
