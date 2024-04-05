import {
  Flex,
  Heading,
  Spacer,
  Button,
  useDisclosure,
  Drawer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Card,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AddIcon } from "@chakra-ui/icons";

import DeleteModal from "./DeleteUser";
import UsersList from "./UsersList";
import CreateUser, { CreateUserValidation } from "./CreateUser";
import useUser from "../../../../hooks/Settings/User/useUser";
import { useUserStore } from "../../../../hooks/Settings/User/store";
import InactiveUsersList from "./InactiveUsersList";
import User from "../../../../models/User";
import useCreateUser from "../../../../hooks/Settings/User/useCreateUser";
import useAuthStore from "../../../../hooks/Authentication/store";
import RestoreUser from "./RestoreUser";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";

const UsersMain = () => {
  const { isCreateModalOpen, setIsCreateModalOpen } = useUserStore();

  // get active usersLists
  const { data: activeUsersList, isLoading, isError } = useUser(true);
  const { data: inActiveUsersList } = useUser(false);
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createUserQuery = useCreateUser(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateUserValidation) => {
    console.log("data", data);
    const newUser: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userRoleId: parseInt(data.role),
      companyId: user?.companyId ?? 0,
      createdByUserId: user?.id ?? 0,
      phone: data.phoneNumber,
      id: 0,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
    };
    createUserQuery.mutate(newUser);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteUserId, setDeleteUserId] = useState(0);

  //retore
  const restoreModal = useDisclosure();
  const [restoreUserId, setRestoreUserId] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };
  const [activeTab, setActiveTab] = useState("Active");
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading ml={5} size={"md"} mb={2}>
        Users
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
            Active Users
          </Tab>
          <Tab
            color={activeTab === "InActive" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("InActive")}
          >
            Inactive Users
          </Tab>
        </TabList>
      </Tabs>

      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <UsersList
                createModal={createModal}
                data={activeUsersList || []}
                setDeleteUserId={setDeleteUserId}
                deleteModal={deleteModal}
              />
            </TableContainer>
          </TabPanel>

          <TabPanel>
            <TableContainer>
              <InactiveUsersList
                data={inActiveUsersList ?? []}
                setRestoreUserId={setRestoreUserId}
                restoreModal={restoreModal}
              />
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Create Modal */}
      <Drawer
        onClose={() => {
          setIsCreateModalOpen(false);
          createModal.onClose();
        }}
        isOpen={createModal.isOpen || isCreateModalOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <CreateUser onSubmit={handleCreateForm} />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        userId={deleteUserId}
      />

      {/* Restore Modal  */}
      <RestoreUser
        isOpen={restoreModal.isOpen}
        onClose={restoreModal.onClose}
        userId={restoreUserId}
      />
    </Card>
  );
};

export default UsersMain;
