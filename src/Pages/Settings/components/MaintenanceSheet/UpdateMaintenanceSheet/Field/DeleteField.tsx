import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

type DeleteFieldModalProps = {
  isOpen: boolean;
  onClose: () => void;
  deleteFieldId: string;
  onDeleteField: (deleteFieldId: string) => void;
};

const DeleteField = ({
  isOpen,
  onClose,
  deleteFieldId,
  onDeleteField,
}: DeleteFieldModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteField = () => {
    onDeleteField(deleteFieldId);
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
        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this field?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" onClick={handleDeleteField} ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteField;
