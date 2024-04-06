import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import useGetSitesByClientId from "../../../hooks/Settings/Client/Site/useGetSitesByClientId";
import useCreateContact from "../../../hooks/Settings/Client/Contact/useCreateContact";
interface Props {
  createClientContactModal: any;
  selectedClientId: number;
}
const CreateClientContact = ({
  createClientContactModal,
  selectedClientId,
}: Props) => {
  const {
    data: clientSites,
    isLoading,
    isError,
  } = useGetSitesByClientId(selectedClientId);
  const [clientContact, setClientContact] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    siteId: "",
    contactType: "",
  });
  const [isValid, setIsValid] = useState(true);
  const createContactQuery = useCreateContact(() => {
    createClientContactModal.onClose();
  });
  const handleSubmit = () => {
    if (
      clientContact.name === "" ||
      clientContact.email === "" ||
      clientContact.phoneNumber === "" ||
      clientContact.contactType === ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
      createContactQuery.mutateAsync({
        name: clientContact?.name,
        email: clientContact?.email,
        phone: clientContact?.phoneNumber,
        contactType: clientContact?.contactType,
        siteId: parseInt(clientContact?.siteId),
        clientId: selectedClientId,
      });
    }
  };

  return (
    <Modal
      isOpen={createClientContactModal.isOpen}
      onClose={createClientContactModal.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="Primary.700">Create Client Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <RequiredFormLabel label={"Name"} />
            <Input
              onChange={(e) => {
                setClientContact({ ...clientContact, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl mt={2}>
            <RequiredFormLabel label={"Email"} />
            <Input
              onChange={(e) => {
                setClientContact({ ...clientContact, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl mt={2}>
            <RequiredFormLabel label="Phone Number"></RequiredFormLabel>
            <Input
              placeholder="Enter phone number"
              onChange={(e) => {
                setClientContact({
                  ...clientContact,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Site Name</FormLabel>

            <Select placeholder="Select Site Name">
              {clientSites?.map((site, index: number) => (
                <option key={index} value={site?.id || ""}>
                  {site?.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={2}>
            <RequiredFormLabel label="Contact Type"></RequiredFormLabel>
            <Select
              placeholder="Select Contact Type"
              onChange={(e) => {
                setClientContact({
                  ...clientContact,
                  contactType: e.target.value,
                });
              }}
            >
              <option value="SITE">Site</option>
              <option value="PRIMARY">Primary</option>
              <option value="PRIMARYSITE">Primary Site</option>
            </Select>
          </FormControl>
        </ModalBody>
        {!isValid && (
          <p style={{ color: "red", marginLeft: "20px" }}>
            Please fill out all required fields
          </p>
        )}

        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={createClientContactModal.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateClientContact;
