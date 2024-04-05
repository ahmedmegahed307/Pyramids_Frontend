import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Card,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import ClientDetails from "./ClientDetails/ClientDetails";
import useGetClientById from "../../../../../hooks/Settings/Client/useGetClientById";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";
import ClientFinancial from "./ClientFinancial/ClientFinancial";

const ClientInfo = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  //get client
  const { id } = useParams();
  const { data: client, isLoading, isError } = useGetClientById(parseInt(id));
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
          {/* <Tab
            color={activeTab === "Sites" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Sites")}
          >
            Sites
          </Tab> */}
        </TabList>
      </Tabs>

      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <ClientDetails client={client} />
          </TabPanel>
          <TabPanel>
            <ClientFinancial client={client} />
          </TabPanel>
          {/* <TabPanel>
            <ClientSiteList
              sites={client.sites.filter((a) => a.isActive) ?? []}
              clientId={client.id}
            />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default ClientInfo;
