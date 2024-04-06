import { LockIcon } from "@chakra-ui/icons";
import {
  Image,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  Center,
  IconButton,
  Select,
  FormErrorMessage,
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Company from "../../../models/Company";
import { LogoSVG } from "../../../assets/icons/logoSVG";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import { CompanySize } from "../../../models/Enums/CompanySize";
import SignUpModel from "../../../models/SignUp";
import loginCover from "../../../assets/img/LoginCover";
import useAuthStore from "../../../hooks/Authentication/store";
import { getCurrentUser } from "../../../services/UserService/userService";
import { login, signup } from "../../../services/AuthService/authService";
import useSignUpValidation from "../../../hooks/Authentication/useSignUpValidation";
import LogoWithoutText from "../../../assets/icons/LogoWithoutText";
const schema = z.object({
  companyName: z
    .string()
    .min(3, { message: "Company Name must be at least 3 characters" }),
  firstName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" }),
  email: z.string().email().min(1, { message: "Invalid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Passwords aren't identical" }),
  companySize: z.string().min(1, { message: "Company Size is Required" }),
});
export type SignUpValidation = z.infer<typeof schema>;
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpValidation>({
    resolver: zodResolver(schema),
  });
  const signUpValidation = useSignUpValidation();

  const handleFormSubmit = async (data: SignUpValidation) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords aren't identical",
        icon: "error",
      });
      return;
    }
    setIsLoading(true);
    await signUpValidation.mutateAsync(data);
    setIsLoading(false);
  };
  return (
    <>
      <Flex
        flexDir={{
          base: "column",
          lg: "row",
        }}
      >
        <Box
          w={{
            base: "100%",
            lg: "60%",
            xl: "70%",
          }}
          minH={"100vh"}
          bgSize={"cover"}
          bg={"Primary.100"}
          display={{ base: "none", lg: "flex" }}
        >
          <Box position={"relative"}>
            <Box position={"absolute"} top={5} left={5}>
              <HStack>
                <LogoWithoutText />
              </HStack>
            </Box>
            <Box
              position={"absolute"}
              left={{
                lg: "30%",
                xl: "200",
              }}
              top={10}
            >
              <Image as={loginCover} alt="cover" />
              <Text
                color={"white"}
                textAlign={"center"}
                fontSize={"4xl"}
                fontWeight={"bold"}
                mt={-20}
              >
                Smart Software, Smarter Service
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          bg={"white"}
          minH={"100vh"}
          w={{
            base: "100%",
            lg: "40%",
            xl: "30%",
          }}
        >
          <Box
            display={{
              base: "flex",
              lg: "none",
            }}
            pt={10}
            pl={5}
          >
            <LogoSVG />
          </Box>

          <Center pt={70}>
            <VStack spacing={5}>
              <Heading textAlign={"start"} fontWeight={"black"} size={"lg"}>
                Sign up for free trial!
              </Heading>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  isInvalid={!!errors.companyName}
                >
                  <RequiredFormLabel label="Company Name" />
                  <Input type="text" {...register("companyName")} />
                  {errors.companyName && (
                    <FormErrorMessage color="red">
                      {errors.companyName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  mt={5}
                  isInvalid={!!errors.firstName}
                >
                  <RequiredFormLabel label="First Name" />
                  <Input type="text" {...register("firstName")} />
                  {errors.firstName && (
                    <FormErrorMessage color="red">
                      {errors.firstName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  mt={5}
                  isInvalid={!!errors.lastName}
                >
                  <RequiredFormLabel label="Last Name" />
                  <Input type="text" {...register("lastName")} />
                  {errors.lastName && (
                    <FormErrorMessage color="red">
                      {errors.lastName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  color={"Primary.500"}
                  mt={5}
                  isInvalid={!!errors.email}
                >
                  <HStack>
                    <Input
                      color={"black"}
                      className="FormControl"
                      placeholder="enter  email address..."
                      {...register("email")}
                    />
                  </HStack>
                  {errors.email && (
                    <FormErrorMessage color="red">
                      {errors.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  color={"Primary.500"}
                  mt={5}
                  isInvalid={!!errors.password}
                >
                  {" "}
                  <HStack>
                    <Input
                      color={"black"}
                      type="password"
                      className="FormControl"
                      placeholder="Enter your password..."
                      {...register("password")}
                    />
                  </HStack>
                  {errors.password && (
                    <FormErrorMessage color="red">
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  color={"Primary.500"}
                  mt={5}
                  isInvalid={!!errors.confirmPassword}
                >
                  <HStack>
                    <Input
                      color={"black"}
                      type="password"
                      className="FormControl"
                      placeholder="confirm password"
                      {...register("confirmPassword")}
                    />
                  </HStack>
                  {errors.confirmPassword && (
                    <FormErrorMessage color="red">
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  pb={5}
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  mt={5}
                  isInvalid={!!errors.companySize}
                >
                  <Select
                    placeholder="--Select company size--"
                    {...register("companySize")}
                  >
                    <option value={CompanySize.UP_TO_5_USERS}>
                      Up to 5 users
                    </option>
                    <option value={CompanySize.UP_TO_10_USERS}>
                      Up to 10 users
                    </option>
                    <option value={CompanySize.UP_TO_11_PLUS_USERS}>
                      11+ users
                    </option>
                  </Select>
                  {errors.companySize && (
                    <FormErrorMessage color="red">
                      {errors.companySize.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                {/* <Button
                type="submit"
                colorScheme="Primary"
                w={"full"}
                bg={"Primary.700"}
                mt={5}
                isLoading={isLoading}
                loadingText="Signing up"
                spinner={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="Neutral.300"
                    color="Primary.700"
                  />
                }
              >
                Sign Up
              </Button> */}
                <Button
                  mt={2}
                  type="submit"
                  w={"full"}
                  spinner={
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="Neutral.300"
                      color="Primary.700"
                    />
                  }
                  _hover={{
                    bg: "Primary.500",
                  }}
                >
                  Sign Up
                </Button>
              </form>
              <Link to="/login">
                <Text size={"md"} color={"Primary.500"}>
                  Already have an account?
                </Text>
              </Link>
            </VStack>
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
