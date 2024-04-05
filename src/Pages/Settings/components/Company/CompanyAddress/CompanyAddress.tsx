import {
  Flex,
  Heading,
  VStack,
  Box,
  Button,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UpdateAddress, { FormUpdateValidation } from "./UpdateAddress";
import Company from "../../../../../models/Company";
import CompanyRowSetting from "../CompanyRowSetting";
import { createAddress } from "../../../../../services/AddressService/addressService";
import useCompanyMutation from "../../../../../hooks/Settings/Company/useCompanyMutation";
import useAddressMutation from "../../../../../hooks/Settings/Company/Address/useAddressMutation";
import Address from "../../../../../models/Address";

interface props {
  company: Company;
}
const CompanyAddress = ({ company }: props) => {
  const editModal = useDisclosure();

  const updateCompanyMutation = useCompanyMutation(() => {
    company?.id ?? "";
  }, true);

  const updateAddressMutation = useAddressMutation(() => {
    company?.address?.id ?? "";
  }, true);

  const handleUpdateForm = async (data: FormUpdateValidation) => {
    if (company?.address === undefined) {
      var newAddress = await createAddress(data);
      console.log("New Address", newAddress);
      const updatedCompany: Company = {
        ...company,
        address: newAddress.data,
      };
      await updateCompanyMutation.mutateAsync(updatedCompany);
    } else {
      const updatedAddress: Address = {
        ...company?.address,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        country: data.country,
        postCode: data.postCode,
      };
      await updateAddressMutation.mutateAsync(updatedAddress);
    }
    editModal.onClose();
  };
  return (
    <>
      <Flex direction="column">
        <HStack mb={8}>
          <Spacer />
          <Button
            leftIcon={<EditIcon />}
            variant={"link"}
            onClick={() => {
              editModal.onOpen();
            }}
          >
            Edit Company details
          </Button>
        </HStack>

        <VStack justify={"center"} spacing={4}>
          <CompanyRowSetting
            label="Address Line 1"
            //user?.adresses?.[0]?.tel || ""
            value={company?.address?.addressLine1 || "-"}
          />
          <CompanyRowSetting
            label="Address Line 2"
            value={company?.address?.addressLine2 || "-"}
          />

          <CompanyRowSetting
            label="Country"
            value={company?.address?.country || "-"}
          />
          <CompanyRowSetting
            label="City"
            value={company?.address?.city || "-"}
          />
          <CompanyRowSetting
            label="PostCode"
            value={company?.address?.postCode || "-"}
          />
        </VStack>
      </Flex>

      {/* Update */}
      <Drawer
        onClose={editModal.onClose}
        isOpen={editModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <UpdateAddress onSubmit={handleUpdateForm} initialOriginal={company} />
      </Drawer>
    </>
  );
};

export default CompanyAddress;
