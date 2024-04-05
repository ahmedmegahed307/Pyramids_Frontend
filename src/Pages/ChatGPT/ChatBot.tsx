import {
  Button,
  Text,
  Flex,
  HStack,
  Input,
  VStack,
  Box,
  Divider,
  Card,
  CardHeader,
  CloseButton,
  Heading,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

import { useEffect, useState } from "react";
import { LogoSVG } from "../../assets/icons/logoSVG";
import { FluentBot_24Regular } from "../../assets/icons/IconFluentBot_24Regular";
import { IconChatSend } from "../../assets/icons/IconChatSend";
import { IconChatSendDisabled } from "../../assets/icons/IconChatSendDisabled";
import HomePageLogo from "../../assets/img/HomePageLogo";
interface Props {
  setIsCloseClicked: () => void;
}
const ChatBot = ({ setIsCloseClicked }: Props) => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const API_KEY = "tester";

  const systemMessage = {
    role: "system",
    content:
      "Explain things like you are talking to field service company employees which are mostly managers and engineers. give short answers and explain things in a simple way.",
  };
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Pyramids Assistant! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    setUserInput("");
    if (!message) return;
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(
      newMessages.map((msg) => {
        if ("sentTime" in msg) {
          return msg;
        } else {
          return {
            message: msg.message,
            sentTime: "just now",
            sender: msg.sender,
          };
        }
      })
    );

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };
  async function processMessageToChatGPT(chatMessages) {
    setLoading(true);
    // messages is an array of messages

    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
    setLoading(false);
  }

  return (
    <>
      <Card
        borderRadius={"xl"}
        bgColor={"Secondary.600"}
        bgSize={"cover"}
        backgroundImage={"/src/assets/img/chatBack.svg"}
        mb={2}
        height={"60vh"}
        w={{
          base: "60vw",
          md: "40vw",
          lg: "35vw",
          xl: "25vw",
        }}
        bottom={20}
        right={10}
        pos={"fixed"}
      >
        <CardHeader color={"white"}>
          <HStack justify={"space-between"}>
            <HomePageLogo />
            <CloseButton
              onClick={() => {
                setIsCloseClicked();
              }}
            />{" "}
          </HStack>
        </CardHeader>
        <Divider color={"Secondary.400"}></Divider>

        <VStack w={"full"} h={"46vh"} overflowY={"scroll"}>
          <VStack h={"full"} m={10} color={"white"}>
            <Heading w={"full"} textAlign={"center"} fontSize={"2xl"}>
              {" "}
              Welcome to Pyramids Assistance!{" "}
            </Heading>
            <Text
              textAlign={"center"}
              px={5}
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              I'm here to guide and assist you. How can I help you today?
            </Text>
          </VStack>

          {messages.map((p, index) => (
            <Flex
              w={"full"}
              key={index}
              flexDirection={p.sender === "user" ? "row-reverse" : "row"}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {p.sender != "system" ? (
                <Box borderRadius="md" maxW="70%" my={2} mx={5}>
                  <Box
                    borderRadius={"2xl"}
                    p={5}
                    mb={2}
                    bg={
                      p.sender === "user" ? "Secondary.600" : "whiteAlpha.700"
                    }
                    color={p.sender === "user" ? "white" : "Secondary.600"}
                  >
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      {p.message}
                    </Text>
                  </Box>

                  {/* Sender Icon  */}
                  {p.sender === "user" ? (
                    ""
                  ) : (
                    <HStack>
                      <Button
                        color={"Secondary.600"}
                        bg={"Auxiliary.600"}
                        fontSize={"2xl"}
                        size={"sm"}
                        borderRadius={5}
                        p={0}
                      >
                        <FluentBot_24Regular />{" "}
                      </Button>
                      <Heading
                        fontSize={"md"}
                        color={"white"}
                        fontWeight={"bold"}
                      >
                        {" "}
                        Pyramids
                      </Heading>
                    </HStack>
                  )}
                </Box>
              ) : (
                ""
              )}
            </Flex>
          ))}
        </VStack>

        <Box m={9}>
          <Box alignContent={"center"} textAlign={"center"} w={"full"} mb={2}>
            <BeatLoader
              loading={loading}
              color={"#000"}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
          <InputGroup alignItems={"center"}>
            <Input
              alignItems={"center"}
              _active={{ bg: "red" }}
              _focus={{ p: 6, bg: "white", border: "none" }}
              p={5}
              bg={"white"}
              placeholder="Type a message"
              variant="filled"
              value={userInput}
              size="md"
              onChange={(e) => setUserInput(e.target.value!)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend(userInput);
                }
              }}
            />

            {userInput != "" ? (
              <InputRightElement
                mt={0.5}
                mr={2}
                alignItems={"center"}
                onClick={() => handleSend(userInput)}
                _hover={{ color: "Primary.700" }}
              >
                <IconChatSend />
              </InputRightElement>
            ) : (
              <InputRightElement
                mt={0.5}
                mr={2}
                alignItems={"center"}
                _hover={{ color: "Primary.700" }}
              >
                <IconChatSendDisabled />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>
      </Card>
    </>
  );
};

export default ChatBot;
