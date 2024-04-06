import {
  Box,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaLocationArrow, FaSearchLocation } from "react-icons/fa";
import ContactUsForm from "./ContactUsForm";
import ContactUsFooter from "./ContactUsFooter";
import HomePageHeading from "../HomePageHeading";
import backgroundImg from "../../../assets/img/img-contact.png";
import email from "../../../assets/img/email-2.svg";

const ContactUs = () => {
  return (
    <>
      <HomePageHeading
        heading="Contact Us"
        route="contactUs"
        backgroundImageName={backgroundImg}
      />

      <Flex
        as="section"
        w="full"
        minH="100vh"
        backgroundColor="#F8F9FA"
        flexDir={{ base: "column", md: "column" }}
        paddingTop={{ base: "20px", md: "100px" }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          spacing={5}
          backgroundColor="#F8F9FA"
          justifyItems={"center"}
        >
          <GridItem
            backgroundColor="#F8F9FA"
            paddingLeft={{ base: "20px", md: "150px" }}
            paddingRight={{ base: "20px", md: "150px" }}
            paddingBottom={{ base: "20px", md: "35px" }}
          >
            <Box borderLeft={"8px solid #E65100"} padding="10" w="full">
              <Heading
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="700"
              >
                Get In Touch
              </Heading>
            </Box>
            <Box
              paddingTop="10px"
              marginTop={5}
              paddingBottom="35px"
              borderBottom="1px dashed #6C757D"
              w="full"
            >
              <Text
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="light"
                color="#6C757D"
              >
                Fill out your details below to start your free trail
              </Text>
            </Box>
            <Box padding="10px" w="full" borderBottom="1px dashed #6C757D">
              <HStack w="full">
                <img src={email} alt="Email" />

                <Text fontSize="16px" color="#A6ABAF">
                  email
                </Text>
              </HStack>
              <Text marginTop={3} color="#6C757D" ml={7}>
                support@pyramids.com
              </Text>
            </Box>
            <Box padding="10px" w="full" borderBottom="1px dashed #6C757D">
              <HStack w="full">
                <PhoneIcon fontSize="16px" color="#A6ABAF" />
                <Text fontSize="16px" color="#A6ABAF">
                  phone
                </Text>
              </HStack>
              <Text marginTop={3} ml={7} color="#6C757D">
                888-265-125
              </Text>
            </Box>
            <Box padding="10px" w="full">
              <HStack w="full">
                <FaSearchLocation fontSize="16px" color="#A6ABAF" />
                <Text fontSize="16px" color="#A6ABAF">
                  Based In
                </Text>
              </HStack>
              <Text marginTop={3} ml={7} color="#6C757D">
                Unit 5, Leopardstown Office Park Sandyford Dublin 18, Ireland
              </Text>
            </Box>
          </GridItem>
          <GridItem
            paddingLeft={{ base: "20px", md: "50px" }}
            paddingRight={{
              base: "20px",
              md: "50px",
              lg: "150px",
            }}
            paddingBottom={{ base: "20px", md: "35px" }}
          >
            <Box
              // w="687px"
              w={{
                base: "400px",
                md: "450px",
                lg: "500px",
                xl: "687px",
              }}
              h="635px"
              backgroundColor="#FFFFFF"
              borderRadius="5px"
              paddingTop="60px"
              paddingX={{ base: "20px", md: "30px" }}
              paddingBottom={{ base: "20px", md: "60px" }}
            >
              <ContactUsForm />
            </Box>
          </GridItem>
        </SimpleGrid>
      </Flex>
      <ContactUsFooter />
    </>
  );
};

export default ContactUs;
