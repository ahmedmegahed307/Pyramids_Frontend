import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
  Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import User from "../../../../../../models/User";
import UpdateUserPhoto from "./UpdateUserPhoto";
import useUserPhotoMutation from "../../../../../../hooks/Settings/User/UserPhoto/useUserPhotoMutation";
import Logo1 from "../../../../../../assets/img/logo1";

interface props {
  user: User;
}

const UserPhoto = ({ user }: props) => {
  const editModal = useDisclosure();
  const updateUserPhotoMutation = useUserPhotoMutation();
  const handleUpdateForm = async (data: File) => {
    await updateUserPhotoMutation.mutateAsync({
      userPhoto: data,
      userId: user?.id ?? 0,
    });
    editModal.onClose();
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
            Update Photo
          </Button>
        </HStack>

        <Box mt={20} display="flex" justifyContent="center">
          <Image maxW={"70vw"} maxH={"70vh"} as={Logo1} alt="profile photo" />
        </Box>
      </Flex>

      {/* Update */}
      <Drawer onClose={editModal.onClose} isOpen={editModal.isOpen} size={"lg"}>
        <UpdateUserPhoto onSubmit={handleUpdateForm} />
      </Drawer>
    </>
  );
};

export default UserPhoto;
