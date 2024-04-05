import {
  Card,
  CardBody,
  HStack,
  Heading,
  Spacer,
  Select,
  Input,
  IconButton,
} from "@chakra-ui/react";
import JobsData from "./Jobs/JobsData";
import { useEffect } from "react";
import EngineerActivity from "./EngineerActivity/EngineerActivity";
import Productivity from "./Productivity/Productivity";
import CustomerSatisfaction from "./CustomerSatisfaction/CustomerSatisfaction";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Calendar from "./Calendar/Calendar";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
export default function Operational() {
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle(" Overview");
  }, []);
  return (
    <>
      <HStack spacing={4} mx={2}>
        <Productivity />

        <EngineerActivity />

        <JobsData />
      </HStack>
      <HStack m={4}>
        <Card w={"auto"} borderRadius={"2xl"} variant={"outline"} width={"60%"}>
          <HStack>
            <Heading ml={5} size={"sm"} fontWeight={"bold"} pl={2}>
              Timeline
            </Heading>
            <IconButton
              aria-label=""
              icon={<ChevronLeftIcon />}
              variant="outline"
              borderColor={"Neutral.300"}
              fontSize="3xl"
              title="message"
              color={"Neutral.500"}
              _hover={{ bg: "none", color: "Primary.700" }}
            />

            <Input
              w={160}
              placeholder="September, 2023"
              size={"md"}
              pl={5}
              pt={1}
              borderRadius={"8px"}
              color={"#8D8D8D"}
              fontWeight={"bold"}
            />
            <IconButton
              aria-label=""
              icon={<ChevronRightIcon />}
              variant="outline"
              borderColor={"Neutral.300"}
              fontSize="3xl"
              title="message"
              color={"Neutral.500"}
              _hover={{ bg: "none", color: "Primary.700" }}
            />
            <Spacer />
            <Select
              w={100}
              placeholder="Daily"
              pt={2}
              pr={2}
              size={"md"}
              borderRadius={"8px"}
              color={"#8D8D8D"}
              fontWeight={"bold"}
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </Select>
          </HStack>
          <CardBody>
            <Calendar />
          </CardBody>
        </Card>
        <Spacer />
        <CustomerSatisfaction />
      </HStack>
    </>
  );
}
