import { useEffect } from "react";
import usePageTitleStore from "../../hooks/NavBar/PageTitleStore";
import useAdminJobs from "../../hooks/Jobs/useAdminJobs";
import {
  Heading,
  Grid,
  Card,
  Box,
  Spinner,
  Text,
  GridItem,
} from "@chakra-ui/react";
import JobInfoCards from "./JobInfoCards";
import SLABreachMonitor from "./SLABreachMonitor";
import PendingInvoice from "./PendingInvoice";
import JobChart from "./JobChart";
import RecentJobs from "./RecentJobs";

const Dashboard = () => {
  const { data: jobs, isLoading, isError } = useAdminJobs(true);

  return (
    <Box mr={8}>
      <Heading fontSize={18} pl={2}>
        Overview
      </Heading>
      <JobInfoCards jobs={jobs ?? []} />
      <Card></Card>
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1.5fr" }}
        gap={10}
        p={2}
        mb={5}
      ></Grid>

      <Card mx={"1.5"} p={5} borderRadius={10} mb={5} boxShadow={"none"}>
        <Text fontWeight={"bold"} size={"md"} p={2} pl={7}>
          Recent Jobs
        </Text>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="Neutral.300"
              color="Primary.700"
            />
          </Box>
        ) : (
          <RecentJobs data={jobs?.slice(0, 5) ?? []} />
        )}
      </Card>
    </Box>
  );
};

export default Dashboard;
