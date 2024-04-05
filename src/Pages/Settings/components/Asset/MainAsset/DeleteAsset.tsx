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
import useAssetMutation from "../../../../../hooks/Settings/Assets/MainAsset/useAssetMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  AssetId: number;
};

const DeleteAsset = ({ isOpen, onClose, AssetId }: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteAsset = useAssetMutation(() => {
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
        <AlertDialogHeader color={"darkred"}>Warning!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to Delete this Asset?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteAsset.mutate(AssetId);
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

export default DeleteAsset;
