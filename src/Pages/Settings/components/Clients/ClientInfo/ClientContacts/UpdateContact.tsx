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
  Input,
  Select,
} from "@chakra-ui/react";
import Site from "../../../../../../models/Site";
import Contact from "../../../../../../models/Contact";
import RequiredFormLabel from "../../../../../RequiredFields/RequiredFormLabel";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  siteId: z.string().optional(),
  contactType: z.string().nonempty({ message: "Contact Type is required" }),
});

export type UpdateContactValidation = z.infer<typeof schema>;
type ContactFormProps = {
  onSubmit: (data: UpdateContactValidation) => void;
  defaultValue: Contact | undefined;
  customerSites: Site[] | any;
};

const UpdateContact = ({
  defaultValue,
  onSubmit,
  customerSites,
}: ContactFormProps) => {
  console.log("defaultValue", defaultValue);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateContactValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValue?.name || undefined,
      email: defaultValue?.email || undefined,
      phoneNumber: defaultValue?.phone || undefined,
      siteId: defaultValue?.site?.id?.toString() || undefined,
      contactType: defaultValue?.contactType || undefined,
    },
  });
  const handleFormSubmit = (data: UpdateContactValidation) => {
    onSubmit(data);
    reset();
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
                isInvalid={!!errors.name}
              >
                <RequiredFormLabel label="Name"></RequiredFormLabel>
                <Input
                  {...register("name")}
                  placeholder="Enter name"
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
                isInvalid={!!errors.email}
              >
                <RequiredFormLabel label="Email"></RequiredFormLabel>
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
                isInvalid={!!errors.phoneNumber}
              >
                <RequiredFormLabel label="Phone Number"></RequiredFormLabel>
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
              >
                <FormLabel>Site Name</FormLabel>

                <Select {...register("siteId")} placeholder="Select Site Name">
                  {customerSites.map((site, index: number) => (
                    <option key={index} value={site?.id || ""}>
                      {site?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                mb={5}
                isInvalid={!!errors.contactType}
              >
                <RequiredFormLabel label="Contact Type"></RequiredFormLabel>
                <Select
                  {...register("contactType")}
                  placeholder="Select Contact Type"
                >
                  <option value="SITE">Site</option>
                  <option value="PRIMARY">Primary</option>
                  <option value="PRIMARYSITE">Primary Site</option>
                </Select>
                {errors.contactType && (
                  <FormErrorMessage>
                    {errors.contactType.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" w={"full"} my={10}>
                Update Contact
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default UpdateContact;
