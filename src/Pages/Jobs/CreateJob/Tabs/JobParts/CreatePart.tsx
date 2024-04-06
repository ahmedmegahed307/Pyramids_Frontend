import {
  AbsoluteCenter,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import JobPart from "../../../../../models/JobPart";
import useProduct from "../../../../../hooks/Settings/Product/MainProduct/useProduct";
import Product from "../../../../../models/Product";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";

interface JobPartsProps {
  createPartModal: any;
  addNewPart: (newPart: any) => void;
}
const CreatePart = ({ createPartModal, addNewPart }: JobPartsProps) => {
  const { data: products } = useProduct();
  const [createPart, setCreatePart] = useState<JobPart>({
    name: "",
    productId: 0,
    cost: "",
    quantity: 1,
    id: uuidv4(),
  });

  const handlePartCreate = () => {
    if (!createPart?.name || createPart?.quantity! <= 0) {
      Swal.fire({
        title: "Oops",
        text: "Please fill out all fields to add part",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      //createPartModal.onClose();
      return;
    }
    addNewPart(createPart);
    createPartModal.onClose();
    setCreatePart({
      name: "",
      cost: "",
      quantity: 1,
      id: uuidv4(),
    });
  };

  const [inputError, setInputError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleProductSelection = (selectedProductId: string) => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(selectedProductId)
      );
      if (selectedProduct) {
        setSelectedProduct(selectedProduct);
        setCreatePart({
          ...createPart,
          name: selectedProduct.name,
          productId: selectedProduct.id,
          cost: selectedProduct.jobPrice.toString(),
          id: uuidv4(),
        });
      }
    } else {
      setSelectedProduct(null);
      setCreatePart({
        name: "",
        cost: "",
        quantity: 0,
        productId: 0,
        id: uuidv4(),
      });
    }
  };
  return (
    <>
      <Drawer
        onClose={createPartModal.onClose}
        isOpen={createPartModal.isOpen}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter>
              <>
                <FormControl pb={5} w={"lg"}>
                  <RequiredFormLabel label={"Product"} />
                  <Select
                    size={"md"}
                    variant="outline"
                    placeholder="Select Product"
                    onChange={(e) => handleProductSelection(e.target.value)}
                  >
                    {products?.map((product, index) => {
                      return (
                        <option value={product.id} key={index}>
                          {product.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl pb={5} w={"lg"}>
                  <FormLabel>Part Cost</FormLabel>
                  <Input
                    value={createPart && createPart!.cost!}
                    className="FormControl"
                    disabled={true}
                    backgroundColor={"gray.200"}
                    color="Primary.700"
                    fontWeight={"bold"}
                  />
                </FormControl>

                <FormControl pb={5} w={"lg"}>
                  <RequiredFormLabel label={"Quantity"} />

                  <Input
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = parseInt(inputValue); // Parse input as an integer
                      if (!isNaN(numericValue) || inputValue === "") {
                        return setCreatePart({
                          ...createPart,
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
                    value={createPart && createPart!.quantity!}
                    className="FormControl"
                    placeholder=""
                    required
                  />
                </FormControl>

                <Button onClick={handlePartCreate} w={"full"} my={10}>
                  Save
                </Button>
              </>
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreatePart;
