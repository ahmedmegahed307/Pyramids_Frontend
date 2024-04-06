import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  HStack,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Image,
  Text,
  Divider,
  Spacer,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bgImg from "../../../assets/img/photographer-plater-1.png";
import logo from "../../../assets/img/logo-1.svg";
import ContactUsFooter from "../ContactUs/ContactUsFooter";

function BookADemoPage() {
  return (
    <>
      <Flex
        as="section"
        w="full"
        h="431.89px"
        backgroundImage={bgImg}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <VStack
          style={{
            background:
              "linear-gradient(88.44deg, #004549 19.18%, rgba(1, 139, 148, 0.67) 97.65%)",
          }}
          w={"full"}
          p="84px"
        >
          <HStack w="full" as={Link} to="/homePage">
            <Image src={logo} w="43.85px" h="25.95px" />
            <Text
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="700"
              color="#FFFFFF;"
            >
              Pyramids
            </Text>
          </HStack>

          <HStack w="full" mt={10} justifyContent="start" alignItems="start">
            <VStack w="full" alignItems="start">
              <HStack w="full" alignItems="start" justifyContent="start">
                <Divider
                  h="80px"
                  border="6px solid #cc6751"
                  borderRadius="10px"
                  marginRight={5}
                  orientation="vertical"
                />
                <VStack w="full" alignItems="start" justify="center">
                  <Heading
                    color="#FFFFFF"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="700"
                  >
                    Book Your UK Field
                  </Heading>
                  <Heading
                    color="#FFFFFF"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="700"
                  >
                    Service Demo
                  </Heading>
                  <Breadcrumb
                    spacing="8px"
                    separator={<ChevronRightIcon color="gray.500" />}
                    mt={5}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink as={Link} to="/homePage" color="#CED4DA">
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <BreadcrumbLink as={Link} to="/bookADemo" color="#FFFFFF">
                        Book a demo
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </VStack>
              </HStack>
            </VStack>

            <Spacer />

            <VStack w="full" alignItems="end" justifyContent="start">
              <Text
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="light"
                color="#FFFFFF;"
                fontSize="18px"
                lineHeight="40px"
              >
                Book a Demo and talk with our customer onboarding <br />{" "}
                specialists and see how Pyramids could fit into <br /> your
                field service business and operation.
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Flex>

      <Flex
        clipPath="polygon(67% 15%, 100% 83%, 100% 100%, 0% 100%)"
        as="section"
        w="full"
        h="135px"
        marginTop="-134px"
      >
        <Box backgroundColor="#F8F9FA" w="full" h="135px"></Box>
      </Flex>

      <Flex
        w="full"
        h="full"
        p="84px"
        backgroundColor="#F8F9FA"
        alignItems="center"
      >
        <Card
          w="full"
          marginTop="-200px"
          h="802px"
          borderRadius="20px 20px 0px 0px"
        >
          <CardBody p={10}>
            <HStack
              as="div"
              w="full"
              h="full"
              className="calendly-inline-widget"
              data-url="https://calendly.com/ukfieldservice"
              data-processed="true"
            >
              <Box
                as="iframe"
                src="https://calendly.com/ukfieldservice?embed_domain=ukservice.azurewebsites.net&embed_type=Inline"
                h="full"
                w="full"
                title="Select a Date & Time - Calendly"
              ></Box>
            </HStack>
          </CardBody>
        </Card>
      </Flex>

      <ContactUsFooter />
    </>
  );
}

export default BookADemoPage;
