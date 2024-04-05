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
import useAssetManufacturerMutation from "../../../../../hooks/Settings/Assets/AssetManufacturer/useAssetManufacturerMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  assetManufacturerId: number;
};

const DeleteAssetManufacturer = ({
  isOpen,
  onClose,
  assetManufacturerId,
}: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteAssetManufacturer = useAssetManufacturerMutation(() => {
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
          Are you sure you want to Delete this Asset Manufacturer?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteAssetManufacturer.mutate(assetManufacturerId);
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

export default DeleteAssetManufacturer;
