import {
  Flex,
  VStack,
  Button,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
  Divider,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UpdateCompany, { FormUpdateValidation } from "./UpdateCompany";
import CompanyRowSetting from "../CompanyRowSetting";

import Company from "../../../../../models/Company";
import useCompanyMutation from "../../../../../hooks/Settings/Company/useCompanyMutation";
interface props {
  company: Company;
}
const CompanyDetails = ({ company }: props) => {
  const editModal = useDisclosure();

  const updateCompanyMutation = useCompanyMutation(() => {
    company?.id ?? "";
  }, true);
  const handleUpdateForm = async (data: FormUpdateValidation) => {
    console.log("data::", data);
    try {
      const updatedCompany: Company = {
        ...company,
        email: data.email,
        name: data.name,
        phone: data.phone,
        fax: data.fax,
        isSendPostWorkSurvey: data.isSendPostWorkSurvey,
        isSignatureRequired: data.isSignatureRequired,
        websiteUrl: data.websiteUrl,
        clientPortalUrl: data.clientPortalUrl,
        primaryIndustry: data.primaryIndustry,
      };
      await updateCompanyMutation.mutateAsync(updatedCompany);
      editModal.onClose();
    } catch (error) {
      console.error("Error updating user:", error);
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
          <CompanyRowSetting label="Company Name" value={company?.name || ""} />
          <CompanyRowSetting label=" Email" value={company?.email || ""} />
          <CompanyRowSetting label="Phone" value={company?.phone || ""} />
          <CompanyRowSetting label="Fax" value={company?.fax || ""} />
          <CompanyRowSetting
            label=" Send Post Work Survery"
            value={company?.isSendPostWorkSurvey ? "Yes" : "No"}
          />
          <CompanyRowSetting
            label="Signatures Required"
            value={company?.isSignatureRequired ? "Yes" : "No"}
          />

          <CompanyRowSetting
            label="Company Website"
            value={company?.websiteUrl || ""}
          />
          <CompanyRowSetting
            label="Client Portal"
            value={company?.clientPortalUrl || ""}
          />
          <CompanyRowSetting
            label="Primary Industry"
            value={company?.primaryIndustry || ""}
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
        <UpdateCompany onSubmit={handleUpdateForm} initialOriginal={company} />
      </Drawer>
    </>
  );
};

export default CompanyDetails;
