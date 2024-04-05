import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import useSiteMutation from "../../../../../../hooks/Settings/Client/Site/useSiteMutation";

interface DeleteSiteProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: number;
}

const DeleteSite = ({ isOpen, onClose, siteId }: DeleteSiteProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const ClientSiteQuery = useSiteMutation(() => {
    siteId ?? "";
  }, false);

  const handleDelete = () => {
    ClientSiteQuery?.mutate(siteId);
    onClose();
  };
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader color={"darkred"}>Delete Site!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this Site?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" onClick={handleDelete} ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSite;
