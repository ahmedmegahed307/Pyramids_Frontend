import { useRef } from "react";
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
import useContractMutation from "../../../hooks/PPM/useContractMutation";

interface DeleteContractProps {
  isOpen: boolean;
  onClose: () => void;
  contractId: number;
}

const DeleteContract = ({
  isOpen,
  onClose,
  contractId,
}: DeleteContractProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteContract = useContractMutation(() => {
    onClose();
  }, false);

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
        <AlertDialogHeader>Delete Contract!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this contract?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteContract?.mutate(contractId);
            }}
            ml={3}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContract;
