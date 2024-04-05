"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Spacer,
  Image,
  Card,
  CardBody,
} from "@chakra-ui/react";
import testominalCover from "../../../assets/img/testominal-cover.png";
import HomePageLogo from "../../../assets/img/HomePageLogo";

export default function ClientPortalLogin() {
  return (
    <Card
      backgroundImage={testominalCover}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      h={"100vh"}
    >
      <CardBody
        style={{
          background: "rgba(6, 81, 80, 0.4)",
        }}
      >
        <HStack ml={10}>
          <Image as={HomePageLogo} boxSize="43.85px" />
        </HStack>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={20}>
          <Stack align={"center"} whiteSpace={"nowrap"}>
            <Heading fontSize={"4xl"} color={"white"}>
              Welcome to Pyramids Client Portal
            </Heading>
            <Heading fontSize={"4xl"} color={"white"}>
              Sign in to your account
            </Heading>
            <HStack align={"start"}>
              <Text fontSize={"lg"} color={"white"} align={"start"}>
                to enjoy all of our cool{" "}
                <span
                  style={{
                    color: "#FFD700",
                  }}
                >
                  features
                </span>
                ✌️
              </Text>
            </HStack>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Spacer />
                  <Text color={"Primary.700"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={"Primary.700"}
                  color={"white"}
                  _hover={{
                    bg: "Primary.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
