import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  HStack,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-1.svg";

interface Props {
  heading: string;
  route: string;
  backgroundImageName?: string | "";
}

function HomePageHeading({ heading, route, backgroundImageName }: Props) {
  return (
    <>
      <Flex
        as="section"
        w="full"
        h="431.89px"
        backgroundImage={backgroundImageName}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <VStack
          style={{
            background:
              "linear-gradient(88.44deg, #004549 19.18%, rgba(1, 139, 148, 0.67) 97.65%)",
          }}
          w={"full"}
        >
          <HStack p="84px" w="full" as={Link} to="/">
            <Image src={logo} w="43.85px" h="25.95px" />
            <Text
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="700"
              color="#FFFFFF;"
            >
              Pyramids
            </Text>
          </HStack>

          <HStack w="full">
            <VStack w="full" alignItems="start" paddingLeft="129px">
              <Box borderLeft="8px solid #00ABB6" padding="23px">
                <Heading
                  color="#FFFFFF"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="700"
                >
                  {heading}
                </Heading>
              </Box>
              <Breadcrumb
                spacing="8px"
                separator={<ChevronRightIcon color="gray.500" />}
                paddingLeft="5"
              >
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/" color="#CED4DA">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  {/* <BreadcrumbLink as={Link} to={`/${route}`} color="#FFFFFF"> */}
                  <BreadcrumbLink as={Link} to={"#"} color="#FFFFFF">
                    {heading}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </VStack>
          </HStack>
        </VStack>
      </Flex>
      <Flex
        clipPath="polygon(67% 15%, 100% 83%, 100% 100%, 0% 100%)"
        as="section"
        w="full"
        h="135px"
        marginTop="-134px"
      >
        <Box backgroundColor="#F8F9FA" w="full" h="135px"></Box>
      </Flex>
    </>
  );
}

export default HomePageHeading;
