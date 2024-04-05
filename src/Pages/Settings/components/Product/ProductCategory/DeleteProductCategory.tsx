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
import useProductCategoryMutation from "../../../../../hooks/Settings/Product/ProductCategory/useProductCategoryMutation";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ProductCategoryId: number;
};

const DeleteProductCategory = ({
  isOpen,
  onClose,
  ProductCategoryId,
}: DeleteModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteProductCategory = useProductCategoryMutation(() => {
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
              deleteProductCategory.mutate(ProductCategoryId);
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

export default DeleteProductCategory;
