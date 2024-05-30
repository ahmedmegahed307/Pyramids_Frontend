import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  HStack,
  Spacer,
  useDisclosure,
  Drawer,
  Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UpdateLogo from "./UpdateLogo";
import useAuthStore from "../../../../../hooks/Authentication/store";
import useGetCompanyById from "../../../../../hooks/Settings/Company/useGetCompanyById";
import Company from "../../../../../models/Company";
import useCompanyMutation from "../../../../../hooks/Settings/Company/useCompanyMutation";
import { ICompanyLogo } from "../../../../../models/Interfaces/ICompanyLogo";
import useCompanyLogoMutation from "../../../../../hooks/Settings/Company/CompanyLogo/useCompanyLogoMutation";
import LogoWithoutText from "../../../../../assets/icons/LogoWithoutText";
interface props {
  company: Company;
}

const CompanyLogo = ({ company }: props) => {
  const editModal = useDisclosure();
  const updateCompanyMutation = useCompanyLogoMutation();
  const handleUpdateForm = async (data: File) => {
    await updateCompanyMutation.mutateAsync({
      logo: data,
      companyId: company?.id ?? 0,
    });
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
            Update Company Logo
          </Button>
        </HStack>

        <Box mt={20} display="flex" justifyContent="center">
          <Image maxW={"70vw"} maxH={"70vh"} as={LogoWithoutText} alt="Logo" />
        </Box>
      </Flex>

      {/* Update */}
      <Drawer onClose={editModal.onClose} isOpen={editModal.isOpen} size={"lg"}>
        <UpdateLogo onSubmit={handleUpdateForm} />
      </Drawer>
    </>
  );
};

export default CompanyLogo;
