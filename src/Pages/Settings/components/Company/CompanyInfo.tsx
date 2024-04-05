import { useEffect, useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
} from "@chakra-ui/react";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import useAuthStore from "../../../../hooks/Authentication/store";
import useGetCompanyById from "../../../../hooks/Settings/Company/useGetCompanyById";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import FinancialDetails from "./FinancialDetails/FinancialDetails";
import CompanyAddress from "./CompanyAddress/CompanyAddress";
import CompanyLogo from "./CompanyLogo/CompanyLogo";

const CompanyInfo = () => {
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Company Info");
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useAuthStore();
  // get company
  const {
    data: company,
    isError,
    isLoading,
  } = useGetCompanyById(user?.companyId || 0);
  console.log("company::", company);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const [activeTab, setActiveTab] = useState(" Details");
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
            color={activeTab === " Details" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab(" Details")}
          >
            Company Details
          </Tab>

          <Tab
            color={activeTab === "Financial" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Financial")}
          >
            Financial Details
          </Tab>

          <Tab
            color={activeTab === "Address" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Address")}
          >
            Company Address
          </Tab>
          <Tab
            color={activeTab === "Logo" ? "Primary.700" : "gray.500"}
            onClick={() => setActiveTab("Logo")}
          >
            Company Logo
          </Tab>
        </TabList>
      </Tabs>
      <Tabs w="full" index={selectedTab} onChange={handleTabChange}>
        <TabPanels>
          <TabPanel>
            <CompanyDetails company={company} />
          </TabPanel>

          <TabPanel>
            <FinancialDetails company={company} />
          </TabPanel>
          <TabPanel>
            <CompanyAddress company={company} />
          </TabPanel>
          <TabPanel>
            <CompanyLogo company={company} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default CompanyInfo;
