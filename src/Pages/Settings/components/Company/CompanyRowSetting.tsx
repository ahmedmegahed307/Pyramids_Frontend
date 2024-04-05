import { Box, Divider, HStack, Text } from "@chakra-ui/react";

interface SettingRowProps {
  label: string;
  value: any;
  icon?: any;
}

const CompanyRowSetting = ({ label, value, icon }: SettingRowProps) => (
  <>
    <HStack spacing={10} w={"full"}>
      <HStack w={"full"}>
        {" "}
        {icon}{" "}
        <Text w={"full"} textAlign={"start"} color={"#8D8D8D"}>
          {label}
        </Text>
      </HStack>
      <Text w={"full"} align={"start"} color={"#4B4B4B"} fontWeight={"bold"}>
        {value}{" "}
      </Text>
    </HStack>
  </>
);
export default CompanyRowSetting;
