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
      >
        <SLABreachMonitor />
        <PendingInvoice />
      </Grid>
    </Box>
  );
};

export default Dashboard;
