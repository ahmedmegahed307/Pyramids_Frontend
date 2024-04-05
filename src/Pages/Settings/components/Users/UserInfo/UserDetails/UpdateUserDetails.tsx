import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import User from "../../../../../../models/User";
import RequiredFormLabel from "../../../../../RequiredFields/RequiredFormLabel";

const schema = z.object({
  initials: z.string().optional(),
  firstName: z
    .string()
    .min(4, { message: "First Name must be atleast 3 chars" }),
  lastName: z.string().min(4, { message: "Last Name must be atleast 3 chars" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Support email is required" }),
  phone: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  initialOriginal: Partial<User> | undefined;
};

const UpdateUserDetails = ({
  onSubmit,

  initialOriginal,
}: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      initials: initialOriginal?.initials || "",
      firstName: initialOriginal?.firstName || "",
      lastName: initialOriginal?.lastName || "",
      phone: initialOriginal?.phone || "",
      email: initialOriginal?.email || "",
    },
  });

  const handleFormSubmit = (data: FormUpdateValidation) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter ml={2}>
            <Box overflowY="auto" maxH="600px">
              <form
                style={{ marginRight: "50px" }}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Initials</FormLabel>
                  <Input
                    {...register("initials")}
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
                  isInvalid={!!errors.firstName}
                >
                  <RequiredFormLabel label={"First Name"} />
                  <Input
                    {...register("firstName")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.firstName && (
                    <FormErrorMessage color="red">
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
                  <RequiredFormLabel label={"Last Name"} />
                  <Input
                    {...register("lastName")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.lastName && (
                    <FormErrorMessage color="red">
                      {errors.lastName.message}
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
                  <RequiredFormLabel label={"Email"} />
                  <Input
                    {...register("email")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.email && (
                    <FormErrorMessage color="red">
                      {errors.email.message}
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
                  <FormLabel>Phone</FormLabel>
                  <Input
                    {...register("phone")}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                {/* <FormControl w={"lg"} mt={5}>
                  <FormLabel>Time Zone</FormLabel>
                  <Select {...register("timeZone")} className="FormControl">
                    <option value="">Select Time Zone</option>
                    <option value="(UTC+00:00) Dublin, Edinburgh, Lisbon, London">
                      (UTC+00:00) Dublin, Edinburgh, Lisbon, London
                    </option>
                    <option value=" (UTC-03:00) Cayenne, Fortaleza">
                      (UTC-03:00) Cayenne, Fortaleza
                    </option>
                    <option value=" (UTC-03:00) City of Buenos Aires">
                      (UTC-03:00) City of Buenos Aires
                    </option>
                  </Select>
                </FormControl> */}

                <Button type="submit" w={"full"} my={10}>
                  Save
                </Button>
              </form>
            </Box>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default UpdateUserDetails;
