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
import UpdateClientDetails, {
  FormUpdateValidation,
} from "./UpdateClientDetails";
import Client from "../../../../../../models/Client";
import UserRowSetting from "../../../Users/UserInfo/UserRowSetting";
import useClientMutation from "../../../../../../hooks/Settings/Client/useClientMutation";

export interface clientProps {
  client: Client | undefined;
  isPortalAccess?: boolean;
}
const ClientDetails = ({ client, isPortalAccess }: clientProps) => {
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
        code: data.code,
        name: data.clientName,
        primaryContactEmail: data.primaryContactEmail,
        primaryContactPhone: data.primaryContactPhone,
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
          <UserRowSetting label="Client Code" value={client?.code || ""} />
          <UserRowSetting label="Client Name" value={client?.name || ""} />

         
          <UserRowSetting
            label="Primary Contact Email"
            value={client?.primaryContactEmail || ""}
          />
          <UserRowSetting
            label="Primary Contact Phone"
            value={client?.primaryContactPhone || ""}
          />
        </VStack>
      </Flex>
      {/* Update */}
      <Drawer onClose={editModal.onClose} isOpen={editModal.isOpen} size={"lg"}>
        <UpdateClientDetails
          onSubmit={handleUpdateForm}
          initialOriginal={client ?? undefined}
        />
      </Drawer>
    </>
  );
};

export default ClientDetails;
