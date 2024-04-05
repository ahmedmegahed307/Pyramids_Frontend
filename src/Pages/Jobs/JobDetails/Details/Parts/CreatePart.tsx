import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Button,
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
  Textarea,
} from "@chakra-ui/react";
import useProduct from "../../../../../hooks/Settings/Product/MainProduct/useProduct";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const schema = z.object({
  productId: z.string().nonempty({ message: "Product selection required" }),
  quantity: z.number().optional(),
});

export type CreatePartValidation = z.infer<typeof schema>;
type PartFormProps = {
  onSubmit: (data: CreatePartValidation) => void;
};

const CreatePart = ({ onSubmit }: PartFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreatePartValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreatePartValidation) => {
    if (quantity <= 0) {
      Swal.fire({
        title: "Oops",
        text: "Quantity must be greater than 0",
        icon: "error",
        timer: 500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
    onSubmit(data);
    reset();
  };
  const selectedProductId = watch("productId");
  const { data: products } = useProduct();
  const selectedProduct = products?.find(
    (product) => product.id === parseInt(selectedProductId)
  );
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity]);
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mt={5}
                w={"lg"}
                isInvalid={errors.productId !== undefined}
              >
                <RequiredFormLabel label={"Product"} />
                <Select
                  size={"md"}
                  variant="outline"
                  placeholder="Select Product"
                  {...register("productId")}
                >
                  {products?.map((product, index) => {
                    return (
                      <option value={product.id} key={index}>
                        {product.name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>
                  <FormErrorMessage>
                    {errors.productId && errors.productId.message}
                  </FormErrorMessage>
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={5} w={"lg"}>
                <FormLabel>Part Cost</FormLabel>
                <Input
                  value={selectedProduct?.jobPrice ?? ""}
                  className="FormControl"
                  disabled={true}
                  backgroundColor={"gray.200"}
                  color={"teal"}
                  fontWeight={"bold"}
                />
              </FormControl>

              <FormControl mt={5} w={"lg"}>
                <RequiredFormLabel label={"Quantity"} />

                <Input
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseInt(inputValue); // Parse input as an integer
                    if (!isNaN(numericValue) || inputValue === "") {
                      return setQuantity(
                        isNaN(numericValue) ? 1 : numericValue
                      );
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
                  value={quantity ?? 1}
                  className="FormControl"
                  placeholder=""
                  required
                />
              </FormControl>

              <Button type="submit" w={"full"} my={10} isLoading={isSubmitting}>
                Submit
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default CreatePart;
