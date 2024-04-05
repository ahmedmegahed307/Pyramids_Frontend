"use client";

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  Image,
  ListIcon,
  Button,
  Divider,
  Center,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import basic from "../../assets/icons/price-basic.svg";
import premium from "../../assets/icons/price-premium.svg";
import enterprise from "../../assets/icons/price-enterprise.svg";
import CheckedCircle from "../../assets/icons/CheckedCircle";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      shadow="base"
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={5}
      w={300}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  return (
    <Box py={16} bg={"white"}>
      <VStack spacing={2} textAlign="center" mb={5}>
        <Heading as="h1" fontSize="4xl">
          Pricing plans that suit you
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Take a look at our three main packages
        </Text>
        <Box p={2} bg={"#F0F0F0"} w={"300px"}>
          <HStack spacing={5}>
            <Button
              w={"50%"}
              borderRadius={5}
              h={14}
              bg={"Primary.700"}
              color={"white"}
            >
              Monthly
            </Button>
            <Button
              w={"50%"}
              borderRadius={5}
              h={14}
              bg={"none"}
              color={"black"}
            >
              Yearly
            </Button>
          </HStack>
        </Box>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        mx={{ base: 10, md: 4, lg: 10 }}
        textAlign="center"
        justify="center"
        alignItems={{
          base: "center",
        }}
        spacing={{ base: 4, md: 2, lg: 10 }}
      >
        <PriceWrapper>
          <HStack spacing={4} p={10}>
            <Image src={basic} alt="Basic" boxSize={12} />
            <VStack spacing={0}>
              <Heading>Basic</Heading>
              <Text color={"gray.500"}>Starter Plan</Text>
            </VStack>
          </HStack>
          <Divider mt={-2} color={"#D8D8D8"} style={{ borderWidth: 1 }} />
          <VStack
            borderRadius={10}
            align={"start"}
            m={4}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={5} textAlign="start" pl={4} fontWeight={"bold"}>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Client Management System</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Scheduler</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Client Portal</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>SLA Settings</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Invoicing Reports</Text>
              </HStack>
            </List>
            <Text textAlign={"center"} color={"gray.500"} my={5}>
              Book a demo to check out the rest of the features in this plan
            </Text>
            <Box pl={16}>
              <Heading pl={5}>£100</Heading>

              <Text fontSize={"12px"} color={"gray.500"} pl={5}>
                Free trial for 30 days.
              </Text>
              <Text
                fontSize={"12px"}
                color={"gray.500"}
                align={"start"}
                pl={5}
                pb={1}
              >
                Up to 5 users
              </Text>
              <Button w={"120%"} borderRadius={5} h={12}>
                Sign Up for free
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <Box
          shadow="base"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          borderRadius={5}
          w={300}
          background={
            "linear-gradient(15deg, #FFF 21.37%, rgba(218, 253, 255, 0.83) 91.37%)"
          }
        >
          <HStack spacing={4} p={10}>
            <Image src={basic} alt="Basic" boxSize={12} />
            <VStack spacing={0}>
              <Heading>Premium</Heading>
              <Text color={"gray.500"}>For the best results</Text>
            </VStack>
          </HStack>
          <Divider mt={-2} color={"#D8D8D8"} style={{ borderWidth: 1 }} />
          <VStack
            borderRadius={10}
            align={"start"}
            m={4}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={5} textAlign="start" pl={4} fontWeight={"bold"}>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Client Management System</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Scheduler</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>SLA Settings</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Planned Preventative Maintenance</Text>
              </HStack>

              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Reports Generator</Text>
              </HStack>
            </List>
            <Text textAlign={"center"} color={"gray.500"} my={5}>
              Book a demo to check out the rest of the features in this plan
            </Text>
            <Box pl={16}>
              <Heading pl={5}>£180</Heading>

              <Text fontSize={"12px"} color={"gray.500"} pl={5}>
                Per month
              </Text>
              <Text
                fontSize={"12px"}
                color={"gray.500"}
                align={"start"}
                pl={5}
                pb={1}
              >
                Up to 10 users
              </Text>
              <Button w={"120%"} borderRadius={5} h={12}>
                Get started
              </Button>
            </Box>
          </VStack>
        </Box>

        <PriceWrapper>
          <HStack spacing={4} p={10}>
            <Image src={enterprise} alt="Basic" boxSize={12} />
            <VStack spacing={0} align={"start"}>
              <Heading>Enterprise</Heading>
              <Text color={"gray.500"}>Most popular</Text>
            </VStack>
          </HStack>
          <Divider mt={-2} color={"#D8D8D8"} style={{ borderWidth: 1 }} />
          <VStack
            borderRadius={10}
            align={"start"}
            m={4}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={5} textAlign="start" pl={4} fontWeight={"bold"}>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Limited Projects</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Scheduler</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Automatic Client Notifications</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>Routing</Text>
              </HStack>
              <HStack spacing={3}>
                <Image as={CheckedCircle} alt="CheckedCircle" boxSize={5} />
                <Text>App Marketplace</Text>
              </HStack>
            </List>
            <Text textAlign={"center"} color={"gray.500"} my={5}>
              Book a demo to check out the rest of the features in this plan
            </Text>
            <Box pl={16}>
              <Heading pl={5}>£320</Heading>

              <Text fontSize={"12px"} color={"gray.500"} pl={5}>
                Per month
              </Text>
              <Text
                fontSize={"12px"}
                color={"gray.500"}
                align={"start"}
                pl={5}
                pb={1}
              >
                Up to 20 users
              </Text>
              <Button w={"120%"} borderRadius={5} h={12}>
                Get started
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
