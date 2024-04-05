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
  financialContactName: z.string().optional(),
  financialContactEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email is required" }),
  siteType: z.string().optional(),
  currency: z.string().optional(),
  vatNumber: z.string().optional(),
  vatCode: z.string().optional(),
  vatValue: z.string().optional(),
  vatRate: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  initialOriginal: Partial<Client> | undefined;
};

const UpdateClientFinancial = ({
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
      financialContactName: initialOriginal?.primaryFinancialName || "",
      financialContactEmail: initialOriginal?.primaryFinancialEmail || "",
      siteType: initialOriginal?.siteType || "",
      currency: initialOriginal?.currency || "",
      vatNumber: initialOriginal?.vatNumber || "",
      vatValue: initialOriginal?.vatValue || "",
      vatRate: initialOriginal?.vatRate || "",
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
                  <FormLabel fontWeight={"bold"}>
                    FINANCIAL CONTACT NAME
                  </FormLabel>
                  <Input
                    {...register("financialContactName")}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl
                  w={"lg"}
                  isInvalid={!!errors.financialContactEmail}
                  mt={5}
                >
                  <FormLabel fontWeight={"bold"}>
                    FINANCIAL CONTACT EMAIL
                  </FormLabel>
                  <Input
                    {...register("financialContactEmail")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.financialContactEmail && (
                    <FormErrorMessage color="red">
                      {errors.financialContactEmail.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={5} w={"lg"}>
                  <FormLabel> Client Type </FormLabel>
                  <Select
                    {...register("siteType")}
                    variant="outline"
                    placeholder=" Select Type"
                  >
                    <option value="company">Company</option>
                    <option value="household">Household</option>
                  </Select>
                </FormControl>

                <FormControl mt={5} w={"lg"}>
                  <FormLabel> Currency Code </FormLabel>
                  <Select
                    {...register("currency")}
                    variant="outline"
                    placeholder=" Select currency code"
                  >
                    <option value="aud">AUD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                  </Select>
                </FormControl>
                <FormControl mt={5} w={"lg"}>
                  <FormLabel> VAT Rate </FormLabel>
                  <Select
                    {...register("vatRate")}
                    variant="outline"
                    placeholder=" Select VAT Rate"
                  >
                    <option value="zeroRate">Zero Rate</option>
                    <option value="standardRate">Standard Rate</option>
                    <option value="lowRate">Low Rate</option>
                  </Select>
                </FormControl>

                <FormControl w={"lg"} mt={5}>
                  <FormLabel fontWeight={"bold"}>VAT NUMBER</FormLabel>
                  <Input
                    {...register("vatNumber")}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl w={"lg"} mt={5}>
                  <FormLabel fontWeight={"bold"}>VAT VALUE</FormLabel>
                  <Input
                    {...register("vatValue")}
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

export default UpdateClientFinancial;
