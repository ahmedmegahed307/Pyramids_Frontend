import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import Company from "../../../../../models/Company";

const schema = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),

  city: z.string().optional(),
  postCode: z.string().optional(),
  country: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;

  initialOriginal: Partial<Company> | undefined;
};

const UpdateAddress = ({
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
      addressLine1: initialOriginal?.address?.addressLine1 || "",
      addressLine2: initialOriginal?.address?.addressLine2 || "",

      country: initialOriginal?.address?.country || "",
      city: initialOriginal?.address?.city || "",
      postCode: initialOriginal?.address?.postCode || "",
    },
  });

  const handleFormSubmit = async (data: FormUpdateValidation) => {
    console.log("Address Data", data);
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
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Address Line 1</FormLabel>
                  <Input
                    {...register("addressLine1")}
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
                  <FormLabel>Address Line 2</FormLabel>
                  <Input
                    {...register("addressLine2")}
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
                  <FormLabel>City</FormLabel>
                  <Input
                    {...register("city")}
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
                  <FormLabel>Postcode</FormLabel>
                  <Input
                    {...register("postCode")}
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
                  mt={5}
                >
                  <FormLabel>Country</FormLabel>
                  <Select {...register("country")} className="FormControl">
                    <option value="Ireland">Ireland</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </Select>
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

export default UpdateAddress;
