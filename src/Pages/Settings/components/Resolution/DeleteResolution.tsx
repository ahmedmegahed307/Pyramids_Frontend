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
import useResolutionMutation from "../../../../hooks/Settings/Resolution/useResolutionMutation";

type DeleteResolutionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resolutionId: number;
};

const DeleteResolution = ({
  isOpen,
  onClose,
  resolutionId,
}: DeleteResolutionModalProps) => {
  const deleteResolution = useResolutionMutation(() => {
    onClose();
  }, false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteResolution = () => {
    deleteResolution.mutate(resolutionId);
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
        <AlertDialogHeader color={"darkred"}>Warning!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this resolution?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" onClick={handleDeleteResolution} ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteResolution;
