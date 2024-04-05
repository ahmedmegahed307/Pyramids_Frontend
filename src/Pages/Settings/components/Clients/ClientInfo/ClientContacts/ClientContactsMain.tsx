import {
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Drawer,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
  Card,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import ContactsList from "./ContactsList";
import CreateContact, { CreateContactValidation } from "./CreateContact";
import DeleteContact from "./DeleteContact";

import UpdateContact, { UpdateContactValidation } from "./UpdateContact";
import useGetClientById from "../../../../../../hooks/Settings/Client/useGetClientById";
import useCreateContact from "../../../../../../hooks/Settings/Client/Contact/useCreateContact";
import usePageTitleStore from "../../../../../../hooks/NavBar/PageTitleStore";
import Contact from "../../../../../../models/Contact";
import IsLoading from "../../../../../GeneralComponents/IsLoading";
import IsError from "../../../../../GeneralComponents/IsError";
import useContactMutation from "../../../../../../hooks/Settings/Client/Contact/useContactMutation";

const ClientContactsMain = () => {
  // get contactsList
  const { id } = useParams();
  const { data: client, isLoading, isError } = useGetClientById(parseInt(id));

  //create
  const createModal = useDisclosure();
  const createContactQuery = useCreateContact(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: CreateContactValidation) => {
    createContactQuery.mutateAsync({
      name: data?.name,
      email: data?.email,
      phone: data?.phoneNumber,
      contactType: data?.contactType,
      siteId: parseInt(data?.siteId),
      clientId: client.id,
    });
  };

  //edit
  const editModal = useDisclosure();
  const [editContact, setEditContact] = useState<Contact>();

  const updateContactMutation = useContactMutation(() => {
    editContact.id ?? "";
  }, true);
  const handleUpdateForm = async (data: UpdateContactValidation) => {
    console.log("update contact", data);
    try {
      const updatedContact: Contact = {
        ...editContact,
        name: data?.name,
        email: data?.email,
        phone: data?.phoneNumber,
        contactType: data?.contactType,
        siteId: parseInt(data?.siteId),
        clientId: client.id,
      };
      await updateContactMutation.mutateAsync(updatedContact);
      editModal.onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteContactId, setDeleteContactId] = useState(0);
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Client Contacts");
  }, []);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <HStack w={"full"} mb={2}>
              <Heading size={"md"}>Client Contacts</Heading>
              <Spacer />
              <Button
                leftIcon={<AddIcon />}
                variant="solid"
                size="md"
                onClick={() => {
                  createModal.onOpen();
                }}
              >
                Add
              </Button>
            </HStack>
            <ContactsList
              data={client?.contacts ?? []}
              setDeleteContactId={setDeleteContactId}
              setEditContact={setEditContact}
              deleteModal={deleteModal}
              editModal={editModal}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Create Modal */}
      <Drawer
        onClose={createModal.onClose}
        isOpen={createModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <CreateContact
          customerSites={client.sites}
          onSubmit={handleCreateForm}
        />
      </Drawer>

      {/* Update modal  */}
      <Drawer
        onClose={editModal.onClose}
        isOpen={editModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <UpdateContact
          customerSites={client.sites}
          onSubmit={handleUpdateForm}
          defaultValue={editContact}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteContact
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        contactId={deleteContactId}
      />
    </Card>
  );
};

export default ClientContactsMain;
