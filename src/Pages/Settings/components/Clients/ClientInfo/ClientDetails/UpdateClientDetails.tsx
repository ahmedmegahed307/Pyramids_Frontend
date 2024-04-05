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
import Client from "../../../../../../models/Client";

const schema = z.object({
  code: z.string().optional(),
  clientName: z.string().optional(),
  primaryContactEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email is required" }),
  primaryContactPhone: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  initialOriginal: Partial<Client> | undefined;
};

const UpdateClientDetails = ({
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
      code: initialOriginal?.code || "",
      clientName: initialOriginal?.name || "",
      primaryContactPhone: initialOriginal?.primaryContactPhone || "",
      primaryContactEmail: initialOriginal?.primaryContactEmail || "",
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
          <AbsoluteCenter>
            <Box overflowY="auto" maxH="600px">
              <form
                style={{ marginRight: "50px" }}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <FormControl w={"lg"}>
                  <FormLabel fontWeight={"bold"}> Client Code</FormLabel>
                  <Input
                    {...register("code")}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                <FormControl w={"lg"} isInvalid={!!errors.clientName} mt={5}>
                  <FormLabel fontWeight={"bold"}>Client Name</FormLabel>
                  <Input
                    {...register("clientName")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.clientName && (
                    <FormErrorMessage color="red">
                      {errors.clientName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  w={"lg"}
                  isInvalid={!!errors.primaryContactEmail}
                  mt={5}
                >
                  <FormLabel fontWeight={"bold"}>
                    Primary Contact Email
                  </FormLabel>
                  <Input
                    {...register("primaryContactEmail")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.primaryContactEmail && (
                    <FormErrorMessage color="red">
                      {errors.primaryContactEmail.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl w={"lg"} mt={5}>
                  <FormLabel fontWeight={"bold"}>
                    Primary Contact Phone
                  </FormLabel>
                  <Input
                    {...register("primaryContactPhone")}
                    className="FormControl"
                    placeholder=""
                  />
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

export default UpdateClientDetails;
