import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Authentication/components/Login";
import Chat from "../Pages/Chat/components/Chat";

import JobList from "../Pages/Jobs/JobList/JobList";
import Operational from "../Pages/Operational/component/Operational";

import ClientList from "../Pages/Settings/components/Clients/ClientList";
import CompanyInfo from "../Pages/Settings/components/Company/CompanyInfo";
import UserInfo from "../Pages/Settings/components/Users/UserInfo/UserInfo";
import UsersMain from "../Pages/Settings/components/Users/UsersMain";
import SignUp from "../Pages/Authentication/components/SignUp";
import JobTypesMain from "../Pages/Settings/components/JobTypes/JobTypesMain";
import CreateJobMain from "../Pages/Jobs/CreateJob/CreateJobMain";
import AssetManufacturerMain from "../Pages/Settings/components/Asset/AssetManufacturer/AssetManufacturerMain";
import AssetTypeMain from "../Pages/Settings/components/Asset/AssetType/AssetTypeMain";
import AssetModelMain from "../Pages/Settings/components/Asset/AssetModel/AssetModelMain";
import AssetMain from "../Pages/Settings/components/Asset/MainAsset/AssetMain";
import ProductCategoryMain from "../Pages/Settings/components/Product/ProductCategory/ProductCategoryMain";
import ProductMain from "../Pages/Settings/components/Product/MainProduct/ProductMain";
import GlobalSettingsList from "../Pages/GlobalSettings/GlobalSettingsList";
import JobInfo from "../Pages/Jobs/JobDetails/JobInfo";
import ClientInfo from "../Pages/Settings/components/Clients/ClientInfo/ClientInfo";
import GlobalSettingsMain from "../Pages/GlobalSettings/GlobalSettingsMain";
import ClientContactsMain from "../Pages/Settings/components/Clients/ClientInfo/ClientContacts/ClientContactsMain";
import ClientSiteList from "../Pages/Settings/components/Clients/ClientInfo/ClientSites/ClientSiteList";
import ClientAssetsMain from "../Pages/Settings/components/Clients/ClientInfo/ClientAssets/ClientAssetsMain";
import JobSubTypesMain from "../Pages/Settings/components/JobSubTypes/JobSubTypesMain";
import JobQuery from "../Pages/Reports/JobQuery/JobQuery";
import EditJobMain from "../Pages/Jobs/EditJob/EditJobMain";
import SiteAssetsMain from "../Pages/Settings/components/Clients/ClientInfo/ClientSites/SiteAssets/SiteAssetsMain";
import PPMMain from "../Pages/PPM/PPMMain";
import AddContract from "../Pages/PPM/Contracts/AddContract";
import EditContract from "../Pages/PPM/Contracts/EditContract/EditContract";
import AllNotifications from "../Pages/NavBar/Notification/AllNotifications";
import TimeSheet from "../Pages/Reports/TimeSheet/TimeSheet";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomePageMain from "../Pages/HomePage/HomePageMain";
import ContactUs from "../Pages/HomePage/ContactUs/ContactUsPage";
import WhyChooseUsPage from "../Pages/HomePage/WhyChooseUs/WhyChooseUsPage";
import GetStarted from "../Pages/HomePage/GetStarted/GetStarted";
import BookADemoPage from "../Pages/HomePage/BookADemo/BookADemoPage";
import ClientPortalApp from "../Pages/ClientPortal/ClientPortalApp";
import PortalOpenJobs from "../Pages/ClientPortal/PortalJobs/PortalOpenJobs";
import PortalAssignedJobs from "../Pages/ClientPortal/PortalJobs/PortalAssignedJobs";
import PortalResolvedJobs from "../Pages/ClientPortal/PortalJobs/PortalResolvedJobs";
import PortalClosedJobs from "../Pages/ClientPortal/PortalJobs/PortalClosedJobs";
import PortalCancelledJobs from "../Pages/ClientPortal/PortalJobs/PortalCancelledJobs";
import PortalPendingJobs from "../Pages/ClientPortal/PortalJobs/PortalPendingJobs";
import ClientPortalContactsMain from "../Pages/ClientPortal/PortalSettings/Contacts/ClientPortalContactsMain";
import ClientPortalInfo from "../Pages/ClientPortal/PortalSettings/Account/ClientPortalInfo";
import ClientPortalNewRequest from "../Pages/ClientPortal/PortalNewRequest/ClientPortalNewRequest";
import ClientPortalLogin from "../Pages/ClientPortal/PortalAuth/ClientPortalLogin";
import PortalAllJobs from "../Pages/ClientPortal/PortalJobs/PortalAllJobs";
import ForgotPassword from "../Pages/Authentication/components/ForgotPassword";
import MaintenanceSheetMain from "../Pages/Settings/components/MaintenanceSheet/MaintenanceSheetMain";
import UpdateMaintenanceSheet from "../Pages/Settings/components/MaintenanceSheet/UpdateMaintenanceSheet/UpdateMaintenanceSheet";
import CalendarMain from "../Pages/Scheduler/CalendarMain";
import PortalCalendar from "../Pages/ClientPortal/PortalScheduler/PortalCalendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageMain />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jobs",
        element: <JobList />,
      },
      {
        path: "/jobs/addJob",
        element: <CreateJobMain />,
      },
      {
        path: "jobs/edit/:id",
        element: <EditJobMain />,
      },
      {
        path: "settings/clients/:id",
        element: <ClientInfo />,
      },
      {
        path: "/settings/clients",
        element: <ClientList />,
      },

      {
        path: "/settings/clients/:id/contacts",
        element: <ClientContactsMain />,
      },

      {
        path: "/settings/clients/:id/assets",
        element: <ClientAssetsMain />,
      },
      {
        path: "/settings/sites/:id/assets",
        element: <SiteAssetsMain />,
      },
      {
        path: "/settings/clients/:id/sites",
        element: <ClientSiteList />,
      },
      {
        path: "/settings/users",
        element: <UsersMain />,
      },

      {
        path: "/globalSettings/list",
        element: <GlobalSettingsList />,
      },
      {
        path: "/settings/assets/list",
        element: <AssetMain />,
      },

      {
        path: "/settings/assets/assetManufacturer/list",
        element: <AssetManufacturerMain />,
      },

      {
        path: "/settings/assets/assetType/list",
        element: <AssetTypeMain />,
      },
      {
        path: "/settings/assets/assetModel/list",
        element: <AssetModelMain />,
      },
      {
        path: "/settings/products/list",
        element: <ProductMain />,
      },
      {
        path: "/settings/products/productCategory/list",
        element: <ProductCategoryMain />,
      },
      {
        path: "/settings/users/:id",

        element: <UserInfo />,
      },
      {
        path: "/operational",
        element: <Operational />,
      },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      // },
      {
        path: "/scheduler",
        element: <CalendarMain />,
      },
      {
        path: "/ppm",
        element: <PPMMain />,
      },
      {
        path: "/chat",
        element: <Chat username="Ahmed" />,
      },

      {
        path: "/ppm/contracts/addContract",
        element: <AddContract />,
      },
      {
        path: "/ppm/contracts/:id/edit",
        element: <EditContract />,
      },

      {
        path: "/jobs/:id",
        element: <JobInfo />,
      },
      {
        path: "/reports/jobQuery",
        element: <JobQuery />,
      },
      {
        path: "/reports/timeSheet",
        element: <TimeSheet />,
      },
      {
        path: "/notifications",
        element: <AllNotifications />,
      },
    ],
  },

  {
    path: "/contactUs",
    element: <ContactUs />,
  },
  {
    path: "/whyChooseUs",
    element: <WhyChooseUsPage />,
  },
  {
    path: "/getStarted",
    element: <GetStarted />,
  },
  {
    path: "/bookADemo",
    element: <BookADemoPage />,
  },
  {
    path: "/globalSettings",
    element: <GlobalSettingsMain />,
    children: [
      { index: true, element: <UserInfo /> },
      {
        path: "/globalSettings/jobTypes",
        element: <JobTypesMain />,
      },
      {
        path: "/globalSettings/jobSubTypes",
        element: <JobSubTypesMain />,
      },
      {
        path: "/globalSettings/maintenanceSheet",
        element: <MaintenanceSheetMain />,
      },
      {
        path: "/globalSettings/maintenanceSheet/:id",

        element: <UpdateMaintenanceSheet />,
      },
      {
        path: "/globalSettings/users/:id",

        element: <UserInfo />,
      },
      {
        path: "/globalSettings/company/info",
        element: <CompanyInfo />,
      },
      {
        path: "/globalSettings/assets",
        element: <AssetMain />,
      },

      {
        path: "/globalSettings/assetManufacturers",
        element: <AssetManufacturerMain />,
      },

      {
        path: "/globalSettings/assetTypes",
        element: <AssetTypeMain />,
      },
      {
        path: "/globalSettings/assetModels",
        element: <AssetModelMain />,
      },
      {
        path: "/globalSettings/products",
        element: <ProductMain />,
      },
      {
        path: "/globalSettings/productCategories",
        element: <ProductCategoryMain />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/clientPortal",
    element: <ClientPortalApp />,
    children: [
      { index: true, element: <PortalOpenJobs /> },

      {
        path: "/clientPortal/newRequest",
        element: <ClientPortalNewRequest />,
      },
      {
        path: "/clientPortal/jobs/all",
        element: <PortalAllJobs />,
      },
      {
        path: "/clientPortal/jobs/pending",
        element: <PortalPendingJobs />,
      },
      {
        path: "/clientPortal/jobs/open",
        element: <PortalOpenJobs />,
      },
      {
        path: "/clientPortal/jobs/assigned",
        element: <PortalAssignedJobs />,
      },
      {
        path: "/clientPortal/jobs/resolved",
        element: <PortalResolvedJobs />,
      },
      {
        path: "/clientPortal/jobs/closed",
        element: <PortalClosedJobs />,
      },
      {
        path: "/clientPortal/jobs/cancelled",
        element: <PortalCancelledJobs />,
      },
      {
        path: "/clientPortal/scheduler",
        element: <PortalCalendar />,
      },
      {
        path: "/clientPortal/settings/account",
        element: <ClientPortalInfo />,
      },

      {
        path: "/clientPortal/settings/contacts",
        element: <ClientPortalContactsMain />,
      },
    ],
  },
  {
    path: "/clientPortal/login",
    element: <ClientPortalLogin />,
  },
]);
export default router;
