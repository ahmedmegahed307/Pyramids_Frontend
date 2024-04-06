import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Card,
} from "@chakra-ui/react";
import ContractList from "./Contracts/ContractList";
import usePageTitleStore from "../../hooks/NavBar/PageTitleStore";
import ReminderList from "./Reminders/ReminderList";
import VisitList from "./Visits/VisitList";

const PPMMain = () => {
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("PPM");
  }, []);
  const [activeTab, setActiveTab] = useState("CONTRACTS");

  return (
    <Card mr={12} mb={5} p={10} pr={0} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={2}>
        PPMS
      </Heading>
      <Flex h={"full"} direction={"column"} alignItems="center" w={"full"}>
        <Tabs h={"full"} w={"full"} ml={-5}>
          <TabList>
            <Tab
              color={activeTab === "CONTRACTS" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("CONTRACTS")}
            >
              Contracts
            </Tab>
            <Tab
              color={activeTab === "REMINDERS" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("REMINDERS")}
            >
              Reminders
            </Tab>
            <Tab
              color={activeTab === "VISITS" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("VISITS")}
            >
              Visits
            </Tab>
          </TabList>

          <TabPanels h={"full"}>
            <TabPanel h={"full"}>
              <TableContainer>
                <ContractList />
              </TableContainer>
            </TabPanel>

            <TabPanel>
              <TableContainer>
                <ReminderList />
              </TableContainer>
            </TabPanel>

            <TabPanel>
              <TableContainer>
                <VisitList />
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Card>
  );
};

export default PPMMain;
