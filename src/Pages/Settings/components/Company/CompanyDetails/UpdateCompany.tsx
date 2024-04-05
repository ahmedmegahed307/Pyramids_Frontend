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
import Company from "../../../../../models/Company";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Company Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: " Email is required" }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  isSendPostWorkSurvey: z.boolean().optional(),
  isSignatureRequired: z.boolean().optional(),
  websiteUrl: z.string().url({ message: "Invalid website URL" }).optional(),
  clientPortalUrl: z.string().optional(),
  primaryIndustry: z.string().optional(),
  paymentTerm: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  initialOriginal: Partial<Company> | undefined;
};

const UpdateCompany = ({ onSubmit, initialOriginal }: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialOriginal?.name || "",
      email: initialOriginal?.email || "",
      phone: initialOriginal?.phone || "",
      fax: initialOriginal?.fax || "",
      isSendPostWorkSurvey: initialOriginal?.isSendPostWorkSurvey || false,
      isSignatureRequired: initialOriginal?.isSignatureRequired || false,
      websiteUrl: initialOriginal?.websiteUrl || "",
      clientPortalUrl: initialOriginal?.clientPortalUrl || "",
      primaryIndustry: initialOriginal?.primaryIndustry || "",
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
          <AbsoluteCenter pl={5}>
            <Box overflowY="auto" maxH={"calc(100vh - 50px)"}>
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
                  isInvalid={!!errors.name}
                >
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    {...register("name")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.name && (
                    <FormErrorMessage color="red">
                      {errors.name.message}
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
                  <FormLabel>Support Email</FormLabel>
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
                  isInvalid={!!errors.phone}
                >
                  <FormLabel>Phone</FormLabel>
                  <Input
                    {...register("phone")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.phone && (
                    <FormErrorMessage color="red">
                      {errors.phone.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.fax}
                >
                  <FormLabel>Fax</FormLabel>
                  <Input
                    {...register("fax")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.fax && (
                    <FormErrorMessage color="red">
                      {errors.fax.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>
                    <Checkbox
                      {...register("isSendPostWorkSurvey")}
                      size="lg"
                      colorScheme="Primary"
                      mr={2}
                      ml={1}
                    />
                    Send Post Work Survey
                  </FormLabel>
                </FormControl>

                <FormControl
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>
                    <Checkbox
                      {...register("isSignatureRequired")}
                      size="lg"
                      colorScheme="Primary"
                      mr={2}
                      ml={1}
                    />
                    Signatures Required
                  </FormLabel>
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.websiteUrl}
                >
                  <FormLabel>Website</FormLabel>
                  <Input
                    {...register("websiteUrl")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.websiteUrl && (
                    <FormErrorMessage color="red">
                      {errors.websiteUrl.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.clientPortalUrl}
                >
                  <FormLabel>Client Portal</FormLabel>
                  <Input
                    {...register("clientPortalUrl")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.clientPortalUrl && (
                    <FormErrorMessage color="red">
                      {errors.clientPortalUrl.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.primaryIndustry}
                >
                  <FormLabel>Primary Industry</FormLabel>
                  <Select
                    {...register("primaryIndustry")}
                    className="FormControl"
                  >
                    <option value="">Select industry</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Fire Systems">Fire Systems</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Building and Construction">
                      Building and Construction
                    </option>
                    <option value="Gas Utilities">Gas Utilities</option>
                  </Select>
                  {errors.primaryIndustry && (
                    <FormErrorMessage color="red">
                      {errors.primaryIndustry.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

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

export default UpdateCompany;
