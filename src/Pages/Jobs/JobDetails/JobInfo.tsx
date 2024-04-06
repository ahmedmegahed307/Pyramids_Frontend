import { useEffect, useState } from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Text,
  Card,
} from "@chakra-ui/react";
import JobDetails from "./Details/JobDetails";

import { Link, useParams } from "react-router-dom";

import useGetJobById from "../../../hooks/Jobs/useGetJobById";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import { ArrowBackIcon } from "@chakra-ui/icons";

import History from "./History/History";
import moment from "moment";

const JobInfo = () => {
  const pageTitleStore = usePageTitleStore();
  const { id } = useParams();
  const { data: job, isLoading, isError } = useGetJobById(parseInt(id));
  console.log("job:::", job);
  useEffect(() => {
    if (job) {
      pageTitleStore.setPageTitle(` N.${job?.id} - ${job?.jobStatus?.name} `);
    }
  }, [job]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const [activeTab, setActiveTab] = useState("Details");

  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Box mb={5}>
        <Link to={"/jobs"}>
          <HStack
            fontSize={"14px"}
            align={"flex-start"}
            color={"Neutral.500"}
            spacing={0}
            _hover={{ color: "Primary.700" }}
          >
            <ArrowBackIcon mt={1} />
            <Text>Back to job lists</Text>
          </HStack>
        </Link>
      </Box>
      <Tabs
        w={{
          base: "100%",
          lg: "60%",
        }}
        orientation="horizontal"
        variant="line"
        index={selectedTab}
        onChange={handleTabChange}
      >
        <TabList
          as="div"
          display="grid"
          gridTemplateColumns={{
            base: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          <Tab
            color={activeTab === "Details" ? "Primary.700" : "Neutral.500"}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </Tab>
          <Tab
            color={activeTab === "Sessions" ? "Primary.700" : "Neutral.500"}
            onClick={() => setActiveTab("Sessions")}
          >
            Sessions
          </Tab>
          <Tab
            color={activeTab === "Checklists" ? "Primary.700" : "Neutral.500"}
            onClick={() => setActiveTab("Checklists")}
          >
            Checklists
          </Tab>

          <Tab
            color={activeTab === "History" ? "Primary.700" : "Neutral.500"}
            onClick={() => setActiveTab("History")}
          >
            History
          </Tab>
        </TabList>
      </Tabs>
      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <JobDetails job={job} />
          </TabPanel>
          <TabPanel>
            {/* <SessionsMain data={job?.jobSessions ?? []} /> */}
          </TabPanel>
          <TabPanel>
            {/* <ChecklistsMain data={job?.checkists ?? []} /> */}
          </TabPanel>

          <TabPanel>
            <History
              history={
                job?.jobActions?.sort((a, b) => moment(b.id).diff(a.id)) ?? []
              }
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default JobInfo;
