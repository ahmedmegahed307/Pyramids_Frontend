import React from "react";
import {
  Box,
  Flex,
  useBreakpointValue,
  VStack,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../hooks/Authentication/store";
import IsLoading from "../GeneralComponents/IsLoading";

interface SubItemProps {
  text: string;
  url?: string;
}

interface SideBarItemProps {
  text: string;
  url?: string;
  icon?: React.ReactElement;
  subItems?: SubItemProps[];
}

const SideBarItem = ({ text, url, icon, subItems }: SideBarItemProps) => {
  const isExternalLink = !url;
  if (isExternalLink) {
    return (
      <Box
        w="full"
        fontWeight="normal"
        fontSize={"14px"}
        color="Neutral.500"
        _hover={{
          bg: "none",
          color: "Primary.700",
        }}
        _activeLink={{
          bg: "none",
          color: "Primary.700",
          borderRadius: "8",
        }}
        pl={2}
      >
        <Text>{text}</Text>
      </Box>
    );
  } else {
    // If it's a regular link, render a NavLink
    return (
      <ChakraLink
        w="full"
        as={NavLink}
        fontWeight="normal"
        fontSize={"14px"}
        color="Neutral.500"
        _hover={{
          bg: "none",
          color: "Primary.700",
        }}
        _activeLink={{
          bg: "none",
          color: "Primary.700",
          borderRadius: "8",
        }}
        to={url}
        pl={2}
      >
        <Text>{text}</Text>
      </ChakraLink>
    );
  }
};

const GlobalSettingsSideBar = () => {
  const { user } = useAuthStore();
  const isMobileNav = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (user?.id === null) {
    return <IsLoading />;
  }
  const NavItems = () => (
    <VStack
      h={"auto"}
      spacing={4}
      align="start"
      // style={{
      //   maxHeight: "calc(100vh - 40px)",
      //   overflowY: "auto",
      // }}
    >
      <Text fontWeight={"bold"} size={"lg"} fontSize={"22px"}>
        Global Settings
      </Text>
      <Box mb={10}>
        <Link to={"/dashboard"}>
          <HStack
            fontSize={"14px"}
            align={"flex-start"}
            color={"gray.500"}
            spacing={1}
          >
            <ArrowBackIcon mt={1} />
            <Text>Back</Text>
          </HStack>
        </Link>
      </Box>

      <SideBarItem
        text="Profile Settings"
        url={`/globalSettings/users/${user?.id}`}
      />
      <SideBarItem text="Company Settings" url="/globalSettings/company/info" />
      <SideBarItem text="Email Triggers" />

      <Divider />

      <SideBarItem text="Job Types" url="/globalSettings/jobTypes" />
      <SideBarItem text="Job Sub Types" url="/globalSettings/jobSubTypes" />

      <Divider />
      <SideBarItem
        text="Maintenance Sheets"
        url="/globalSettings/maintenanceSheet"
      />

      <Divider />

      <SideBarItem text="Products" url="/globalSettings/products" />

      <SideBarItem
        text="Product Categories "
        url="/globalSettings/productCategories"
      />
      <SideBarItem text="Warehouses" />
      <SideBarItem text="Engineer Stocks" />
      <SideBarItem text="Stock Movement" />

      <Divider />
      <SideBarItem text="Assets" url="/globalSettings/assets" />
      <SideBarItem text="Asset Models" url="/globalSettings/assetModels" />
      <SideBarItem text="Asset Types" url="/globalSettings/assetTypes" />
      <SideBarItem
        text="Asset Manufacturers"
        url="/globalSettings/assetManufacturers"
      />

      <Divider />
      <SideBarItem text="Theme" />

      <SideBarItem text="Custom Features" />
    </VStack>
  );

  return (
    <Box
      borderRight="1px solid"
      h="100vh"
      borderColor="gray.200"
      as="nav"
      bgColor={"white"}
      py={2}
      w="100%"
      overflowY="auto"
    >
      <Flex alignItems="center" mx="auto" px="4">
        {isMobileNav ? (
          <Menu>
            <MenuButton aria-label="Open menu" mt={4} ml={-3}>
              <HamburgerIcon fontSize={"4xl"} />
            </MenuButton>
            <MenuList>
              <NavItems />
            </MenuList>
          </Menu>
        ) : (
          <Flex direction="column" alignItems="center">
            <NavItems />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default GlobalSettingsSideBar;
