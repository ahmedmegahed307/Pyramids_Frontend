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
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import useClient from "../../../../../hooks/Settings/Client/useClient";

const schema = z.object({
  code: z.string().min(3, { message: "Code must be at least 1 character" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),

  description: z.string().optional(),
});

export type CreateAssetManufacturerValidation = z.infer<typeof schema>;
type UserFormProps = {
  onSubmit: (data: CreateAssetManufacturerValidation) => void;
};

const CreateAssetManufacturer = ({ onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateAssetManufacturerValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateAssetManufacturerValidation) => {
    onSubmit(data);
    //reset();
  };
  const { data: clients } = useClient();

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <Heading size={"md"} color={"teal"} pb={5}>
              Create Asset Manufacturer
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
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.name}
              >
                <RequiredFormLabel label={"Name"} />{" "}
                <Input {...register("name")} placeholder="Enter Last Name" />
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
              >
                <FormLabel>Description</FormLabel>

                <Textarea
                  {...register("description")}
                  placeholder="Enter Description"
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

export default CreateAssetManufacturer;