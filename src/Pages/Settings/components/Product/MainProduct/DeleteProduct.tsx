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
import useProductMutation from "../../../../../hooks/Settings/Product/MainProduct/useProductMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
};

const DeleteProduct = ({ isOpen, onClose, productId }: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteProduct = useProductMutation(() => {
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
          Are you sure you want to Delete this Product Model?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteProduct.mutate(productId);
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

export default DeleteProduct;
