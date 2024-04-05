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
import useIssueMutation from "../../../../../hooks/Settings/Issue/useIssueMutation";

type props = {
  isOpen: boolean;
  onClose: () => void;
  IssueId: number;
  jobId: number;
};

const DeleteIssue = ({ isOpen, onClose, IssueId, jobId }: props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteIssue = useIssueMutation(
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
          Are you sure you want to Delete this Issue?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteIssue.mutate(IssueId);
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

export default DeleteIssue;
