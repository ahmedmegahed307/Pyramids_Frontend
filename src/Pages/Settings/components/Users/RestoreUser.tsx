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
import { tr } from "date-fns/locale";
import useUserMutation from "../../../../hooks/Settings/User/useUserMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
};

const RestoreUser = ({ isOpen, onClose, userId }: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const restoreUser = useUserMutation(
    () => {
      onClose();
    },
    false,
    true
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
        <AlertDialogHeader color={"red"}>Warning!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to activate this user?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              restoreUser.mutate(userId);
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

export default RestoreUser;
