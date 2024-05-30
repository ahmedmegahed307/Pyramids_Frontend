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
import backgroundCover from "../../assets/img/background-cover/pyramidsCover.jpg";
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
import Logo1 from "../../assets/img/logo1";
import Navbar from "./Navbar";
import AIFeaturesForYou from "./AIFeaturesForYou";
import loginCover from "../../assets/img/LoginCover";
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
      <Box
        color={"white"}
        height={"120vh"}
        backgroundImage={`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundCover})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={"relative"}
      >
        <Navbar isLoggedin={isLoggedin} />
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <VStack>
            <Heading color={"whiteAlpha.800"}>
              <span
                style={{
                  color: "#cc6751",
                  fontWeight: "bold",
                  fontSize: "4rem",
                }}
              >
                {" "}
                Pyramids
              </span>{" "}
              is a field service software that helps you to manage your business
            </Heading>
            <VStack>
              <HStack pl={280} pt={4} spacing={0}>
                <Text color={"white"} pt={10}>
                  Check us out
                </Text>
                <HomePageArrow />
              </HStack>
              <FormControl mt={5}>
                <HStack align={"start"}>
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
                      onClick={() => {
                        navigate("/signup");
                      }}
                      borderRadius={5}
                      borderLeftRadius={"none"}
                      border="none"
                      color="white"
                      h={"42px"}
                      _hover={{ bgColor: "none" }}
                      bg={"Primary.700"}
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
      </Box>
      <AIFeaturesForYou />

      <Pricing />
      <ContactUsFooter />
    </>
  );
};

export default HomePageMain;
