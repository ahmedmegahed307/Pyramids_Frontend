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

import UpdateClientFinancial, {
  FormUpdateValidation,
} from "./UpdateClientFinancial";
import Client from "../../../../../../models/Client";
import UserRowSetting from "../../../Users/UserInfo/UserRowSetting";
import useClientMutation from "../../../../../../hooks/Settings/Client/useClientMutation";
export interface clientProps {
  client: Client | undefined;
  isPortalAccess?: boolean;
}
const ClientFinancial = ({ client, isPortalAccess }: clientProps) => {
  //update user
  const editModal = useDisclosure();
  const updateClientMutation = useClientMutation(() => {
    const id = client?.id ?? "";
  }, true);
  const handleUpdateForm = async (data: FormUpdateValidation) => {
    console.log("Update client info:", data);
    try {
      const updatedClient: Client = {
        ...client,
        primaryFinancialName: data.financialContactName,
        primaryFinancialEmail: data.financialContactEmail,
        siteType: data.siteType,
        currency: data.currency,
        vatNumber: data.vatNumber,
        vatRate: data.vatRate,
        vatValue: data.vatValue,
      };
      await updateClientMutation.mutateAsync(updatedClient);
      editModal.onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Flex direction="column">
        {!isPortalAccess && (
          <HStack mb={8}>
            <Spacer />
            <Button
              leftIcon={<EditIcon />}
              variant={"link"}
              onClick={() => {
                editModal.onOpen();
              }}
            >
              Edit Client Details
            </Button>
          </HStack>
        )}

        <VStack justify={"center"}>
          <UserRowSetting
            label="FINANCIAL CONTACT NAME"
            value={client?.primaryFinancialName || ""}
          />
          <UserRowSetting label="Client NAME" value={client?.name || ""} />

          <UserRowSetting
            label="FINANCIAL CONTACT EMAIL"
            value={client?.primaryFinancialEmail || ""}
          />
          <UserRowSetting
            label="CLIENT TYPE"
            value={client?.siteType?.toUpperCase() || ""}
          />
          <UserRowSetting
            label="CURRENCY"
            value={client?.currency?.toUpperCase() || ""}
          />
          <UserRowSetting label="VAT NUMBER" value={client?.vatNumber || ""} />
          <UserRowSetting
            label="VAT RATE"
            value={client?.vatRate?.toUpperCase() || ""}
          />
          <UserRowSetting label="VAT VALUE" value={client?.vatValue || ""} />
        </VStack>
      </Flex>
      {/* Update */}
      <Drawer onClose={editModal.onClose} isOpen={editModal.isOpen} size={"lg"}>
        <UpdateClientFinancial
          onSubmit={handleUpdateForm}
          initialOriginal={client ?? undefined}
        />
      </Drawer>
    </>
  );
};

export default ClientFinancial;
