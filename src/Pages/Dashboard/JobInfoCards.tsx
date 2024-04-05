import {
  Card,
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import React from "react";
import DashboardChart from "../../assets/icons/DashboardChart";
import { FaCircle } from "react-icons/fa";
import useAdminJobs from "../../hooks/Jobs/useAdminJobs";
import useEngineer from "../../hooks/Settings/User/useEngineer";
interface Props {
  jobs: any;
}
const JobInfoCards = ({ jobs }: Props) => {
  const { data: users } = useEngineer(true);

  // Calculate job percentages
  const calculateJobPercentage = (status) => {
    if (jobs) {
      const totalJobs = jobs.length;
      const matchingJobs = jobs?.filter(
        (job) => job.jobStatus.status === status
      );
      const count = matchingJobs.length;
      const percentage = (count / totalJobs) * 100;
      return percentage.toFixed(1); // Round to one decimal place
    }
    return 0;
  };
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "2fr 1.5fr" }}
      gap={10}
      p={2}
      mb={5}
    >
      <Grid templateColumns={{ base: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={4}>
        <Card
          borderRadius={10}
          boxShadow={"none"}
          p={5}
          minH={133}
          style={{
            background: "linear-gradient(180deg, #02A5B0 0%, #ACDDE1 100%)",
          }}
        >
          <Text color={"white"} pb={8}>
            Open Jobs
          </Text>
          <Heading size={"md"} color={"white"} fontWeight={"bold"}>
            {jobs?.filter((job) => job?.jobStatus?.status === "Open").length ??
              0}
          </Heading>
        </Card>

        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.700"} pb={8}>
            Assigned Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.status === "Assigned")
              .length ?? 0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Closed Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.status === "Closed").length ??
              0}
          </Heading>
        </Card>

        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Cancelled Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.status === "Cancelled")
              .length ?? 0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Pending Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.status === "Pending").length ??
              0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Total Engineers
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {users?.filter((user) => user.userRoleId === 5).length ?? 0}
          </Heading>
        </Card>
      </Grid>
      <Card borderRadius={10} boxShadow={"none"} pb={10}>
        <HStack justifyContent="space-around">
          <VStack spacing={12} pt={6} ml={-4}>
            <Heading size={"md"}>Traffic by job</Heading>
            <Image as={DashboardChart} alt="chart" />
          </VStack>
          <VStack alignItems="flex-start" pt={16}>
            <HStack>
              <FaCircle color={"#66CDD3"} size={7} />
              <Text>Open </Text>
            </HStack>
            <HStack>
              <FaCircle color={"#A1E3CB"} size={7} />
              <Text>Assigned </Text>
            </HStack>
            <HStack>
              <FaCircle color={"#B1E3FF"} size={7} />
              <Text>Resvoled </Text>
            </HStack>
            <HStack>
              <FaCircle color={"#A8C5DA"} size={7} />
              <Text>Closed </Text>
            </HStack>
            <HStack>
              <FaCircle color={"#292A2B"} size={7} />
              <Text>Cancelled </Text>
            </HStack>
            <HStack>
              <FaCircle color={"#E2E2E2"} size={7} />
              <Text>Pending </Text>
            </HStack>
          </VStack>

          <VStack pt={16}>
            <Text>{calculateJobPercentage("Open")}%</Text>
            <Text>{calculateJobPercentage("Assigned")}%</Text>
            <Text>{calculateJobPercentage("Resolved")}%</Text>
            <Text>{calculateJobPercentage("Closed")}%</Text>
            <Text>{calculateJobPercentage("Cancelled")}%</Text>
            <Text>{calculateJobPercentage("Pending")}%</Text>
          </VStack>
        </HStack>
      </Card>
    </Grid>
  );
};

export default JobInfoCards;
