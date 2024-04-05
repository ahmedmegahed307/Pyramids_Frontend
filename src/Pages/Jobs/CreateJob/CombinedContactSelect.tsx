import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  //Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import useEngineer from "../../../hooks/Settings/User/useEngineer";
import User from "../../../models/User";
import { Select } from "chakra-react-select";
import { Label } from "recharts";
import Contact from "../../../models/Contact";
interface Props extends FormValidation {
  contacts: Contact[];
  selectedClientId: string;
  selectedSiteId: string;
  setSelectedContactId: (contactId: number) => void;
}
const CombinedContactSelect = ({
  errors,
  register,
  setSelectedContactId,
  contacts,
  selectedClientId,
  selectedSiteId,
}: Props) => {
  const [resetDropdown, setResetDropdown] = useState(false);

  useEffect(() => {
    // When selectedClientId or selectedSiteId changes, reset the dropdown
    setResetDropdown(true);
  }, [selectedClientId, selectedSiteId]);
  console.log("resetDropdown:", resetDropdown);
  const options = [
    { label: "Select Contact", value: 0 },
    ...(contacts?.map((contact) => ({
      label: contact?.name + " || " + contact?.email + " || " + contact?.phone,
      value: contact.id,
    })) || []),
  ];
  const handleContactChange = (selectedContact) => {
    setSelectedContactId(selectedContact.value);
  };

  return (
    <Select
      size={{
        base: "md",
        md: "md",
        lg: "lg",
      }}
      placeholder="Select Contact"
      useBasicStyles
      selectedOptionColorScheme="Primary"
      {...register("contactId")}
      options={options}
      onChange={handleContactChange}
      sx={{ backgroundColor: "red" }}
    />
  );
};

export default CombinedContactSelect;
