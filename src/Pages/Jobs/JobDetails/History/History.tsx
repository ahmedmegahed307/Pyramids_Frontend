import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import JobAction from "../../../../models/JobAction";
import { Fragment } from "react";
import moment from "moment";
import { FaHistory } from "react-icons/fa";

interface Props {
  history: JobAction[];
}

const History = ({ history }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (history.length === 0)
    return (
      <Center h="200%" mt={20} mr={50}>
        <VStack spacing={4}>
          <Icon as={FaHistory} boxSize={8} color="gray.500" />
          <Text fontSize="xl" color="gray.500">
            No history available
          </Text>
        </VStack>
      </Center>
    );

  return (
    <>
      <VStack align="flex-start" fontSize={14}>
        {history.map((item, index) => {
          return (
            <Flex
              key={index}
              flexDirection={isMobile ? "column" : "row"}
              alignItems="start"
              justify="space-between"
              width={{
                base: "100%",
                lg: "60%",
              }}
              position={"relative"}
              mb={10}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name={
                    item?.createdByUser?.firstName +
                    " " +
                    item?.createdByUser?.lastName
                  }
                  src="https://bit.ly/broken-lisdsdsdnk"
                />
                <Text color="Neutral.600">
                  {item?.createdByUser?.firstName +
                    " " +
                    item?.createdByUser?.lastName}
                </Text>
              </HStack>
              <Text
                color="Neutral.600"
                width={{
                  base: "100%",
                  md: "30%",
                }}
                mt={isMobile ? 2 : 0}
              >
                {item.comments}
              </Text>
              <Text color="Neutral.500" mt={isMobile ? 2 : 0}>
                {moment(item?.actionDate).format("DD/MM/YYYY hh:mm a") ?? ""}
              </Text>
              {index !== history.length - 1 && (
                <Box height="30px" pl={4} position={"absolute"} bottom={-10}>
                  <Divider
                    borderColor="#BDBDBD"
                    orientation="vertical"
                    borderWidth="3px"
                    borderStyle={"none none none dotted"}
                  />
                </Box>
              )}
            </Flex>
          );
        })}
      </VStack>
    </>
  );
};

export default History;
