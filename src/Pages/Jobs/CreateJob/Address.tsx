import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  Textarea,
  FormErrorMessage,
  CardBody,
  Card,
  HStack,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
interface Props {
  siteAddress: string;
}
const Address = ({ siteAddress }: Props) => {
  console.log("siteAddress1", siteAddress);
  return (
    <FormControl pb={2}>
      <FormLabel>
        Address{" "}
        <Tooltip
          label="This is the address of the site you select. To edit it, go to the site's page in settings."
          background={"gray.50"}
          color={"teal.500"}
        >
          <Icon as={InfoOutlineIcon} w={4} h={4} color="gray.400" />
        </Tooltip>
      </FormLabel>
      <Card
        p={0}
        bg={"white"}
        variant={"filled"}
        w={"full"}
        h={{
          base: "80px",
          lg: "60px",
        }}
      >
        <CardBody
          p={2}
          borderRadius={6}
          border={"1px solid #E2E2E2"}
          color={"Neutral.500"}
        >
          {siteAddress}
        </CardBody>
      </Card>

      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
};

export default Address;
