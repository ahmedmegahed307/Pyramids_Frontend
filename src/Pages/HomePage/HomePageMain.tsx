import {
  Box,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  VStack,
  Button,
  Image,
  Divider,
  CardBody,
  Card,
  Stack,
  Center,
  Grid,
  GridItem,
  AspectRatio,
  calc,
  Icon,
} from "@chakra-ui/react";
import HomePageArrow from "../../assets/img/HomePageArrow";
import { FaEnvelope } from "react-icons/fa";
import HomePageWavePhoto from "../../assets/img/HomePageWavePhoto";
import ArrowRight from "../../assets/icons/ArrowRight";
import Pricing from "./Pricing";
import share from "../../assets/img/share-1.svg";
import { Link, useNavigate } from "react-router-dom";
import ContactUsFooter from "./ContactUs/ContactUsFooter";
import HomePageLogo from "../../assets/img/HomePageLogo";
import Cup from "../../assets/icons/Cup";
import Flower from "../../assets/icons/Flower";
import Sun from "../../assets/icons/Sun";
import { StarIcon } from "@chakra-ui/icons";
import rhomberg from "../../assets/icons/romberg.svg";
import lanatlus from "../../assets/icons/lanatlus.svg";
import volume from "../../assets/icons/volume.svg";
import volumeSilent from "../../assets/icons/volume-silent.svg";
import afsVideo from "../../assets/AFSVideo.mp4";
import pfh from "../../assets/icons/pfh.svg";
import testominalCover from "../../assets/img/testominal-cover.png";
import useAuthStore from "../../hooks/Authentication/store";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/UserService/userService";
import "./home.css";
import { BsVoicemail } from "react-icons/bs";
const HomePageMain = () => {
  const userStore = useAuthStore();
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    (async function () {
      if (!userStore.user) {
        const user = await getCurrentUser();
        if (user) {
          userStore.setUser(user);
        }
      }
      setIsLoggedin(true);
    })();
  }, []);

  const handleAdminAccess = async () => {
    navigate("/dashboard");
  };
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  return (
    <>
      <Flex>
        {/* Left Column */}
        <VStack
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <Flex
            flex="1"
            w={"40px"}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="white"
            color="black"
            fontWeight={"bold"}
            fontSize={"16px"}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            <Link to={"/contactUs"}>
              <Text>Industries</Text>
            </Link>
          </Flex>
          <Flex
            flex="1"
            w={{
              base: "20px",
              md: "40px",
            }}
            justifyContent="center"
            alignItems="center"
            backgroundColor="black"
            color="white"
            fontWeight={"bold"}
            fontSize={"16px"}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            <Link to={"/whyChooseUs"}>
              <Text>Why Choose US?</Text>
            </Link>
          </Flex>
        </VStack>

        {/* Cover */}
        <Box
          h={"100vh"}
          flex="24"
          zIndex={0}
          backgroundColor="black"
          backgroundImage={"linear-gradient(000000, #070707, #232323DE)"}
        >
          <video
            autoPlay
            muted={isVideoMuted}
            playsInline
            loop
            className="responsive-video"
          >
            <source src={"#"} type="video/mp4" />
          </video>

          <HStack pt={10} position={"relative"}>
            <Box
              top={10}
              left={{
                base: 0,
                md: 5,
              }}
              position={"absolute"}
            >
              <HomePageLogo />
            </Box>
            <Spacer />
            <Box
              borderRadius={"50%"}
              p={1}
              mr={{
                base: 1,
                md: 5,
              }}
              border={"1px solid white"}
            >
              {isVideoMuted ? (
                <Image
                  src={volumeSilent}
                  boxSize="20px"
                  onClick={() => setIsVideoMuted(false)}
                />
              ) : (
                <Image
                  src={volume}
                  boxSize="20px"
                  onClick={() => setIsVideoMuted(true)}
                />
              )}
            </Box>

            {isLoggedin ? (
              <Button
                _hover={{ bg: "Primary.700" }}
                color={"#59F5FF"}
                bg={"none"}
                variant={"outline"}
                borderRadius={5}
                border={"1px solid #B6FBFF"}
                mr={5}
                onClick={handleAdminAccess}
              >
                Go To Admin
              </Button>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button
                    _hover={{ bg: "Primary.700" }}
                    color={"#59F5FF"}
                    bg={"none"}
                    variant={"outline"}
                    borderRadius={5}
                    border={"1px solid #B6FBFF"}
                    size={{
                      base: "sm",
                      md: "md",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button
                    _hover={{ bg: "Primary.700" }}
                    color={"#59F5FF"}
                    bg={"none"}
                    variant={"outline"}
                    borderRadius={5}
                    border={"1px solid #B6FBFF"}
                    size={{
                      base: "sm",
                      md: "md",
                    }}
                    mr={{
                      base: 2,
                      md: 5,
                    }}
                  >
                    Free Trial
                  </Button>
                </Link>
              </>
            )}
          </HStack>

          <VStack pt={90} align={"start"} pl={50}>
            <Heading
              fontSize={{
                base: "4xl",
                md: "7xl",
                lg: "9xl",
              }}
            >
              <span style={{ color: "#69F5FE" }}>Smart</span>{" "}
              <span style={{ color: "white" }}>Software,</span>
            </Heading>
            <Heading
              fontSize={{
                base: "4xl",
                md: "7xl",
                lg: "9xl",
              }}
            >
              <span style={{ color: "white" }}>Smarter</span>{" "}
              <span style={{ color: "#69F5FE" }}>Service</span>
            </Heading>
            <VStack
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <HStack pl={280} pt={4} spacing={0}>
                <Text color={"white"} pt={10}>
                  Check us out
                </Text>
                <HomePageArrow />
              </HStack>
              <FormControl mt={5}>
                <HStack>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      pt={1}
                      children={<FaEnvelope color="white" />}
                    />
                    <Input
                      _placeholder={{ color: "Neutral.500" }}
                      borderRadius={5}
                      h={12}
                      color={"Neutral.500"}
                      mb={56}
                      type="email"
                      className="FormControl"
                      placeholder="Enter your email"
                      border={"1px solid #BDBDBD"}
                    />
                    <Button
                      borderRadius={5}
                      borderLeftRadius={"none"}
                      border="none"
                      color="white"
                      h={"42px"}
                      _hover={{ bgColor: "none" }}
                      bg={"#00ABB6"}
                      cursor="pointer"
                      size="sm"
                      ml={-20}
                    >
                      Start Free Trial
                    </Button>
                  </InputGroup>
                </HStack>
              </FormControl>
            </VStack>
          </VStack>
        </Box>

        {/* Right Column */}
        <VStack
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <Flex
            w={{
              md: "40px",
            }}
            flex="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="black"
            color="white"
            fontWeight={"bold"}
            fontSize={"16px"}
            style={{
              writingMode: "vertical-lr",
            }}
          >
            <Link to={"/contactUs"}>
              <Text textAlign="center">About</Text>
            </Link>
          </Flex>
          <Flex
            w={{
              base: "20px",
              md: "40px",
            }}
            flex="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="white"
            color="black"
            fontWeight={"bold"}
            fontSize={"16px"}
            style={{
              writingMode: "vertical-lr",
            }}
          >
            <Link to={"/contactUs"}>
              <Text textAlign="center">Contact</Text>
            </Link>
          </Flex>
        </VStack>
      </Flex>

      <Box>
        <Stack
          bg={" #F6F7FC"}
          spacing={0}
          align={"center"}
          alignContent={"center"}
          pt={10}
        >
          <Heading>Join the fourth industrial </Heading>
          <Heading>revolution</Heading>
          <Text fontSize="lg" color={"gray.500"} pt={5}>
            See what AI can do for you{" "}
          </Text>
        </Stack>

        <Flex
          as="section"
          paddingTop="250px"
          backgroundColor="#F8F9FA"
          px={{ base: "20px", md: "20px", lg: "100px" }}
          paddingBottom="80px"
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
              lg: "10px",
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
              minH={"350px"}
            >
              <Card h="100%" boxShadow={"sm"} p={5}>
                <CardBody>
                  <VStack w="full" align={"start"}>
                    <Box ml={-6}>
                      <Image as={Cup} />
                    </Box>
                    <Heading
                      fontSize="20px"
                      fontWeight="bold"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      my={7}
                      color="#495057"
                    >
                      Automated Job Logging
                    </Heading>
                    <Text
                      fontSize="16px"
                      fontWeight="light"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      color="#6C757D"
                    >
                      Revolutionize Field Service with Voice-Activated
                      Efficiency
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem
              minH={"350px"}
              mb={{
                base: "10px",
                md: "none",
              }}
            >
              <Card h="100%" boxShadow={"sm"} p={5}>
                <CardBody>
                  <VStack w="full" align={"start"}>
                    <Box ml={-6}>
                      <Image as={Flower} boxSize="64px" />
                    </Box>
                    <Heading
                      fontSize="20px"
                      fontWeight="bold"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      my={7}
                      color="#495057"
                    >
                      Streamlined Operations
                    </Heading>
                    <Text
                      fontSize="16px"
                      fontWeight="light"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      color="#6C757D"
                    >
                      Suggested Scheduling to Ensure the Best Technician
                      Completes the Job
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem
              minH={"350px"}
              mb={{
                base: "10px",
                md: "none",
              }}
            >
              <Card h="100%" boxShadow={"sm"} p={5}>
                <CardBody>
                  <VStack w="full" align={"start"}>
                    <Box ml={-5}>
                      <Image as={Sun} boxSize="64px" />
                    </Box>
                    <Heading
                      fontSize="20px"
                      fontWeight="bold"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      my={7}
                      color="#495057"
                    >
                      Next-Level Productivity
                    </Heading>
                    <Text
                      fontSize="16px"
                      fontWeight="light"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      color="#6C757D"
                    >
                      Auto-generate your Quoting and Invoicing Using our AI
                      Tools
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </Flex>

        <Center bg={" #F6F7FC"}>
          <Button
            borderRadius={5}
            backgroundColor="#33BCC5"
            color="#FFFFFF"
            h="55px"
            w="187px"
            _hover={{ bgColor: "none" }}
          >
            Contact sales
          </Button>

          <Button
            borderRadius={7}
            borderLeftRadius={"none"}
            border="none"
            color="white"
            h={"55px"}
            _hover={{ bgColor: "none" }}
            bg={"#00ABB6"}
            cursor="pointer"
            rightIcon={<ArrowRight />}
            size="md"
            ml={-2}
          ></Button>
        </Center>
      </Box>
      <Box>
        {/* <Testimonials /> */}

        <Flex
          as="section"
          // px="120px"
          px={{ base: "20px", md: "20px", lg: "100px" }}
          paddingTop="76px"
          backgroundColor="#F8F9FA"
          paddingBottom="120px"
          flexDir="column"
        >
          <Card
            w="full"
            h="450px"
            backgroundColor="#00ABB6"
            backgroundImage={testominalCover}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
          >
            <CardBody
              style={{
                background: "rgba(6, 81, 105, 0.68)",
              }}
              //rgba(6, 81, 105, 0.68)
            >
              <VStack
                w="full"
                alignItems="center"
                justifyContent="center"
                paddingTop="60px"
              >
                <Text
                  color={"#63F6FF"}
                  textAlign={"center"}
                  fontFamily={"Plus Jakarta Sans, sans-serif"}
                  fontSize={"16px"}
                  fontStyle={"normal"}
                  fontWeight={"700"}
                  lineHeight={"normal"}
                >
                  TESTIMONIAL
                </Text>
                <Heading
                  color="#FFFFFF"
                  mt={{
                    base: "10px",
                    md: "none",
                  }}
                  fontSize={{
                    base: "20px",
                    md: "40px",
                    lg: "40px",
                  }}
                  fontWeight="400"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  See how UK Field Service
                </Heading>
                <Heading
                  color="#FFFFFF"
                  marginY="10px"
                  fontSize={{
                    base: "20px",
                    md: "40px",
                    lg: "40px",
                  }}
                  fontWeight="400"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {" "}
                  has helped others
                </Heading>
              </VStack>
            </CardBody>
          </Card>
        </Flex>
      </Box>

      <Grid
        pb={100}
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]}
        backgroundColor="#F8F9FA"
        gridColumnGap={{
          base: "10px",
          md: "5px",
          lg: "4",
          xl: "10",
        }}
        px={{
          base: "10px",
          md: "10",
          lg: "40",
        }}
        mt={{
          base: "-10",
          md: "-60",
        }}
      >
        <GridItem
          mb={{
            base: "60px",
            md: "none",
          }}
        >
          <Card px={2} h={"100%"} boxShadow={"sm"}>
            <CardBody>
              <VStack align="start" spacing={0}>
                <Image
                  backgroundColor="white"
                  border={"1px solid #E9ECEFBF"}
                  boxShadow={"md"}
                  borderRadius={5}
                  src={pfh}
                  position={{
                    base: "relative",
                  }}
                  top={-20}
                />

                <Text fontSize="16px" color="#6C757D">
                  Thanks to this smart recommendation for scheduling, we no
                  longer have to sit in long spreadsheets to do extensive
                  planning. All we have to do is just hit a few clicks and
                  follow the suggestion by the system. Save us tons of time!
                </Text>
                <Divider
                  my={{
                    base: 10,
                    md: 5,
                  }}
                />
                <HStack>
                  <VStack
                    align={"start"}
                    fontWeight={"bold"}
                    spacing={0}
                    fontSize={"12px"}
                    position={"absolute"}
                    bottom={1}
                  >
                    <Text>Chris Casey</Text>
                    <Text>PFH Technology Group</Text>
                  </VStack>
                  <Spacer />
                  <Box
                    position={"absolute"}
                    right={{
                      base: 1,
                      md: 1,
                      lg: 3,
                    }}
                    bottom={{
                      base: 1,
                      md: 1,
                      lg: 5,
                      xl: 3,
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        ml={2}
                        key={index}
                        color={index < 5 ? "#FFBB00" : "gray.300"}
                      />
                    ))}
                  </Box>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem
          mb={{
            base: "60px",
            md: "none",
          }}
        >
          <Card px={2} h={"100%"} boxShadow={"sm"}>
            <CardBody>
              <VStack align="start">
                <Image
                  backgroundColor="white"
                  border={"1px solid #E9ECEFBF"}
                  boxShadow={"md"}
                  borderRadius={5}
                  src={rhomberg}
                  position={{
                    base: "relative",
                  }}
                  top={-20}
                />

                <Text fontSize="16px" color="#6C757D">
                  We've never seen any! other products that could provide such a
                  modern dashboard. It is not just a plain table with numbers,
                  but well-designed charts to alert us for important decisions.
                  UK Field Service has given us the inspiration to help
                  understand our business.
                </Text>
                <Divider
                  my={{
                    base: 10,
                    md: 5,
                  }}
                />
                <HStack>
                  <VStack
                    position={"absolute"}
                    align={"start"}
                    fontWeight={"bold"}
                    spacing={0}
                    fontSize={"12px"}
                    bottom={1}
                  >
                    <Text>Billy Stamp</Text>
                    <Text>Rhomberg Sersa Rail Group</Text>
                  </VStack>
                  <Box
                    position={"absolute"}
                    right={{
                      base: 1,
                      md: 1,
                      lg: 3,
                    }}
                    bottom={{
                      base: 1,
                      md: 1,
                      lg: 5,
                      xl: 3,
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        ml={2}
                        key={index}
                        color={index < 5 ? "#FFBB00" : "gray.300"}
                      />
                    ))}
                  </Box>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem
          mb={{
            base: "60px",
            md: "none",
          }}
        >
          <Card px={2} h={"100%"}>
            <CardBody>
              <VStack align="start">
                <Image
                  backgroundColor="white"
                  border={"1px solid #E9ECEFBF"}
                  boxShadow={"md"}
                  borderRadius={5}
                  src={lanatlus}
                  position={{
                    base: "relative",
                  }}
                  top={-20}
                />

                <Text fontSize="16px" color="#6C757D">
                  Following the latest industry trend of remote-first service,
                  UK Field Service provides remote work mode with video
                  consultation and diagnosis, the benefit of this is less visits
                  which allows us to save money and results in faster
                  completion.
                </Text>
                <Divider
                  my={{
                    base: 10,
                    md: 5,
                  }}
                />
                <HStack>
                  <VStack
                    align={"start"}
                    fontWeight={"bold"}
                    spacing={0}
                    fontSize={"12px"}
                    position={"absolute"}
                    bottom={1}
                  >
                    <Text>Seamus Glynn</Text>
                    <Text mr={5}>LAnautilus, Telecom Group</Text>
                  </VStack>
                  <Spacer />
                  <Box
                    position={"absolute"}
                    right={{
                      base: 1,
                      md: 1,
                      lg: 3,
                    }}
                    bottom={{
                      base: 1,
                      md: 1,
                      lg: 5,
                      xl: 3,
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        ml={2}
                        key={index}
                        color={index < 5 ? "#FFBB00" : "gray.300"}
                      />
                    ))}
                  </Box>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Flex
        bgColor={" #F6F7FC"}
        h={"200px"}
        justifyContent={"space-between"}
        position={"relative"}
      >
        <HStack
          spacing={4}
          alignItems={"center"}
          position={"absolute"}
          left={"10%"}
          bottom={"25%"}
        >
          <Divider
            borderRadius={10}
            borderColor={"Primary.700"}
            orientation="vertical"
            h={"80px"}
            borderWidth={3}
          />
          <VStack align={"start"} pt={2}>
            <Text
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"#343A40"}
              w={"400px"}
            >
              Ready to find your plan?
            </Text>
            <Text color={"#6C757D"}>View available plans</Text>
          </VStack>
        </HStack>

        <Spacer />
        <Box
          overflow="hidden"
          maxHeight="200px"
          position="relative"
          display={{ base: "none", md: "block" }}
        >
          <HomePageWavePhoto />
          <Button
            borderRadius={5}
            position="absolute"
            boxShadow={"3px 12px 35px 0px rgba(35, 190, 123, 0.30)"}
            top={{
              base: "80%",
              md: "50%",
              lg: "50%",
            }}
            left={{
              base: "60%",
              md: "75%",
              lg: "75%",
            }}
            transform="translate(-50%, -50%)"
            borderRightRadius={"none"}
            border="none"
            h={"40px"}
            w={"120px"}
            color="white"
            _hover={{ bgColor: "none" }}
            bg={"#33BCC5"}
            cursor="pointer"
          >
            Book a demo
          </Button>
          <Button
            borderRadius={5}
            position="absolute"
            boxShadow={"3px 12px 35px 0px rgba(35, 190, 123, 0.30)"}
            top={{
              base: "80%",
              md: "50%",
              lg: "50%",
            }}
            left={{
              base: "80%",
              md: "84%",
              lg: "84%",
            }}
            w={"60px"}
            transform="translate(-50%, -50%)"
            borderLeftRadius={"none"}
            border="none"
            h={"40px"}
            color="white"
            _hover={{ bgColor: "none" }}
            bg={"#00ABB6"}
            cursor="pointer"
            rightIcon={<ArrowRight />}
            size="md"
          ></Button>
        </Box>
      </Flex>
      <Pricing />
      <ContactUsFooter />
    </>
  );
};

export default HomePageMain;
