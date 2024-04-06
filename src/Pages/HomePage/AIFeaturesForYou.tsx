import {
  Stack,
  Heading,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  VStack,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import Cup from "../../assets/icons/Cup";
import Flower from "../../assets/icons/Flower";
import Sun from "../../assets/icons/Sun";

const AIFeaturesForYou = () => {
  return (
    <Box>
      <Stack
        bg={" #F6F7FC"}
        spacing={0}
        align={"center"}
        alignContent={"center"}
        pt={10}
      >
        <Heading>Join the fourth industrial </Heading>
        <Heading>revolution</Heading>
        <Text fontSize="lg" color={"gray.500"} pt={5}>
          See what AI can do for you{" "}
        </Text>
      </Stack>

      <Flex
        as="section"
        paddingTop="250px"
        backgroundColor="#F8F9FA"
        px={{ base: "20px", md: "20px", lg: "100px" }}
        paddingBottom="80px"
        flexDir={"column"}
        gap={10}
      >
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ]}
          px={{
            base: "10px",
            md: "5px",
            lg: "10px",
          }}
          gridColumnGap={"5"}
          backgroundColor="#F8F9FA"
          mt={-60}
        >
          <GridItem
            mb={{
              base: "10px",
              md: "none",
            }}
            minH={"350px"}
          >
            <Card h="100%" boxShadow={"sm"} p={5}>
              <CardBody>
                <VStack w="full" align={"start"}>
                  <Box ml={-6}>
                    <Image as={Cup} />
                  </Box>
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    my={7}
                    color="#495057"
                  >
                    Automated Job Logging
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                  >
                    Revolutionize Field Service with Voice-Activated Efficiency
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem
            minH={"350px"}
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"} p={5}>
              <CardBody>
                <VStack w="full" align={"start"}>
                  <Box ml={-6}>
                    <Image as={Flower} boxSize="64px" />
                  </Box>
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    my={7}
                    color="#495057"
                  >
                    Streamlined Operations
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                  >
                    Suggested Scheduling to Ensure the Best Technician Completes
                    the Job
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem
            minH={"350px"}
            mb={{
              base: "10px",
              md: "none",
            }}
          >
            <Card h="100%" boxShadow={"sm"} p={5}>
              <CardBody>
                <VStack w="full" align={"start"}>
                  <Box ml={-5}>
                    <Image as={Sun} boxSize="64px" />
                  </Box>
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    my={7}
                    color="#495057"
                  >
                    Next-Level Productivity
                  </Heading>
                  <Text
                    fontSize="16px"
                    fontWeight="light"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    color="#6C757D"
                  >
                    Auto-generate your Quoting and Invoicing Using our AI Tools
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default AIFeaturesForYou;
