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
import useJobAttachmentMutation from "../../../../../hooks/Jobs/useJobAttachmentMutation";

type props = {
  isOpen: boolean;
  onClose: () => void;
  attachmentId: number;
  jobId: number;
};

const DeleteAttachment = ({ isOpen, onClose, attachmentId, jobId }: props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteAttachment = useJobAttachmentMutation(
    () => {
      onClose();
    },
    false,
    jobId
  );

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
          Are you sure you want to Delete this Attachment?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteAttachment.mutate(attachmentId);
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

export default DeleteAttachment;
