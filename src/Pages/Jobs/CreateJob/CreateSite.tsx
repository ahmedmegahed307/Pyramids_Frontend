import {
  FormControl,
  FormLabel,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  AbsoluteCenter,
  Heading,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import Site from "../../../models/Site";
import useCreateSite from "../../../hooks/Settings/Client/Site/useCreateSite";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
interface SiteProps {
  createSiteModal: any;
  selectedClientId?: number;
}
const CreateSite = ({ createSiteModal, selectedClientId }: SiteProps) => {
  const [createSite, setCreateSite] = useState<Site>({
    name: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postCode: "",
  });

  const createSiteQuery = useCreateSite(() => {
    createSiteModal.onClose();
  });

  const validateForm = () => {
    const errors = {
      name: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postCode: "",
    };

    if (createSite.name === "") {
      errors.name = "Site Name is required";
    }
    if (createSite.contactName === "") {
      errors.contactName = "Contact Name is required";
    }
    if (createSite.contactEmail === "") {
      errors.contactEmail = "Contact Email is required";
    }
    if (createSite.contactPhone === "") {
      errors.contactPhone = "Contact Phone is required";
    }
    if (createSite.addressLine1 === "") {
      errors.addressLine1 = "Address Line 1 is required";
    }

    if (createSite.city === "") {
      errors.city = "City is required";
    }

    setFormErrors(errors);
    const isValid = Object.values(errors).every((error) => error === "");
    return isValid;
  };

  const handleSiteCreate = () => {
    if (validateForm()) {
      createSiteQuery.mutate({
        ...createSite,
        clientId: selectedClientId,
      });
    }
  };
  return (
    <Drawer
      onClose={createSiteModal.onClose}
      isOpen={createSiteModal.isOpen}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <AbsoluteCenter overflowY="auto" p={5} maxH={"700px"}>
            <>
              <Heading size={"md"}>Create New Site</Heading>
              <Divider my={5} />
              <FormControl pb={5} w={"md"}>
                <RequiredFormLabel label={"Site Name"} />

                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      name: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.name && (
                  <span style={{ color: "red" }}>{formErrors.name}</span>
                )}
              </FormControl>
              <FormControl pb={5} w={"md"}>
                <RequiredFormLabel label={"Contact Name"} />

                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      contactName: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.contactName && (
                  <span style={{ color: "red" }}>{formErrors.contactName}</span>
                )}
              </FormControl>
              <FormControl pb={5} w={"md"}>
                <RequiredFormLabel label={"Site Email"} />
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      contactEmail: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.contactEmail && (
                  <span style={{ color: "red" }}>
                    {formErrors.contactEmail}
                  </span>
                )}
              </FormControl>

              <FormControl w={"md"}>
                <RequiredFormLabel label={"Phone"} />
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      contactPhone: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.contactPhone && (
                  <span style={{ color: "red" }}>
                    {formErrors.contactPhone}
                  </span>
                )}
              </FormControl>

              <FormControl pb={5} w={"md"}>
                <RequiredFormLabel label={"Address Line 1"} />
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      addressLine1: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.addressLine1 && (
                  <span style={{ color: "red" }}>
                    {formErrors.addressLine1}
                  </span>
                )}
              </FormControl>

              <FormControl pb={5} w={"md"}>
                <FormLabel> Address Line 2 </FormLabel>
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      addressLine2: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
              </FormControl>
              <FormControl pb={5} w={"md"}>
                <RequiredFormLabel label={"City"} />
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      city: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
                {formErrors.city && (
                  <span style={{ color: "red" }}>{formErrors.city}</span>
                )}
              </FormControl>
              <FormControl pb={5} w={"md"}>
                <FormLabel> Postcode</FormLabel>
                <Input
                  onChange={(e) => {
                    return setCreateSite({
                      ...createSite,
                      postCode: e.target.value,
                    });
                  }}
                  className="FormControl"
                  placeholder=""
                />
              </FormControl>
              <Button onClick={handleSiteCreate} w={"full"} my={10}>
                Save
              </Button>
            </>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateSite;
