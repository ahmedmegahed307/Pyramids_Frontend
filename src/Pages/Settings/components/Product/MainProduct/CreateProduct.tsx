import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Button,
  Checkbox,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import { useEffect, useState } from "react";
import useProductCategory from "../../../../../hooks/Settings/Product/ProductCategory/useProductCategory";
import { MdAdd } from "react-icons/md";
import ProductCategory from "../../../../../models/ProductCategory";
import useCreateProductCategory from "../../../../../hooks/Settings/Product/ProductCategory/useCreateProductCategory";
import useAuthStore from "../../../../../hooks/Authentication/store";
import Swal from "sweetalert2";

const schema = z.object({
  code: z.string().min(3, { message: "Code must be at least 1 character" }),
  name: z.string().min(3, { message: "Name must be at least 1 character" }),
  description: z.string().optional(),
  standardPrice: z.string().optional(),
  jobPrice: z.string().optional(),
  quantity: z.number().optional(),
  brand: z.string().optional(),
  serialControlled: z.boolean().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

export type CreateProductValidation = z.infer<typeof schema>;
type UserFormProps = {
  onSubmit: (data: CreateProductValidation) => void;
};

const CreateProduct = ({ onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateProductValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateProductValidation) => {
    if (quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity must be greater than 0!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    onSubmit(data);
    //reset();
  };
  const { data: categories } = useProductCategory();

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity]);

  //create category
  const { user } = useAuthStore();
  const createCategoryModal = useDisclosure();
  const [category, setCategory] = useState<ProductCategory>();
  const createProductCategoryQuery = useCreateProductCategory(() => {
    createCategoryModal.onClose();
  });
  const submitCategory = () => {
    if (category?.code === undefined || category?.name === undefined) {
      createCategoryModal.onClose();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }
    const newProductCategory: ProductCategory = {
      code: category?.code || "",
      name: category?.name || "",
      description: category?.description || "",
      companyId: user?.companyId,
    };
    createProductCategoryQuery.mutate(newProductCategory);
    setCategory(undefined);
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter
            ml={{
              base: "20",
              lg: "0",
            }}
            overflowY={"auto"}
            maxH={"calc(100vh - 50px)"}
          >
            <Heading size={"md"} pl={10} pb={5} color="Primary.700">
              Create Product
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                mr={2}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.code}
              >
                <RequiredFormLabel label={"Code "} />
                <Input {...register("code")} placeholder="Code" autoFocus />
                {errors.code && (
                  <FormErrorMessage>{errors.code.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.name}
              >
                <RequiredFormLabel label={"Name "} />
                <Input {...register("name")} placeholder="Enter name" />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.categoryId}
              >
                <HStack justify={"space-between"} w={"full"} m={0} p={0}>
                  <RequiredFormLabel label={"Category "} />
                  <Button
                    onClick={() => {
                      createCategoryModal.onOpen();
                    }}
                    variant={"link"}
                    aria-label="Search database"
                    leftIcon={<MdAdd />}
                  >
                    add category
                  </Button>
                </HStack>
                <Select
                  {...register("categoryId")}
                  placeholder="Select Category"
                >
                  {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </Select>
                {errors.categoryId && (
                  <FormErrorMessage>
                    {errors.categoryId.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <RequiredFormLabel label={"Quantity "} />

                <Input
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseInt(inputValue); // Parse input as an integer
                    if (!isNaN(numericValue) || inputValue === "") {
                      setQuantity(isNaN(numericValue) ? 0 : numericValue); // Update the state directly
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
                />
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Standard Price</FormLabel>
                <Input {...register("standardPrice")} placeholder="ex:50" />
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Job Price</FormLabel>
                <Input {...register("jobPrice")} placeholder="ex:70" />
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Brand</FormLabel>
                <Input {...register("brand")} placeholder="ex:70" />
              </FormControl>

              <FormControl
                my={5}
                w={"lg"}
                display="flex"
                alignItems="center"
                fontWeight={"bold"}
                color={"black"}
              >
                <Checkbox
                  {...register("serialControlled")}
                  size="lg"
                  colorScheme="Primary"
                />
                <FormLabel mb="0" ml="10px">
                  Serial Controlled
                </FormLabel>
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Description</FormLabel>

                <Textarea
                  {...register("description")}
                  placeholder="Enter Description"
                />
              </FormControl>

              <Button
                type="submit"
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                my={10}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
      <>
        <Button onClick={createCategoryModal.onOpen}>Open Modal</Button>

        <Modal
          isOpen={createCategoryModal.isOpen}
          onClose={createCategoryModal.onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="Primary.700">Create Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <RequiredFormLabel label={"Code "} />
                <Input
                  onChange={(e) => {
                    setCategory({ ...category, code: e.target.value });
                  }}
                />
              </FormControl>
              <FormControl mt={2}>
                <RequiredFormLabel label={"Name"} />
                <Input
                  onChange={(e) => {
                    setCategory({ ...category, name: e.target.value });
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  onChange={(e) => {
                    setCategory({ ...category, description: e.target.value });
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={submitCategory} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={createCategoryModal.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default CreateProduct;
