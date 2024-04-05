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
import { useRef } from "react";
import Client from "../../../../../../models/Client";
import useContactMutation from "../../../../../../hooks/Settings/Client/Contact/useContactMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  contactId: number;
};

const DeleteContact = ({ isOpen, onClose, contactId }: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const ClientContactQuery = useContactMutation(() => {
    contactId ?? "";
  }, false);

  const handleDelete = () => {
    ClientContactQuery?.mutate(contactId);
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
        <AlertDialogHeader color={"red"}>Warning!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to Delete Contact?
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

export default DeleteContact;
