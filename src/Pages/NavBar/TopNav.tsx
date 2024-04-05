import "regenerator-runtime";

import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Menu,
  Heading,
  VStack,
  MenuItem,
  MenuButton,
  Stack,
  Avatar,
  Text,
  MenuList,
  HStack,
  MenuGroup,
  MenuDivider,
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
  border,
  Tooltip,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import moment from "moment";

import { MdLogout } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaArchway, FaCircle, FaUser } from "react-icons/fa";
import { IconMessage } from "../../assets/icons/IconMessage";
import useAuthStore from "../../hooks/Authentication/store";
import usePageTitleStore from "../../hooks/NavBar/PageTitleStore";
import SearchInput from "../SearchBar/components/SearchInput";
import NotificationPopover from "./Notification/NotificationPopover";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { IconChatSend } from "../../assets/icons/IconChatSend";
import { IconChatSendDisabled } from "../../assets/icons/IconChatSendDisabled";
import Microphone from "../../assets/icons/jobs/Microphone";
import { AITextProcessingRequest } from "../../models/Interfaces/AITextProcessingRequest";
import useAITextProcessingRequest from "../../hooks/AI/useAITextProcessingRequest";
import MicrophoneActive from "../../assets/icons/MicrophoneActive";
import IconInfo from "../../assets/icons/IconInfo";
import { SideBarStore } from "../../store/SideBarStore";
import IconUser from "../../assets/icons/IconUser";
import ThemeIcon from "../../assets/icons/ThemeIcon";
import HelpIcon from "../../assets/icons/HelpIcon";
import LogOutIcon from "../../assets/icons/LogOutIcon";
//import NotificationPopover from "./NotificationPopover";

