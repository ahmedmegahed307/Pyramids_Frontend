import {
  AbsoluteCenter,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RequiredFormLabel from "../../../../../RequiredFields/RequiredFormLabel";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  address1: z.string().nonempty({ message: "Address is required" }),
  address2: z.string().optional(),
  city: z.string().nonempty({ message: "City is required" }),
  postcode: z.string().optional(),
  contactName: z.string().nonempty({ message: "Contact Name is required" }),
});

export type CreateClientSiteValidation = z.infer<typeof schema>;
type SiteFormProps = {
  onSubmit: (data: CreateClientSiteValidation) => void;
  createSiteModal: any;
  customer?: any;
};

const CreateSite = ({ createSiteModal, onSubmit }: SiteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateClientSiteValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateClientSiteValidation) => {
    onSubmit(data);
    reset();
  };
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <AbsoluteCenter overflowY={"auto"} maxH={"calc(100vh - 50px)"}>
            <>
              <Heading size={"md"} pb={5} color={"teal"}>
                Create Site
              </Heading>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.name}
                >
                  <RequiredFormLabel label={"Site Name"} />

                  <Input
                    {...register("name")}
                    className="FormControl"
                    placeholder=""
                    autoFocus
                  />
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
                  isInvalid={!!errors.contactName}
                >
                  <RequiredFormLabel label={"Contact Name"} />

                  <Input
                    {...register("contactName")}
                    className="FormControl"
                    placeholder=""
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
                  isInvalid={!!errors.email}
                >
                  <RequiredFormLabel label={"Site Contact Mail"} />
                  <Input
                    {...register("email")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
                  <RequiredFormLabel label={" Site Contact Phone"} />
                  <Input
                    {...register("phoneNumber")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.name && (
                    <FormErrorMessage>
                      {errors.phoneNumber?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.address1}
                >
                  <RequiredFormLabel label={"Address Line 1"} />
                  <Input
                    {...register("address1")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.name && (
                    <FormErrorMessage>
                      {errors.address1?.message}
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
                  <FormLabel>Address Line 2</FormLabel>

                  <Input
                    {...register("address2")}
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
                  isInvalid={!!errors.city}
                >
                  <RequiredFormLabel label={"City"} />
                  <Input
                    {...register("city")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.city && (
                    <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Postcode</FormLabel>

                  <Input
                    {...register("postcode")}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                <Button type="submit" w={"full"} mt={4}>
                  Save
                </Button>
              </form>
            </>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default CreateSite;
