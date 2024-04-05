import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Textarea,
  Button,
  ButtonGroup,
  IconButton,
  HStack,
} from "@chakra-ui/react";

import user from "../../../assets/img/user-1.svg";
import email from "../../../assets/img/email-2.svg";
import document from "../../../assets/img/document-1.svg";

import { FaForward } from "react-icons/fa";
import ArrowRight from "../../../assets/icons/ArrowRight";

export default function ContactUsForm() {
  return (
    <form>
      <FormControl>
        <FormLabel color="#495057">Full Name</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Image src={user} mt={5} boxSize="24px" />
          </InputLeftElement>
          <Input
            h="58px"
            type="text"
            placeholder="John Smith"
            bgColor={"gray.50"}
          />
        </InputGroup>
      </FormControl>

      <FormControl my={5}>
        <FormLabel color="#495057">Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Image src={email} mt={5} boxSize="24px" />
          </InputLeftElement>
          <Input
            h="58px"
            type="email"
            bgColor={"gray.50"}
            placeholder="ex:myname@example.com"
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel color="#495057">Message(optional)</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" paddingTop={5} paddingLeft={5}>
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
            rows={10}
          ></Textarea>
        </InputGroup>
      </FormControl>

      <HStack mt={10} spacing={0}>
        <Button
          borderRadius={5}
          backgroundColor="#33BCC5"
          color="#FFFFFF"
          h="55px"
          w="187px"
        >
          Send Message
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
      </HStack>
    </form>
  );
}
