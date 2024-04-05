import "../../App.css";
import {
  Box,
  Button,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  Text,
  CloseButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Divider,
  ModalCloseButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { AddIcon } from "@chakra-ui/icons";

import useAuthStore from "../../hooks/Authentication/store";
import { useUserStore } from "../../hooks/Settings/User/store";
import { useClientStore } from "../../hooks/Settings/Client/useClientStore";
import TopNav from "../../Pages/NavBar/TopNav";
import ChatBot from "../../Pages/ChatGPT/ChatBot";
import { FluentBot_24Regular } from "../../assets/icons/IconFluentBot_24Regular";
import { AICheckCreateJobInfoStore } from "../../hooks/AI/AICheckCreateJobInfoStore";
import CheckJobInfoPopUp from "../../Pages/AIPopUps/CheckJobInfoPopUp";
import { SideBarStore } from "../../store/SideBarStore";
import SideBar from "../SideBar/SideBar";

const DashboardMain = () => {
  const { isSideBarCollapsed } = SideBarStore();
  const [showRobotChat, setShowRobotChat] = useState(false);
  const [isCloseClicked, setIsCloseClicked] = useState(false);

  const handleChatBotClose = () => {
    setIsCloseClicked(true);
    setShowRobotChat(false);
  };

  const handleToggleChatBot = () => {
    setIsCloseClicked(false);
    setShowRobotChat(!showRobotChat);
  };

  const renderChatBotButton = () => {
    if (showRobotChat) {
      return (
        <Button
          color={"Primary.700"}
          bg={"Auxiliary.600"}
          outline={"none"}
          fontSize={"3xl"}
          onClick={handleChatBotClose}
        >
          {" "}
          <CloseButton />
        </Button>
      );
    } else {
      return (
        <Button
          color={"Primary.700"}
          bg={"Auxiliary.600"}
          fontSize={"3xl"}
          onClick={handleToggleChatBot}
        >
          <FluentBot_24Regular />{" "}
        </Button>
      );
    }
  };

  const { setIsCreateModalOpen } = useUserStore();
  const { setIsClientCreateModalOpen } = useClientStore();
  const user = useAuthStore();
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // handleUserStore();
      setToken(token);
    }
  }, []);

  const {
    setIsConfirmCreateJobPopUp,
    isConfirmCreateJobPopUp,
    jobInfoFromBackend,
  } = AICheckCreateJobInfoStore();
  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] = useState(true);
  return (
    <>
      <>
        <Grid
          templateColumns={{
            base: "10% 90%",
            md: `${isSideBarCollapsed ? "5% 95%" : "15% 85%"}`,
          }}
          gap={5}
        >
          <GridItem>
            <SideBar />
          </GridItem>
          <GridItem>
            <VStack w={"full"}>
              <TopNav />

              <Box w={"full"} overflowX="hidden">
                <Outlet />
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        {showRobotChat && !isCloseClicked && (
          <ChatBot setIsCloseClicked={handleChatBotClose}></ChatBot>
        )}
        {user.isFirstLogin && (
          <Modal
            isOpen={isFirstLoginModalOpen}
            size={"lg"}
            onClose={() => setIsFirstLoginModalOpen(false)}
          >
            <ModalOverlay
              bg="blackAlpha.500"
              backdropFilter="blur(5px) hue-rotate(0deg)"
            />

            <ModalContent bg="#2A4365" borderRadius={10}>
              <ModalHeader color={"white"}>
                Welcome to Pyramids trial!
              </ModalHeader>
              <Divider mb={5} borderColor={"gray.600"} />
              <ModalCloseButton color={"white"} />

              <ModalBody mb={10} color={"white"}>
                <Text>
                  We have created sample data to help you get started with
                  investigating the system. This includes sample engineers,
                  users, job types, subtypes, jobs, and clients.
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        <HStack spacing={2} position="fixed" bottom={9} right={9} zIndex={1000}>
          <Popover>
            <PopoverTrigger>
              <Button leftIcon={<AddIcon />}> Add</Button>
            </PopoverTrigger>
            <PopoverContent border={"none"} w={"fit-content"}>
              <PopoverArrow />

              <PopoverBody>
                <VStack>
                  <Link to="/jobs/addjob" target="_blank">
                    <Button w={100} variant={"outline"}>
                      Job
                    </Button>
                  </Link>
                  <Link to="/settings/clients">
                    <Button
                      w={100}
                      variant="outline"
                      onClick={() => setIsClientCreateModalOpen(true)}
                    >
                      Client
                    </Button>
                  </Link>
                  <Link to="/settings/users">
                    <Button
                      w={100}
                      variant="outline"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      User
                    </Button>
                  </Link>
                  <Link to="/ppm/contracts/addContract" target="_blank">
                    <Button w={100} variant={"outline"}>
                      Contract
                    </Button>
                  </Link>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {renderChatBotButton()}
        </HStack>
        {isConfirmCreateJobPopUp && (
          <CheckJobInfoPopUp
            isOpen={isConfirmCreateJobPopUp}
            jobInfoFromBackend={jobInfoFromBackend}
            onClose={() => setIsConfirmCreateJobPopUp(false)}
          />
        )}
      </>
    </>
  );
};

export default DashboardMain;
