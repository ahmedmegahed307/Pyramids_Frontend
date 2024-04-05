import {
  Flex,
  VStack,
  Button,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UpdateFinancial, { FormUpdateValidation } from "./UpdateFinancial";
import CompanyRowSetting from "../CompanyRowSetting";
import Company from "../../../../../models/Company";
import useCompanyMutation from "../../../../../hooks/Settings/Company/useCompanyMutation";
interface props {
  company: Company;
}

const FinancialDetails = ({ company }: props) => {
  const editModal = useDisclosure();

  const updateCompanyMutation = useCompanyMutation(() => {
    company?.id ?? "";
  }, true);
  const handleUpdateForm = async (data: FormUpdateValidation) => {
    console.log("data::", data);
    try {
      const updatedCompany: Company = {
        ...company,

        vatNumber: data.vatNumber,
        paymentTerm: data.paymentTerm,
        currency: data.currency,
        taxable: data.taxable,
        normalWorkingHours: data.normalHours,
        normalHourlyRate: parseInt(data.normalHourlyRate),
        overTimeWorkingHours: data.overtimeHours,
        overtimeHourlyRate: parseInt(data.overtimeHourlyRate),
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
            Edit Financial Details
          </Button>
        </HStack>

        <VStack justify={"center"} spacing={4}>
          <CompanyRowSetting
            label="Vat Number"
            value={company?.vatNumber || ""}
          />
          <CompanyRowSetting
            label="Payment Term"
            value={company?.paymentTerm || ""}
          />
          <CompanyRowSetting label="Currency" value={company?.currency || ""} />
          <CompanyRowSetting
            label="Taxable"
            value={company?.taxable ? "Yes" : "No"}
          />
          <CompanyRowSetting
            label="Normal Working Hours"
            value={company?.normalWorkingHours || ""}
          />
          <CompanyRowSetting
            label="Normal Hourly Rates"
            value={company?.normalHourlyRate || ""}
          />
          <CompanyRowSetting
            label="Overtime (X2) Working Hours"
            value={company?.overTimeWorkingHours || ""}
          />
          <CompanyRowSetting
            label="Overtime (X2) Hourly Rates"
            value={company?.overtimeHourlyRate || ""}
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
        <UpdateFinancial
          onSubmit={handleUpdateForm}
          initialOriginal={company}
        />
      </Drawer>
    </>
  );
};

export default FinancialDetails;
