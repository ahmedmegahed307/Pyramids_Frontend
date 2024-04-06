import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Image,
  Text,
  Divider,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";

import bgImg from "../../../assets/img/burst-kUqqaRjJuw0-unsplash.png";
import phone from "../../../assets/img/call-calling-3.svg";
import chat from "../../../assets/img/messages-21.svg";
import email from "../../../assets/img/email-1.svg";
import email2 from "../../../assets/img/email-2.svg";
import document from "../../../assets/img/document-1.svg";

import { EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";

import { BsBuilding, BsForward } from "react-icons/bs";
import user from "../../../assets/img/user-1.svg";

import { FaUser } from "react-icons/fa";
import ArrowRight from "../../../assets/icons/ArrowRight";

function GetStarted() {
  return (
    <Flex w="100vw" h="100vh" backgroundColor="#F8F9FA">
      <Grid
        w="full"
        h="full"
        templateAreas={`"form links"`}
        gridTemplateColumns={"1fr 1fr"}
      >
        <GridItem bg="transparent" area={"form"} pt={30} px="100px" h="full">
          <HStack>
            <Divider
              orientation="vertical"
              h="60px"
              border="4px solid #E65100"
              borderRadius="10px"
              marginRight={5}
            />
            <Heading
              color="#292A2B"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="bold"
              fontSize="32px"
            >
              Get Started
            </Heading>
          </HStack>

          <Text
            color="#4B4B4B"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="light"
            marginTop={5}
          >
            Start your free 30-day trial today
          </Text>

          <VStack w="full" mt={5}>
            <HStack my={3} w="full">
              <SimpleGrid columns={2} w="full" spacing={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel>Full Name *</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Image src={user} mt={2} ml={2} boxSize="24px" />
                      </InputLeftElement>
                      <Input
                        h="50px"
                        type="text"
                        placeholder="John Smith"
                        _placeholder={{ color: "Neural.500", opacity: 0.7 }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Email *</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        {/* <EmailIcon color="gray.300" /> */}
                        <Image src={email2} mt={5} boxSize="24px" />
                      </InputLeftElement>
                      <Input
                        h="50px"
                        _placeholder={{ color: "Neural.500", opacity: 0.7 }}
                        type="email"
                        placeholder="ex: myname@example.com"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </HStack>

            <HStack my={3} w="full">
              <SimpleGrid columns={2} w="full" spacing={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel>Phone *</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <PhoneIcon color="gray.300" mt={4} />
                      </InputLeftElement>
                      <Input
                        type="tel"
                        h="50px"
                        _placeholder={{ color: "Neural.500", opacity: 0.7 }}
                        placeholder="(000) 0000 000"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Company Name *</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        mt={2}
                        opacity={0.7}
                      >
                        <BsBuilding color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        h="50px"
                        _placeholder={{ color: "Neural.500", opacity: 0.7 }}
                        placeholder="Company name"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </HStack>

            <HStack w="full">
              <SimpleGrid columns={2} w="full" spacing={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel>Number of Employees *</FormLabel>
                    <Select h={50}>
                      <option>1-5</option>
                      <option>5-10</option>
                      <option>11-15</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Industry *</FormLabel>
                    <Select
                      h={50}
                      _placeholder={{ color: "Neural.500", opacity: 0.7 }}
                      placeholder="Selected Industry"
                    >
                      <option>Gas</option>
                      <option>Electric</option>
                      <option>Plumbing</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </HStack>

            <FormControl>
              <FormLabel color="#495057">Message(optional)</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  paddingTop={5}
                  paddingLeft={5}
                >
                  <HStack w="full">
                    <Image src={document} boxSize="24px" />
                  </HStack>
                </InputLeftElement>
                <Textarea
                  paddingTop={5}
                  paddingLeft={10}
                  bgColor={"gray.50"}
                  _placeholder={{
                    color: "Neutral.500",
                    opacity: "0.7",
                    paddingLeft: "7px",
                  }}
                  placeholder="Enter Your Message"
                  rows={5}
                ></Textarea>
              </InputGroup>
            </FormControl>

            <VStack w="full" alignItems="start" mt={5}>
              <HStack spacing={0}>
                <Button
                  borderRadius={5}
                  backgroundColor="#33BCC5"
                  color="#FFFFFF"
                  h="40px"
                >
                  Submit
                </Button>

                <Button
                  borderRadius={7}
                  borderLeftRadius={"none"}
                  border="none"
                  color="white"
                  h={"40px"}
                  _hover={{ bgColor: "none" }}
                  bg={"#E65100"}
                  cursor="pointer"
                  rightIcon={<ArrowRight />}
                  size="md"
                  ml={-1}
                ></Button>
              </HStack>
              <Text fontSize="12px" color="#8692A6">
                <LockIcon /> Your info is safely secured
              </Text>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem
          bgImage={bgImg}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          area={"links"}
          clipPath="polygon(18% 0, 100% 0, 100% 100%, 0 100%, 30% 30%)"
        >
          <VStack
            bg="linear-gradient(94.71deg, #006066 5.68%, rgba(1, 139, 148, 0.67) 99.14%)"
            w="full"
            h="full"
            alignItems="center"
            justifyContent="end"
            p="120px"
            pl="300px"
          >
            <Box
              w="full"
              h="110px"
              border="3px dashed #FFFFFF45"
              bg="transparent"
              p={2}
            >
              <HStack
                w="full"
                h="full"
                justifyContent="start"
                pl={16}
                backgroundColor="#FFFFFF45"
              >
                <Image src={phone} boxSize="40px" />
                <VStack align={"start"}>
                  <Text
                    color="#FFFFFF"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontSize="16px"
                  >
                    Let's Talk
                  </Text>
                  <Text
                    color="#FFFFFF"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="bold"
                    fontSize="16px"
                  >
                    +44 7553 135 940
                  </Text>
                </VStack>
              </HStack>
            </Box>
            <Box
              w="full"
              h="80px"
              border="3px dashed #FFFFFF45"
              bg="transparent"
              p={2}
            >
              <HStack
                w="full"
                h="full"
                pl={16}
                justifyContent="start"
                backgroundColor="#FFFFFF45"
              >
                <Image src={chat} boxSize="40px" />
                <Text
                  color="#FFFFFF"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="bold"
                  fontSize="16px"
                >
                  Live chat
                </Text>
              </HStack>
            </Box>
            <Box
              w="full"
              h="80px"
              border="3px dashed #FFFFFF45"
              bg="transparent"
              p={2}
            >
              <HStack
                w="full"
                h="full"
                pl={16}
                justifyContent="start"
                backgroundColor="#FFFFFF45"
              >
                <Image src={email} boxSize="40px" />
                <Text
                  color="#FFFFFF"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="bold"
                  fontSize="16px"
                >
                  Send Us Email
                </Text>
              </HStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default GetStarted;
