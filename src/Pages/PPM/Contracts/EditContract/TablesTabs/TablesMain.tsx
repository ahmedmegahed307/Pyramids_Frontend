import { useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
} from "@chakra-ui/react";
import RemindersTable from "./RemindersTable";
import InvoicesTable from "./InvoicesTable";
import VisitsTable from "./VisitsTable";
import { IContract } from "../../../../../models/Interfaces/IContract";

interface Props {
  contract: IContract;
}
const TablesMain = ({ contract }: Props) => {
  const [activeTab, setActiveTab] = useState("VISITS");

  return (
    <>
      <Flex
        h={"full"}
        direction={"column"}
        alignItems="center"
        mx="auto"
        px="4"
        w={"full"}
      >
        <Tabs h={"full"} w={"full"} variant="enclosed-colored">
          <TabList>
            <Tab
              color={activeTab === "VISITS" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("VISITS")}
              fontWeight={activeTab === "VISITS" ? "bold" : "normal"}
            >
              Visits
            </Tab>
            <Tab
              color={activeTab === "REMINDERS" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("REMINDERS")}
              fontWeight={activeTab === "REMINDERS" ? "bold" : "normal"}
            >
              Reminders
            </Tab>
            <Tab
              color={activeTab === "INVOICES" ? "Primary.500" : "gray.500"}
              onClick={() => setActiveTab("INVOICES")}
              fontWeight={activeTab === "INVOICES" ? "bold" : "normal"}
            >
              Invoices
            </Tab>
          </TabList>

          <TabPanels pt={5} h={"full"}>
            <TabPanel h={"full"}>
              <TableContainer>
                <VisitsTable
                  visits={
                    contract?.visits ?? []
                    // contract?.visits?.filter(
                    //   (v) => v.isGenerated == false || v.isGenerated == null
                    // ) || []
                  }
                />
              </TableContainer>
            </TabPanel>

            <TabPanel>
              <TableContainer>
                <RemindersTable
                  reminders={
                    contract?.reminders?.filter((a) => a.isActive == true) || []
                  }
                />
              </TableContainer>
            </TabPanel>

            <TabPanel>
              <TableContainer>
                <InvoicesTable />
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default TablesMain;
