import {
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Heading,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Drawer,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import ExportToExcel from "../../../Excel/ExportToExcel";
import useCreateJobType from "../../../../hooks/Settings/JobType/useCreateJobType";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import useAuthStore from "../../../../hooks/Authentication/store";
import MaintenanceSheetList from "./MaintenanceSheetList";
import ArchivedMaintenanceSheetList from "./ArchivedMaintenanceSheetList";
import CreateMaintenanceSheet from "./CreateMaintenanceSheet";
import { MaintenanceSheet } from "../../../../models/Interfaces/MaintenanceSheet";
export const MSMockData: MaintenanceSheet[] = [
  {
    id: 1,
    title: "Title 1",
    visibleOn: "Before Travel",
    subtypes: [
      { id: 1, name: "subtype1" },
      { id: 2, name: "subtype2" },
    ],
    mandatory: false,
  },
  {
    id: 2,
    title: "Title 2",
    visibleOn: "Before Work",
    subtypes: [
      { id: 3, name: "subtype3" },
      { id: 4, name: "subtype4" },
    ],
    mandatory: false,
  },
  {
    id: 3,
    title: "Title 3",
    visibleOn: "On Close",
    subtypes: [
      { id: 5, name: "subtype5" },
      { id: 6, name: "subtype6" },
    ],
    mandatory: true,
  },
];
export const ArchivedMSMockData: MaintenanceSheet[] = [
  {
    id: 4,
    title: "Title 4",
    visibleOn: "On Close",
    mandatory: true,
  },
  {
    id: 5,
    title: "Title 5",
    visibleOn: "Before Work",
    mandatory: false,
  },
  {
    id: 6,
    title: "Title 6",
    visibleOn: "During Work",
    mandatory: true,
    isActive: false,
  },
];
const MaintenanceSheetMain = () => {
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };
  const [activeTab, setActiveTab] = useState("Active");
  const { user } = useAuthStore();

  // get MaintenanceSheet
  const { data: maintenanceSheet, isError, isLoading } = useJobType();

  //create
  const createModal = useDisclosure();

  const createMaintenanceSheetQuery = useCreateJobType(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: any) => {
    console.log("create PMS:", data);
  };

  //update
  const updateModal = useDisclosure();

  //delete
  const deleteModal = useDisclosure();
  const [deleteMaintenanceSheetId, setDeleteMaintenanceSheetId] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  console.log("deleteMaintenanceSheetId::", deleteMaintenanceSheetId);

  //restore
  const restoreModal = useDisclosure();
  const [restoreMaintenanceSheetId, setRestoreMaintenanceSheetId] = useState(0);
  console.log("restoreMaintenanceSheetId::", restoreMaintenanceSheetId);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading ml={1} size={"md"} mb={2}>
        Maintenance Sheets
      </Heading>

      <Tabs
        ml={1}
        orientation="horizontal"
        variant="line"
        index={selectedTab}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab
            color={activeTab === "Active" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Active")}
          >
            Active
          </Tab>
          <Tab
            color={activeTab === "Archived" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Archived")}
          >
            Archived
          </Tab>
        </TabList>
      </Tabs>
      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <MaintenanceSheetList
                maintenanceSheetList={MSMockData}
                setDeleteMaintenanceSheetId={setDeleteMaintenanceSheetId}
                createModal={createModal}
                updateModal={updateModal}
                deleteModal={deleteModal}
              />
            </TableContainer>
          </TabPanel>

          <TabPanel>
            <TableContainer>
              <ArchivedMaintenanceSheetList
                maintenanceSheetList={ArchivedMSMockData}
                setRestoreMaintenanceSheetId={setRestoreMaintenanceSheetId}
                restoreModal={restoreModal}
              />
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* Create Modal */}
      <Drawer
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <CreateMaintenanceSheet onSubmit={handleCreateForm} />
      </Drawer>
    </Card>
  );
};

export default MaintenanceSheetMain;
