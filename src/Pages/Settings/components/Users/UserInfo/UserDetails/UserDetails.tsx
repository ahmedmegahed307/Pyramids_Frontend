import {
  Flex,
  Heading,
  VStack,
  Box,
  Button,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UpdateUserDetails, {
  FormUpdateValidation,
} from "../UserDetails/UpdateUserDetails";
import User from "../../../../../../models/User";
import UserRowSetting from "../UserRowSetting";
import useUserMutation from "../../../../../../hooks/Settings/User/useUserMutation";
import { userProps } from "../../../../../../StaticData/StaticData";

const UserDetails = ({ user }: userProps) => {
  //update user
  const editModal = useDisclosure();
  const updateUserMutation = useUserMutation(() => {
    const id = user?.id ?? "";
  }, true);
  const handleUpdateForm = async (data: FormUpdateValidation) => {
    console.log("Update user info:", data);
    try {
      const updatedUser: User = {
        ...user,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        initials: data.initials,
      };
      await updateUserMutation.mutateAsync(updatedUser);
      editModal.onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Flex direction="column">
        <HStack mb={8}>
          <Spacer />
          <Button
            leftIcon={<EditIcon />}
            variant={"link"}
            onClick={() => {
              editModal.onOpen();
            }}
          >
            Edit User details
          </Button>
        </HStack>

        <VStack justify={"center"}>
          <UserRowSetting label="Initials" value={user?.initials || ""} />
          <UserRowSetting
            label="Full Name"
            value={user?.firstName + " " + user?.lastName || ""}
          />

          <UserRowSetting label="Email" value={user?.email || ""} />
          <UserRowSetting label="Phone" value={user?.phone || "-"} />
          {/* <UserRowSetting label="TIME ZONE" value={"-"} /> */}
          <UserRowSetting
            label="Role"
            value={
              user?.userRoleId === 1
                ? "Admin"
                : user?.userRoleId === 5
                ? "Engineer"
                : "Dispatcher"
            }
          />
        </VStack>
      </Flex>
      {/* Update */}
      <Drawer
        onClose={editModal.onClose}
        isOpen={editModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <UpdateUserDetails
          onSubmit={handleUpdateForm}
          initialOriginal={user ?? undefined}
        />
      </Drawer>
    </>
  );
};

export default UserDetails;
