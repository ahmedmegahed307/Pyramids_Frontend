import HomePageHeading from "../HomePageHeading";
import backgroundImg from "../../../assets/img/img-why-us.png";
import ContactUsFooter from "../ContactUs/ContactUsFooter";
import {
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Card,
  CardBody,
  VStack,
  HStack,
  Divider,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";

import managedImg from "../../../assets/img/managed-it-solutions-1.png";
import radar from "../../../assets/img/radar-21.svg";
import arrow from "../../../assets/img/arrow-right-1.svg";
import shield from "../../../assets/img/shield-tick-2.svg";
import activity from "../../../assets/img/activity-1.svg";
import money from "../../../assets/img/money-send-1.svg";
import cpu from "../../../assets/img/cpu-setting-1.svg";
import share from "../../../assets/img/share-1.svg";

function WhyChooseUsPage() {
  return (
    <>
      <HomePageHeading
        heading="Why Choose Us?"
        route="Why Choose Us?"
        backgroundImageName={backgroundImg}
      />
      <Flex
        as="section"
        backgroundColor="#F8F9FA"
        paddingBottom="120px"
        flexDir={{ base: "column", md: "column" }}
        paddingTop={{ base: "20px", md: "100px" }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 1, xl: 2 }}
          spacing={10}
          justifyItems={"center"}
          paddingLeft={{ base: "20px", md: "100px" }}
          paddingRight={{ base: "20px", md: "50px" }}
        >
          <GridItem>
            <Heading
              fontSize="40px"
              fontWeight="700"
              fontFamily="Plus Jakarta Sans, sans-serif"
              color="#343A40"
              borderLeft="8px solid #cc6751"
              paddingLeft={5}
            >
              Why Pyramids?
            </Heading>

            <Text
              as="p"
              marginY="40px"
              color="#6C757D"
              fontSize="20px"
              fontFamily="Plus Jakarta Sans, sans-serif"
              textAlign="justify"
            >
              Watch AI become your new favourite assistant. Pyramids allows you
              to use AI for practical use, in the real world. You can now view
              and manage your company's operations all within one system.
            </Text>
            <Text
              as="p"
              marginY="40px"
              color="#6C757D"
              fontSize="20px"
              fontFamily="Plus Jakarta Sans, sans-serif"
              textAlign="justify"
            >
              Our software will suggest the best technicians for the job based
              on their location, availability and experience. Pyramids gives
              real time insights on the priority, progress and job types and
              allows you to receive monthly customer satisfaction scores based
              on your technician's performance.
            </Text>
          </GridItem>

          <GridItem>
            <Box display={{ base: "none", xl: "block" }}>
              <Image
                src={managedImg}
                borderTopLeftRadius="100px"
                borderBottomLeftRadius="30px"
                borderBottomRadius="30px"
              />
            </Box>
          </GridItem>
        </SimpleGrid>
      </Flex>

      <Flex
        px={{ base: "20px", md: "20px", lg: "50px" }}
        backgroundColor="#F8F9FA"
        paddingBottom="120px"
      >
        <Card w="full" borderRadius={8} boxShadow={"md"}>
          <CardBody>
            <SimpleGrid
              columns={{
                base: 1,
                md: 1,
                lg: 3,
              }}
              alignItems="center"
              justifyContent="center"
              w="full"
            >
              <GridItem>
                <VStack
                  borderRight={{
                    base: "none",
                    lg: "2px dashed #CED4DA",
                  }}
                  borderBottom={{
                    base: "2px dashed #CED4DA",
                    lg: "none",
                  }}
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading
                    marginY="10px"
                    fontSize="40px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#cc6751"
                  >
                    92%
                  </Heading>
                  <Text
                    color="#6C757D"
                    marginY={3}
                    fontSize="22px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Comprehensive Support
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack
                  borderRight={{
                    base: "none",
                    lg: "2px dashed #CED4DA",
                  }}
                  borderBottom={{
                    base: "2px dashed #CED4DA",
                    lg: "none",
                  }}
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading
                    marginY="10px"
                    fontSize="40px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#cc6751"
                  >
                    89%
                  </Heading>
                  <Text
                    color="#6C757D"
                    marginY={3}
                    fontSize="22px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Wilingness to Recommend
                  </Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack w="full" alignItems="center" justifyContent="center">
                  <Heading
                    marginY="10px"
                    fontSize="40px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#cc6751"
                  >
                    6/7
                  </Heading>
                  <Text
                    color="#6C757D"
                    marginY={3}
                    fontSize="22px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Increase Efficiency Rating
                  </Text>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Flex>

      <Flex
        as="section"
        px={{ base: "20px", md: "20px", lg: "100px" }}
        py="100px"
        backgroundColor="#F8F9FA"
        flexDir={"column"}
        gap={10}
      >
        <Card w={"full"} h="450px" backgroundColor="#cc6751">
          <CardBody>
            <VStack
              w="full"
              alignItems="center"
              justifyContent="center"
              paddingTop="60px"
            >
              <Heading
                color="#FFFFFF"
                marginY="10px"
                fontSize="40px"
                fontWeight="400"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Features
              </Heading>

              <Text
                color="#FFFFFF"
                marginY="10px"
                fontSize="18px"
                fontWeight="400"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Take a look at some of our most stand out features
              </Text>
              <Divider
                marginTop={5}
                w="100px"
                border="4px solid white"
                borderRadius="10px"
              />
            </VStack>
          </CardBody>
        </Card>
        <Grid
          // templateColumns={"repeat(auto-fill, minmax(360px, 2fr))"}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ]}
          px={{
            base: "10px",
            md: "5px",
            lg: "40px",
          }}
          gridColumnGap={"5"}
          backgroundColor="#F8F9FA"
          mt={-60}
        >
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"}>
              <CardBody>
                <VStack
                  w="full"
                  p="19px"
                  h="full"
                  alignItems={{
                    base: "center",
                    md: "start",
                  }}
                  justifyContent={{
                    base: "center",
                    md: "start",
                  }}
                  position={"relative"}
                >
                  <Box
                    padding="16px"
                    backgroundColor="#E9ECEFBF"
                    borderRadius="25px"
                  >
                    <Image src={radar} boxSize="48px" />
                  </Box>

                  <Heading
                    color="#495057"
                    marginY="20px"
                    fontSize="22px"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Automated Job Logging
                  </Heading>

                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                    marginTop="20px"
                  >
                    Use voice recognition technology for efficiency
                  </Text>

                  <HStack
                    position={"absolute"}
                    right={{
                      base: -2,
                      md: 2,
                      lg: 2,
                    }}
                    bottom={{
                      base: -3,
                      md: 2,
                      lg: 2,
                    }}
                  >
                    <Button variant="link" size="sm" colorScheme="#cc6751">
                      Learn More
                    </Button>
                    <Image src={arrow} boxSize="24px" />
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"}>
              <CardBody>
                <VStack
                  w="full"
                  p="19px"
                  h="full"
                  alignItems={{
                    base: "center",
                    md: "start",
                  }}
                  justifyContent={{
                    base: "center",
                    md: "start",
                  }}
                  position={"relative"}
                >
                  <Box
                    padding="16px"
                    backgroundColor="#E9ECEFBF"
                    borderRadius="25px"
                  >
                    <Image src={shield} boxSize="48px" />
                  </Box>

                  <Heading
                    color="#495057"
                    marginY="20px"
                    fontSize="22px"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Managed Finances
                  </Heading>

                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                    marginTop="20px"
                  >
                    Our software is compatible with Sage, Xero and Qickbooks
                  </Text>

                  <HStack
                    position={"absolute"}
                    right={{
                      base: -2,
                      md: 2,
                      lg: 2,
                    }}
                    bottom={{
                      base: -3,
                      md: 2,
                      lg: 2,
                    }}
                  >
                    <Button variant="link" size="sm" colorScheme="#cc6751">
                      Learn More
                    </Button>
                    <Image src={arrow} boxSize="24px" />
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%">
              <CardBody>
                <VStack
                  w="full"
                  p="19px"
                  h="full"
                  alignItems={{
                    base: "center",
                    md: "start",
                  }}
                  justifyContent={{
                    base: "center",
                    md: "start",
                  }}
                  position={"relative"}
                >
                  <Box
                    padding="16px"
                    backgroundColor="#E9ECEFBF"
                    borderRadius="25px"
                  >
                    <Image src={activity} boxSize="48px" />
                  </Box>

                  <Heading
                    color="#495057"
                    marginY="20px"
                    fontSize="22px"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Automated Scheduling
                  </Heading>

                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                    marginTop="20px"
                    mb={10}
                  >
                    Suggested scheduling highlights the most qualified and
                    available technician for the job
                  </Text>

                  <HStack
                    position={"absolute"}
                    right={{
                      base: -2,
                      md: 2,
                      lg: 2,
                    }}
                    bottom={{
                      base: -3,
                      md: 2,
                      lg: 2,
                    }}
                  >
                    <Button variant="link" size="sm" colorScheme="#cc6751">
                      Learn More
                    </Button>
                    <Image src={arrow} boxSize="24px" />
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>

      <Flex
        as="section"
        px={{
          base: "20px",
          md: "20px",
          lg: "100px",
        }}
        paddingTop="10px"
        backgroundColor="#F8F9FA"
      >
        <VStack w="full" alignItems="center" justifyContent="center">
          <Heading
            fontSize={{ base: "20px", md: "20px", lg: "25px", xl: "35px" }}
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
            color="#343A40"
            textAlign="center"
          >
            “Thanks to this smart recommendation for scheduling, we <br /> no
            longer have to sit in long spreadsheets to do extensive <br />{" "}
            planning"
          </Heading>

          <Text
            fontSize="20px"
            fontWeight="light"
            fontFamily="Plus Jakarta Sans, sans-serif"
            color="#6C757D"
            textAlign="center"
            marginTop={10}
          >
            Here Are Three Positive Steps We Take To Ensure The Best Results
          </Text>

          <Divider
            marginTop={10}
            w="100px"
            border="4px solid #cc6751"
            colorScheme="#cc6751"
            borderRadius="10px"
          />
        </VStack>
      </Flex>

      <Flex
        as="section"
        paddingTop="250px"
        backgroundColor="#F8F9FA"
        px={{ base: "20px", md: "20px", lg: "100px" }}
        paddingBottom="120px"
        flexDir={"column"}
        gap={10}
      >
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ]}
          px={{
            base: "10px",
            md: "5px",
            lg: "40px",
          }}
          gridColumnGap={"5"}
          backgroundColor="#F8F9FA"
          mt={-60}
        >
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"}>
              <CardBody>
                <VStack w="full" alignItems="center" justifyContent="center">
                  <Image src={money} boxSize="64px" marginY={10} />
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={10}
                    color="#495057"
                  >
                    We Invest In Your Organization
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={2}
                    color="#6C757D"
                  >
                    We take the time to understand your mission, business
                    processes, and specific industry challenges that your
                    specific IT needs to address. In many cases we do this on
                    our dime.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"}>
              <CardBody>
                <VStack w="full" alignItems="center" justifyContent="center">
                  <Image src={cpu} boxSize="64px" marginY={10} />
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={10}
                    color="#495057"
                  >
                    We go beyond technology
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={2}
                    color="#6C757D"
                  >
                    As your IT partner we look at everything your technology
                    touches. From human factors through security policies we
                    examine it all.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"}>
              <CardBody>
                <VStack w="full" alignItems="center" justifyContent="center">
                  <Image src={share} boxSize="64px" marginY={10} />
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={10}
                    color="#495057"
                  >
                    We are your strategic partners
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAlign="center"
                    marginY={2}
                    color="#6C757D"
                  >
                    We are your strategic partners Through collaboration,
                    automation, and proactive management, our team is dedicated
                    to guiding your organization forward.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>

      <ContactUsFooter />
    </>
  );
}

export default WhyChooseUsPage;
