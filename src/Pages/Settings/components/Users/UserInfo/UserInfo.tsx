import { useEffect, useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
} from "@chakra-ui/react";
import UserDetails from "./UserDetails/UserDetails";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../../../hooks/Authentication/store";
import useGetUserById from "../../../../../hooks/Settings/User/useGetUserById";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";
import usePageTitleStore from "../../../../../hooks/NavBar/PageTitleStore";
import UserPhoto from "./UserProfilePhoto/UserPhoto";

const UserInfo = () => {
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Profile Settings");
  }, []);
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetUserById(parseInt(id));

  const { user: currentUser } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const [activeTab, setActiveTab] = useState("Profile Details");
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <>
      <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
        <Tabs
          orientation="horizontal"
          variant="line"
          index={selectedTab}
          onChange={handleTabChange}
        >
          <TabList>
            <Tab
              color={
                activeTab === "Profile Details" ? "Primary.700" : "gray.500"
              }
              onClick={() => setActiveTab("Profile Details")}
            >
              {" "}
              Profile Details
            </Tab>

            {user?.userRoleId === 1 && user?.id === currentUser?.id && (
              <>
                <Tab
                  color={activeTab === "Photo" ? "Primary.700" : "gray.500"}
                  onClick={() => setActiveTab("Photo")}
                >
                  Profile Photo
                </Tab>
              </>
            )}
          </TabList>
        </Tabs>
        <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
          <TabPanels>
            <TabPanel>
              <UserDetails user={user} />
            </TabPanel>
            {user?.userRoleId === 1 && user?.id === currentUser?.id && (
              <TabPanel>
                <UserPhoto user={user} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
};

export default UserInfo;
