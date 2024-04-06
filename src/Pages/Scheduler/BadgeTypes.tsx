import { Badge, HStack } from "@chakra-ui/react";
import React from "react";

const BadgeTypes = () => {
  return (
    <HStack p={2} pl={6} mb={-5} spacing={1}>
      <Badge
        variant={"subtle"}
        borderRadius={"5px"}
        px={5}
        py={1.5}
        color={"#01565B"}
        background={"#c7c9cd"}
      >
        A/L
      </Badge>
      <Badge
        variant={"subtle"}
        borderRadius={"5px"}
        px={5}
        py={1.5}
        color={"#01565B"}
        background="#cc6751"
      >
        Meeting
      </Badge>
      <Badge
        variant={"subtle"}
        borderRadius={"5px"}
        px={5}
        py={1.5}
        color={"#01565B"}
        background="#f28f6b"
      >
        Job
      </Badge>
    </HStack>
  );
};

export default BadgeTypes;