function TopNav() {
  const { user } = useAuthStore();
  const { pageTitle } = usePageTitleStore();
  const navigate = useNavigate();
  const userStore = useAuthStore();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [userInput, setUserInput] = useState("");
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  const textProcessingRequest = useAITextProcessingRequest();
  const handleTextSubmit = async (userInput) => {
    if (!userInput) return;
    setIsAIProcessing(true);
    const logJobModel: AITextProcessingRequest = {
      companyId: user?.companyId,
      userId: user?.id,
      text: userInput,
    };
    try {
      await textProcessingRequest.mutateAsync(logJobModel);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAIProcessing(false);
    }
  };
  const { isSideBarCollapsed } = SideBarStore();

  // speech recognition
  const {
    transcript,
    listening,

    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }
  const handleSpeechRecognition = () => {
    console.log("click microphone");
    console.log("listening", listening);

    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    if (transcript) {
      setUserInput(transcript);
    }
  }, [transcript]);
  const [isMediumScreen] = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Box w={"full"} as="nav" pt={5} mb={8}>
        <HStack w={"full"}>
          <Box w={"70%"} position="relative">
            {isAIProcessing && (
              <Spinner
                position="absolute"
                top="30%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="999"
                thickness="4px"
                speed="0.65s"
                emptyColor="Neutral.300"
                color="Primary.700"
              />
            )}
            <InputGroup
              border={userInput !== "" ? "1px none #66CDD3" : "transparent"}
              alignItems={"center"}
              position={"relative"}
            >
              <Input
                size={"lg"}
                borderRadius={10}
                alignItems={"center"}
                focusBorderColor="Primary.500"
                borderWidth={0}
                bg={"white"}
                //view placeholder on md and lg screens only

                placeholder={
                  isMediumScreen
                    ? "Speak or type your request; let AI do the rest"
                    : "AI Command Bar"
                }
                _placeholder={{
                  color: "Neutral.500",
                  opacity: "0.7",
                }}
                ml={isSideBarCollapsed || isMediumScreen ? 5 : 0}
                onChange={(e) => setUserInput(e.target.value!)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleTextSubmit(userInput);
                  }
                }}
                value={userInput}
              />

              {userInput !== "" && (
                <InputRightElement
                  position={"absolute"}
                  right={24}
                  top={1}
                  alignItems={"center"}
                  onClick={() => handleTextSubmit(userInput)}
                >
                  <IconChatSend />
                </InputRightElement>
              )}

              <InputRightElement
                alignItems={"center"}
                onClick={() => handleSpeechRecognition()}
                position={"absolute"}
                right={14}
                top={1}
              >
                {!listening ? <Microphone /> : <MicrophoneActive />}
              </InputRightElement>
              <InputRightElement position={"absolute"} right={8}>
                <Center height="40px" mt={2}>
                  <Divider
                    orientation="vertical"
                    style={{ borderColor: "#E2E2E2" }}
                  />
                </Center>
              </InputRightElement>

              <InputRightElement position={"absolute"} right={2}>
                <Menu>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        mt={1}
                        aria-label="AI Keywords"
                        icon={<IconInfo />}
                        variant="ghost"
                        fontSize="xl"
                        mx={5}
                        title="AI Keywords"
                        color={"Neutral.500"}
                        _hover={{ bg: "none", color: "Primary.700" }}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent
                        bg={"#646373"}
                        w={{
                          base: "300px",
                          md: "500px",
                        }}
                        border={"none"}
                        mr={12}
                        color="#F5F8FC"
                        borderRadius={5}
                        p={3}
                      >
                        <PopoverArrow ml={6} bg={"#646373"} />
                        <PopoverHeader border={"hidden"}>
                          <HStack my={2}>
                            <Heading size={"sm"} fontWeight="bold">
                              AI Keywords for accurate results
                            </Heading>
                          </HStack>
                        </PopoverHeader>
                        <PopoverBody>
                          <VStack align={"start"} spacing={2}>
                            <HStack>
                              <FaCircle size={7} />
                              <Text>
                                Log Job - Log a job for ABC Client against ABC
                                Site with abc type
                              </Text>
                            </HStack>

                            <HStack>
                              <FaCircle size={7} />
                              <Text>
                                Job Query Report - Show me all jobs for ABC
                                Client
                              </Text>
                            </HStack>
                          </VStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Menu>
              </InputRightElement>
              {/* <Tooltip
                label="keywords sentences"
                placement="top"
                hasArrow
                bg={"#646373"}
              >
                <InputRightElement
                  mr={2}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    keyWordsPopOver();
                    console.log("click");
                  }}
                >
                  <IconInfo />
                </InputRightElement>
              </Tooltip> */}
            </InputGroup>
          </Box>
          <Spacer />

          {/* <SearchInput /> */}
          <HStack spacing={0} mr={4}>
            <Menu>
              <NotificationPopover />
            </Menu>

            <Box pr={5}>
              <Menu>
                <MenuButton>
                  <Stack direction="row" align={"center"} spacing={1}>
                    <Avatar
                      size={"sm"}
                      bg={"Primary.500"}
                      textColor={"white"}
                      name={user?.firstName + " " + user?.lastName}
                      src="https://bit.ly/broken-lisdsdsdnk"
                    />
                    <ChevronDownIcon />
                  </Stack>
                </MenuButton>
                <MenuList borderRadius={10} p={5} w={"300"} shadow={"sm"}>
                  <HStack
                    mb={2}
                    pl={1}
                    align={"center"}
                    alignContent={"center"}
                    height={"7vh"}
                    spacing={4}
                  >
                    <Avatar
                      size={"sm"}
                      bg={"Primary.500"}
                      h={"30px"}
                      w={"30px"}
                      fontWeight={"bold"}
                      name={user?.firstName + " " + user?.lastName}
                      src="https://bit.ly/broken-lisdsdsdnk"
                    />
                    <VStack align={"start"} spacing={0} wrap={"wrap"}>
                      <Heading fontWeight={"lg"} fontSize={"md"}>
                        {user?.firstName + " " + user?.lastName}
                      </Heading>
                      <Text color={"rgba(134, 134, 135, 1)"}>
                        {user?.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <MenuGroup>
                    <Link to={`/globalSettings/users/${user?.id}`}>
                      <MenuItem
                        _hover={{ bg: "#EDEDED" }}
                        borderRadius={10}
                        h={12}
                        icon={<IconUser />}
                      >
                        {" "}
                        Profile
                      </MenuItem>
                    </Link>
                    <Link to={`/globalSettings/company/info`}>
                      <MenuItem
                        _hover={{ bg: "#EDEDED" }}
                        my={1}
                        borderRadius={10}
                        h={12}
                        icon={<HelpIcon />}
                      >
                        Company Info
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuDivider
                    w={"247px"}
                    ml={-5}
                    border={"1px solid rgba(0, 0, 0, 0.1)"}
                  />

                  <MenuItem
                    borderRadius={10}
                    h={12}
                    _hover={{ bg: "#EDEDED" }}
                    icon={<LogOutIcon />}
                    onClick={() => handleLogout()}
                  >
                    {" "}
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}

export default TopNav;
