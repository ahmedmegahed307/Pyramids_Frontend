import {
  Box,
  Divider,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface SettingRowProps {
  label: string;
  value: string | number;
  icon?: any;
}

const JobRowSetting = ({ label, value, icon }: SettingRowProps) => {
  const labelWidth = useBreakpointValue({ base: "40%", md: "20%" });
  return (
    <>
      <HStack w={"full"}>
        <HStack w={labelWidth}>
          {icon}
          <Text textAlign={"start"} color={"#8D8D8D"}>
            {label}
          </Text>
        </HStack>
        <Text
          fontSize={{ base: "sm", md: "13px" }}
          align={"start"}
          color={"Neural.700"}
          fontWeight={600}
          fontStyle={"normal"}
        >
          {value}
        </Text>
      </HStack>
    </>
  );
};

export default JobRowSetting;
