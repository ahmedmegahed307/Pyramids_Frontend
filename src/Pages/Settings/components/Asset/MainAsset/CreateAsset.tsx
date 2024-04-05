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
  Text,
  Textarea,
} from "@chakra-ui/react";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import useClient from "../../../../../hooks/Settings/Client/useClient";
import { useEffect, useState } from "react";
import { IAssetCreationData } from "../../../../../models/Interfaces/IAssetCreationData";
import useGetSitesByClientId from "../../../../../hooks/Settings/Client/Site/useGetSitesByClientId";
const schema = z.object({
  serialNo: z
    .string()
    .min(3, { message: "SrialNo must be at least 1 character" }),
  tagNo: z.string().optional(),
  quantity: z.number().optional(),
  description: z.string().optional(),
  //clientId: z.string().nonempty({ message: "Please select a client" }),
  clientId: z.string().optional(),
  siteId: z.string().optional(),
  assetTypeId: z.string().nonempty({ message: "Asset Type is required" }),
  assetModelId: z.string().nonempty({ message: "Asset Model is required" }),
  assetManufacturerId: z
    .string()
    .nonempty({ message: "Asset Manufacturer is required" }),
});

export type CreateAssetValidation = z.infer<typeof schema>;
type UserFormProps = {
  onSubmit: (data: CreateAssetValidation) => void;
  assetCreationData: IAssetCreationData;
  isAccessFromClientPage?: boolean;
};

const CreateAsset = ({
  onSubmit,
  assetCreationData,
  isAccessFromClientPage,
}: UserFormProps) => {
  console.log("assetCreationData", assetCreationData);
  const [quantity, setQuantity] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateAssetValidation>({
    resolver: zodResolver(schema),
  });
  const [showError, setShowError] = useState(false);
  const handleFormSubmit = (data: CreateAssetValidation) => {
    if (!data.clientId && !isAccessFromClientPage) {
      setShowError(true);
      return;
    }
    onSubmit(data);
    //reset();
  };
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity]);
  const selectedClientId = watch("clientId");
  // get sites according to selected cliented
  const { data: clientSites } = useGetSitesByClientId(
    parseInt(selectedClientId)
  );

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter pt={2} overflowY={"auto"} maxH={"calc(100vh - 50px)"}>
            <Heading size={"md"} color={"teal"} mb={8}>
              Create Asset
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.serialNo}
              >
                <RequiredFormLabel label={"Serial No "} />
                <Input
                  {...register("serialNo")}
                  placeholder=" Enter Serial No"
                  autoFocus
                />
                {errors.serialNo && (
                  <FormErrorMessage>{errors.serialNo.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Tag No</FormLabel>
                <Input {...register("tagNo")} placeholder="Enter tag no" />
              </FormControl>
              {!isAccessFromClientPage && (
                <>
                  <FormControl
                    mr={2}
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <RequiredFormLabel label={"Client"} />
                    <Select
                      {...register("clientId")}
                      placeholder="Select Client"
                    >
                      {assetCreationData?.clients?.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </Select>

                    {showError && (
                      <Text color="red" mt={1}>
                        Client Is Required
                      </Text>
                    )}
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> Site</FormLabel>
                    <Select {...register("siteId")} placeholder="Select Site">
                      {clientSites?.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.assetModelId}
              >
                <RequiredFormLabel label={"Asset Model"} />
                <Select
                  {...register("assetModelId")}
                  placeholder="Select Model"
                >
                  {assetCreationData?.assetModels?.map((assetModel) => (
                    <option key={assetModel.id} value={assetModel.id}>
                      {assetModel.name}
                    </option>
                  ))}
                </Select>
                {errors.assetModelId && (
                  <FormErrorMessage>
                    {errors.assetModelId.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.assetTypeId}
              >
                <RequiredFormLabel label={"Asset Type"} />
                <Select {...register("assetTypeId")} placeholder="Select Type">
                  {assetCreationData?.assetTypes?.map((assetType) => (
                    <option key={assetType.id} value={assetType.id}>
                      {assetType.name}
                    </option>
                  ))}
                </Select>
                {errors.assetTypeId && (
                  <FormErrorMessage>
                    {errors.assetTypeId.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.assetManufacturerId}
              >
                <RequiredFormLabel label={"Asset Manufacturer"} />
                <Select
                  {...register("assetManufacturerId")}
                  placeholder="Select Type"
                >
                  {assetCreationData?.assetManufacturers?.map(
                    (assetManufacturer) => (
                      <option
                        key={assetManufacturer.id}
                        value={assetManufacturer.id}
                      >
                        {assetManufacturer.name}
                      </option>
                    )
                  )}
                </Select>
                {errors.assetManufacturerId && (
                  <FormErrorMessage>
                    {errors.assetManufacturerId.message}
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
                <FormLabel> Quantity </FormLabel>

                <Input
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseInt(inputValue); // Parse input as an integer
                    if (!isNaN(numericValue) || inputValue === "") {
                      setQuantity(isNaN(numericValue) ? 0 : numericValue); // Update the state directly
                    }
                  }}
                  onKeyPress={(e) => {
                    // Allow only numeric characters and certain control keys
                    const key = e.key;
                    const allowedKeys = [
                      "0",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                    ];
                    if (!allowedKeys.includes(key)) {
                      e.preventDefault();
                    }
                  }}
                  value={quantity ?? 0}
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

export default CreateAsset;
