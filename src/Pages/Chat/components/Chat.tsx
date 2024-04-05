import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FaPaperPlane, FaVideo } from "react-icons/fa";

// Static user list
const users = [
  { name: "User 1", lastMessage: "Hello!" },
  { name: "User 2", lastMessage: "How are you?" },
  { name: "User 3", lastMessage: "Nice to meet you!" },
  { name: "User 4", lastMessage: "See you later!" },
  { name: "User 5", lastMessage: "Have a great day!" },
  { name: "User 6", lastMessage: "What's up?" },
  { name: "User 7", lastMessage: "I'm busy right now." },
  { name: "User 8", lastMessage: "Let's catch up soon!" },
];

interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  username: string;
}

const Chat = ({ username }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { colorMode } = useColorMode();
  const bubbleColor = useColorModeValue("gray.200", "gray.700");
  const selectedUserColor = "gray.100";

  const [selectedUser, setSelectedUser] = useState<string | null>(
    users[0].name
  );

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && selectedUser) {
      const message: Message = {
        user: username,
        text: newMessage.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const handleUserClick = (user: string) => {
    setSelectedUser(user);
  };

  return (
    <Flex mt={20}>
      <Box width="30%" p={4} bg="white" overflowY="auto">
        <VStack align="start" spacing={2} width="100%">
          <Text color={"gray.500"} fontWeight="bold">
            Chat List:
          </Text>
          {users.map((user, index) => (
            <Box
              key={user.name}
              onClick={() => handleUserClick(user.name)}
              p={2}
              cursor="pointer"
              bg={
                selectedUser === user.name ? selectedUserColor : "transparent"
              }
              borderRadius="md"
              borderBottomWidth={index !== users.length - 1 ? "1px" : 0}
              borderBottomColor="gray.300"
              _hover={{
                bg: selectedUser === user.name ? selectedUserColor : "gray.100",
              }}
              width="100%"
            >
              <Text>{user.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.lastMessage}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box flex="1" display="flex" flexDirection="column" height="100%">
        {selectedUser ? (
          <Box flex="1" overflowY="auto" p={4}>
            {messages.map((message, index) => (
              <Flex
                key={index}
                justifyContent={
                  message.user === username ? "flex-end" : "flex-start"
                }
                my={2}
              >
                <Box
                  px={4}
                  py={2}
                  borderRadius="lg"
                  bg={bubbleColor}
                  color={colorMode === "dark" ? "white" : "inherit"}
                >
                  {message.user !== username && (
                    <Box as="span" mr={2}>
                      <FaPaperPlane />
                    </Box>
                  )}
                  {message.text}
                </Box>
              </Flex>
            ))}
          </Box>
        ) : (
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={bubbleColor}
            color={colorMode === "dark" ? "white" : "inherit"}
            fontWeight="bold"
            p={4}
          >
            Select a user to start chatting
          </Box>
        )}

        {selectedUser && (
          <Flex mt="auto" p={4} alignItems="center" justifyContent="flex-end">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
              mr={2}
            />
            <IconButton
              aria-label="Send"
              color={"green"}
              icon={<FaPaperPlane />}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
            />
            <Button ml={2} leftIcon={<FaVideo />} colorScheme="teal">
              Video Call
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Chat;
