import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Button,
  Checkbox,
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
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import useClient from "../../../../../hooks/Settings/Client/useClient";
import { Product } from "../../../../../models/Product";
import { useEffect, useState } from "react";
import useProductCategory from "../../../../../hooks/Settings/Product/ProductCategory/useProductCategory";

const schema = z.object({
  code: z.string().min(3, { message: "Code must be at least 1 character" }),
  name: z.string().min(3, { message: "Name must be at least 1 character" }),
  description: z.string().optional(),
  standardPrice: z.string().optional(),
  jobPrice: z.string().optional(),
  brand: z.string().optional(),
  serialControlled: z.boolean().optional(),
  categoryId: z.string().optional(),
});

export type UpdateProductValidation = z.infer<typeof schema>;
type ProductTypeFormProps = {
  onSubmit: (data: UpdateProductValidation) => void;
  defaultValue: Product;
};

const UpdateProduct = ({ onSubmit, defaultValue }: ProductTypeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateProductValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: defaultValue.code,
      name: defaultValue.name,
      description: defaultValue.description,
      standardPrice: defaultValue.standardPrice.toString(),
      jobPrice: defaultValue.jobPrice.toString(),
      brand: defaultValue.brand,
      serialControlled: defaultValue.serialControlled,
      categoryId: defaultValue.categoryId.toString(),
    },
  });
  const handleFormSubmit = (data: UpdateProductValidation) => {
    onSubmit(data);
    //reset();
  };
  const { data: categories } = useProductCategory();

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
            overflow={"auto"}
            maxH={"calc(100vh - 50px)"}
          >
            <Heading size={"md"} color="Primary.700" mb={8}>
              Update Product
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
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
                mr={2}
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
                <RequiredFormLabel label={"Category "} />
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
    </>
  );
};

export default UpdateProduct;
