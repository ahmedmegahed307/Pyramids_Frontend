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
import { Chart } from "@amcharts/amcharts5";
import JobChart from "./JobChart";
import { EUserRole } from "../../models/Enums/EUserRole";
interface Props {
  jobs: any;
}
const JobInfoCards = ({ jobs }: Props) => {
  const { data: users } = useEngineer(true);

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
            background: "linear-gradient(180deg,#ffe2d7 0%,#cc6751 100%)",
          }}
        >
          <Text color={"white"} pb={8}>
            Open Jobs
          </Text>
          <Heading size={"md"} color={"white"} fontWeight={"bold"}>
            {jobs?.filter((job) => job?.jobStatus?.name === "Open").length ?? 0}
          </Heading>
        </Card>

        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.700"} pb={8}>
            Assigned Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.name === "Assigned").length ??
              0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Resolved Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.name === "Resolved").length ??
              0}
          </Heading>
        </Card>

        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Cancelled Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.name === "Cancelled").length ??
              0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Pending Jobs
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {jobs?.filter((job) => job.jobStatus.name === "Pending").length ??
              0}
          </Heading>
        </Card>
        <Card minH={133} p={5} borderRadius={10} boxShadow={"none"}>
          <Text color={"Neutral.600"} pb={8}>
            Total Engineers
          </Text>
          <Heading size={"md"} color={"Neutral.600"} fontWeight={"bold"}>
            {users?.filter((user) => user.userRoleId === EUserRole.Engineer)
              .length ?? 0}
          </Heading>
        </Card>
      </Grid>
      <Card borderRadius={10} boxShadow={"none"}>
        <VStack spacing={12} pt={6}>
          <Heading size={"md"}>Traffic by job</Heading>
          <JobChart jobs={jobs} />
        </VStack>
      </Card>
    </Grid>
  );
};

export default JobInfoCards;
