import { FormLabel } from "@chakra-ui/react";
import React from "react";
interface Props {
  label: any;
}
const RequiredFormLabel = ({ label }: Props) => {
  return (
    <FormLabel>
      {label} <span style={{ color: "red" }}>*</span>
    </FormLabel>
  );
};

export default RequiredFormLabel;
