import { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import JobPart from "../../../../../models/JobPart";
import { v4 as uuidv4 } from "uuid";
import useProduct from "../../../../../hooks/Settings/Product/MainProduct/useProduct";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";

interface UpdatePartProps {
  isOpen: boolean;
  onClose: () => void;
  updatePart: JobPart | undefined;
  onUpdate: (updatedPart: JobPart) => void;
}

const UpdatePart = ({
  isOpen,
  onClose,
  updatePart,
  onUpdate,
}: UpdatePartProps) => {
  const { data: products } = useProduct();
  const [updatedPart, setUpdatedPart] = useState<JobPart | undefined>();
  console.log("updatePart", updatePart);

  const handlePartUpdate = () => {
    console.log("updated", updatedPart);
    const updatedPartWithAllProps = {
      ...updatedPart!, // Keep all existing properties
      name: updatedPart?.name || updatePart?.name,
      cost: updatedPart?.cost || updatePart?.cost,
      productId: updatedPart?.productId || updatePart?.productId,
      quantity: parseInt(updatedPart?.quantity as any) || updatePart?.quantity,
      id: updatePart?.id || uuidv4(),
    };

    onUpdate(updatedPartWithAllProps);
    onClose();
    setUpdatedPart(undefined);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <>
              <FormControl pb={5} w={"lg"}>
                <RequiredFormLabel label={" Name"} />
                <Select
                  size={"md"}
                  variant="outline"
                  placeholder="Select Product"
                  onChange={(e) => {
                    const selectedProductName = e.target.value;
                    const selectedProduct = products.find(
                      (product) => product.name === selectedProductName
                    );
                    if (selectedProduct) {
                      setUpdatedPart({
                        ...updatedPart!,
                        name: selectedProduct.name,
                        productId: selectedProduct.id,
                        cost: selectedProduct.jobPrice.toString(),
                        id: uuidv4(),
                      });
                    }
                  }}
                  defaultValue={updatePart?.name ?? ""}
                >
                  {products?.map((product, index) => (
                    <option value={product.name} key={index}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl pb={5} w={"lg"}>
                <RequiredFormLabel label={"Cost"} />
                <Input
                  value={updatedPart?.cost ?? updatePart?.cost ?? ""}
                  className="FormControl"
                  disabled
                />
              </FormControl>
              <FormControl pb={5} w={"lg"}>
                <RequiredFormLabel label={"Quantity"} />
                <Input
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseInt(inputValue);
                    if (!isNaN(numericValue) || inputValue === "") {
                      return setUpdatedPart({
                        ...updatedPart,
                        quantity: isNaN(numericValue) ? 1 : numericValue,
                      });
                    }
                  }}
                  onKeyPress={(e) => {
                    // Allow only numeric characters and certain control keys
                    const key = e.key;
                    const allowedKeys = [
                      "0",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                    ];
                    if (!allowedKeys.includes(key)) {
                      e.preventDefault();
                    }
                  }}
                  defaultValue={updatePart?.quantity ?? 1}
                  className="FormControl"
                  placeholder=""
                />
              </FormControl>
              <Button onClick={handlePartUpdate} w={"full"} my={10}>
                Update
              </Button>
            </>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdatePart;
