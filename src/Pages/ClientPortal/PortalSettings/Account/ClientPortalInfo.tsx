import { useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Card,
} from "@chakra-ui/react";

import useGetClientById from "../../../../hooks/Settings/Client/useGetClientById";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import ClientDetails from "../../../Settings/components/Clients/ClientInfo/ClientDetails/ClientDetails";
import ClientFinancial from "../../../Settings/components/Clients/ClientInfo/ClientFinancial/ClientFinancial";

const ClientPortalInfo = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const { data: client, isLoading, isError } = useGetClientById(12);
  console.log("client::", client);
  const tabColor = useColorModeValue("#419ca3", "teal.300");
  const [activeTab, setActiveTab] = useState("General Details");
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Tabs
        orientation="horizontal"
        variant="line"
        index={selectedTab}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab
            color={activeTab === "General Details" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("General Details")}
          >
            General Details
          </Tab>

          <Tab
            color={
              activeTab === "Financial Details" ? "Primary.700" : "gray.500"
            }
            onClick={() => setActiveTab("Financial Details")}
          >
            Financial Details
          </Tab>
        </TabList>
      </Tabs>

      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <ClientDetails client={client} isPortalAccess={true} />
          </TabPanel>
          <TabPanel>
            <ClientFinancial client={client} isPortalAccess={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default ClientPortalInfo;
