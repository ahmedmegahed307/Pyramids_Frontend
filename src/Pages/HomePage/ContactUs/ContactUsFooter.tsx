import {
  Box,
  Center,
  Divider,
  Flex,
  GridItem,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import logo from "../../../assets/img/logo-1.svg";
import { BsTelephone } from "react-icons/bs";
import { EmailIcon } from "@chakra-ui/icons";
import logo1 from "../../../assets/img/logo1";
import { LogoSVG } from "../../../assets/icons/logoSVG";
import HomePageLogo from "../../../assets/img/HomePageLogo";

export default function ContactUsFooter() {
  return (
    <Flex
      flexDir="column"
      backgroundColor="#000000"
      px={{ base: "50px", md: "140px" }}
    >
      <Flex flexDirection={{ base: "column", md: "row" }} marginY="41px">
        <Box my={6} mr={6}>
          <Image as={HomePageLogo} />
        </Box>
        <Spacer />
        <Flex
          direction={{ base: "column", md: "column", lg: "row" }}
          fontSize={{
            base: "xl",
          }}
        >
          <HStack
            mr={4}
            my={{
              base: "20px",
            }}
          >
            <BsTelephone style={{ color: "#E7E7E7" }} />
            <Text color="#E7E7E7">+44 7553 135 940</Text>
          </HStack>
          <HStack
            my={{
              base: "5px",
            }}
          >
            <EmailIcon color="#E7E7E7" />
            <Text color="#E7E7E7">support@pyramids.com</Text>
          </HStack>
        </Flex>
      </Flex>

      <Divider
        borderBottomWidth={1}
        borderStyle={"solid"}
        borderColor={"gray.500"}
      />

      <HStack>
        <Heading
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="light"
          color="#FFFFFF"
          marginY="34px"
          fontSize="28.8px"
        >
          Office address
        </Heading>
      </HStack>

      <Flex
        flexWrap={{
          base: "wrap",
          md: "nowrap",
        }}
        w={"100%"}
        gap={2}
      >
        <Box w={{ base: "100%", md: "20%" }} mb="20px">
          <Text
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            color="#FFFFFF"
            fontSize="22px"
            marginBottom="2"
          >
            Ireland
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Unit 5, Leopardstown Office Park
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Sandyford Dublin 18,
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Ireland
          </Text>
          <Text>.</Text>
        </Box>
        <Box w={{ base: "100%", md: "20%" }} mb="20px">
          <Text
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            color="#FFFFFF"
            fontSize="22px"
            marginBottom="2"
          >
            Poland
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Ul, Olawska 27-29
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            pietro 3, pok, 2, 50-123
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Wroclaw, Poland
          </Text>
          <Text>.</Text>
        </Box>
        <Box w={{ base: "100%", md: "20%" }} mb="20px">
          <Text
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            color="#FFFFFF"
            fontSize="22px"
            marginBottom="2"
          >
            United Kingdom
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Innovation Centre, Gallows Hill
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Warwick, CV 346 UW,
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            United Kingdom
          </Text>
          <Text>.</Text>
        </Box>
        <Box w={{ base: "100%", md: "20%" }} mb="20px">
          <Text
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            color="#FFFFFF"
            fontSize="22px"
            marginBottom="2"
          >
            Ghana
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            City Galleria Mall, Airport City,
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            GL-152-5922 Spintex Road,
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            FO7B office number
          </Text>
          <Text>.</Text>
        </Box>
        <Box w={{ base: "100%", md: "20%" }} mb="20px">
          <Text
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            color="#FFFFFF"
            fontSize="22px"
            marginBottom="2"
          >
            Turkey
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            PO Box 53513, Wierda Park
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Centurion 0149
          </Text>
          <Text fontSize="14px" color="#E7E7E7">
            Istanbul, Turkey
          </Text>
          <Text>.</Text>
        </Box>
      </Flex>

      <Divider
        borderBottomWidth={1}
        borderStyle={"solid"}
        borderColor={"gray.500"}
      />

      <Flex justifyContent={"center"} marginY="41px">
        <Text fontSize="14px" fontWeight="400" color="#FFFFFF">
          © UK Field Service 2024 - All Rights Reserved
        </Text>
      </Flex>
    </Flex>
  );
}
