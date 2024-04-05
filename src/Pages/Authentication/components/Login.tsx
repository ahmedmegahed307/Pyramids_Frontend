import {
  Image,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  Center,
  Spinner,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoSVG } from "../../../assets/icons/logoSVG";
import { getCurrentUser } from "../../../services/UserService/userService";
import loginCover from "../../../assets/img/LoginCover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import useLoginValidation from "../../../hooks/Authentication/useLoginValidation";
import { EUserRole } from "../../../models/Enums/EUserRole";
import useAuthStore from "../../../hooks/Authentication/store";
import IsLoading from "../../GeneralComponents/IsLoading";

const schema = z.object({
  email: z.string().email().min(1, { message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});
export type LoginInValidation = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginInValidation>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [backendErrorMessage, setBackendErrorMessage] = useState(undefined);
  const userStore = useAuthStore();
  const loginValidation = useLoginValidation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!userStore.user) {
        const user = await getCurrentUser();
        if (user) {
          userStore.setUser(user);
          navigate("/dashboard");
        }
      }
    })();
    setIsLoading(false);
  }, [userStore]);

  if (isLoading) {
    return <IsLoading />;
  }

  const handleLogin = async (data?: LoginInValidation) => {
    setIsLoading(true);
    try {
      var response = await loginValidation.mutateAsync(data);
      if (response.message === "Success_First_Login") {
        userStore.setIsFirstLogin(true);
      }
      localStorage.setItem("token", response.data);
      setBackendErrorMessage(undefined);
      var currentUser = await getCurrentUser();
      if (currentUser.userRoleId === EUserRole.Admin) {
        userStore.setUser(currentUser);
        navigate("/dashboard");
      } else {
        localStorage.removeItem("token");
        setBackendErrorMessage("You are not authorized to access this page");
      }
    } catch (error) {
      setBackendErrorMessage(error.response.data.message);
    }
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
          bg={"Primary.50"}
          display={{ base: "none", lg: "flex" }}
        >
          <Box position={"relative"}>
            <Box position={"absolute"} top={5} left={5}>
              <LogoSVG />
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
                textAlign={"center"}
                fontSize={"4xl"}
                fontWeight={"bold"}
                mt={-2}
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
          <Center pt={150}>
            <VStack align={"start"} spacing={5}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                Login
              </Text>
              <Text>Welcome back, please login to your account.</Text>
              <form onSubmit={handleSubmit(handleLogin)}>
                <FormControl
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  my={5}
                  isInvalid={!!errors.email}
                >
                  <RequiredFormLabel label="Email address" />

                  <Input
                    focusBorderColor="Primary.500"
                    {...register("email")}
                    className="FormControl"
                    bg={"Neutral.50"}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <FormErrorMessage color="red">
                      {errors.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  my={5}
                  w={{
                    base: "sm",
                    md: "lg",
                    lg: "sm",
                  }}
                  isInvalid={!!errors.password}
                >
                  <RequiredFormLabel label="Password" />
                  <Input
                    focusBorderColor="Primary.500"
                    type="password"
                    className="FormControl"
                    placeholder="Enter your password."
                    {...register("password")}
                    bg={"Neutral.50"}
                  />
                  {errors.password && (
                    <FormErrorMessage color="red">
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <HStack justify={"end"} mb={4}>
                  <Text
                    as={Link}
                    // to={"/forgot-password"}
                    to={"#"}
                    color={"Primary.700"}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Forgot Password?
                  </Text>
                </HStack>

                <Box mb={5}>
                  {backendErrorMessage != undefined && (
                    <Alert status="error" color="#444" borderRadius={4}>
                      <AlertIcon />
                      {backendErrorMessage}
                    </Alert>
                  )}
                </Box>
                <Button
                  w={"full"}
                  type={"submit"}
                  mt={-3}
                  isLoading={isLoading}
                  loadingText="Logging in"
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
                  Sign in
                </Button>
              </form>
              <HStack w={"full"}>
                <Text fontSize={"md"}>Don’t have an account?</Text>
                <Link to="/signup">
                  <Text fontSize={"md"} color={"#1396ab"}>
                    Create an account
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
