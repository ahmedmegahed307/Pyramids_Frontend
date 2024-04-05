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
} from "@chakra-ui/react";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";

const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  contactName: z.string().nonempty({ message: "Contact name is required" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  role: z.enum(["1", "5"], {
    errorMap: () => ({
      message: "Role is required",
    }),
  }),
});

export type CreateUserValidation = z.infer<typeof schema>;
type UserFormProps = {
  onSubmit: (data: CreateUserValidation) => void;
};

const CreateUser = ({ onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateUserValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateUserValidation) => {
    onSubmit(data);
    //reset();
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.firstName}
              >
                <RequiredFormLabel label={"First Name"} />{" "}
                <Input
                  {...register("firstName")}
                  placeholder="Enter First Name"
                  autoFocus
                />
                {errors.firstName && (
                  <FormErrorMessage>
                    {errors.firstName.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.lastName}
              >
                <RequiredFormLabel label={"Last Name"} />{" "}
                <Input
                  {...register("lastName")}
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.email}
              >
                <RequiredFormLabel label={"Email"} />{" "}
                <Input {...register("email")} placeholder="Enter email" />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.contactName}
              >
                <RequiredFormLabel label={"Contact Name"} />{" "}
                <Input
                  {...register("contactName")}
                  placeholder="Enter contact name"
                />
                {errors.contactName && (
                  <FormErrorMessage>
                    {errors.contactName.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.phoneNumber}
              >
                <RequiredFormLabel label={"Phone Number"} />{" "}
                <Input
                  {...register("phoneNumber")}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <FormErrorMessage>
                    {errors.phoneNumber.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.role}
              >
                <RequiredFormLabel label={"Role"} />{" "}
                <Select {...register("role")} placeholder="Select role">
                  <option value="1">Admin</option>
                  <option value="5">Engineer</option>
                </Select>
                {errors.role && (
                  <FormErrorMessage>{errors.role.message}</FormErrorMessage>
                )}
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

export default CreateUser;
