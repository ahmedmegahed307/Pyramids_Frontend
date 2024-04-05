import React from "react";
import {
  Box,
  Flex,
  VStack,
  Link as ChakraLink,
  Image,
  Text,
  HStack,
  Button,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Briefcase } from "../../../assets/icons/IconBriefcase";
import { Calendar } from "../../../assets/icons/IconCalendar";
import redFireLogo from "../../../assets/img/redFire.svg";
import PendingJobIcon from "../../../assets/icons/jobs/PendingJobIcon";
import OpenJobIcon from "../../../assets/icons/jobs/OpenJobIcon";
import AssignedJobIcon from "../../../assets/icons/jobs/AssignedJobIcon";
import ResolvedJobIcon from "../../../assets/icons/jobs/ResolvedJobIcon";
import ClosedJobIcon from "../../../assets/icons/jobs/ClosedJobIcon";
import CancelledJobIcon from "../../../assets/icons/jobs/CancelledJobIcon";

interface SubItemProps {
  text: string;
  url: string;
}

interface SideBarItemProps {
  text?: string;
  url?: string;
  icon: React.ReactElement;
  subItems?: SubItemProps[];
}

const ClientSideBar = () => {
  return (
    <Box
      borderRight="1px solid"
      h="92vh"
      borderColor="gray.200"
      as="nav"
      bg={"white"}
      py={2}
    >
      <Flex alignItems="center" maxW="7xl" mx="auto" px="4">
        <Flex direction="column" alignItems="center">
          <VStack h={"auto"} mb={20} spacing={4} w={60} align="start">
            <Box mb={4}>
              <HStack h={120}>
                <Image src={redFireLogo}></Image>
              </HStack>
            </Box>
            <SideBarItem
              icon={<Briefcase />}
              text="All Jobs"
              url="/clientPortal/jobs/all"
            />
            <SideBarItem
              icon={<PendingJobIcon />}
              text="Pending"
              url="/clientPortal/jobs/pending"
            />
            <SideBarItem
              icon={<OpenJobIcon />}
              text="Open"
              url="/clientPortal/jobs/open"
            />
            <SideBarItem
              icon={<AssignedJobIcon />}
              text="Assigned"
              url="/clientPortal/jobs/assigned"
            />

            <SideBarItem
              icon={<ResolvedJobIcon />}
              text="Resolved"
              url="/clientPortal/jobs/resolved"
            />
            <SideBarItem
              icon={<ClosedJobIcon />}
              text="Closed"
              url="/clientPortal/jobs/closed"
            />
            <SideBarItem
              icon={<CancelledJobIcon />}
              text="Cancelled"
              url="/clientPortal/jobs/cancelled"
            />

            <SideBarItem
              icon={<Calendar />}
              text="Scheduler"
              url="/clientPortal/scheduler"
            />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClientSideBar;

const SideBarItem = ({ text, url, icon, subItems }: SideBarItemProps) => {
  const isExternalLink = !url;
  if (isExternalLink) {
  }
  //const isReports = text === "Reports";
  const isDropdown = subItems && subItems.length > 0;

  const { isOpen, onToggle } = useDisclosure();
  if (isExternalLink) {
    return (
      <Box
        w="full"
        fontWeight="normal"
        fontSize={"sm"}
        color="Neutral.600"
        _hover={{
          bg: "Neutral.50",
        }}
        px={5}
        py={2}
        borderRadius="8"
        display="flex"
        alignItems="center"
      >
        <HStack
          w={"full"}
          _activeLink={{
            borderRight: "2px solid",
            borderColor: "Primary.700",
          }}
        >
          <Box>{icon}</Box>
          <Text fontWeight={"semibold"} color={"Neutral.500"}>
            {text}
          </Text>
        </HStack>
      </Box>
    );
  } else {
    return (
      <>
        {isDropdown ? (
          <>
            <Button
              onClick={onToggle}
              variant="ghost"
              w="full"
              fontWeight="normal"
              fontSize={"sm"}
              color="Neutral.600"
              justifyContent="space-between"
            >
              <Flex alignItems="center" justify="space-between" w="full">
                <Flex alignItems="center">
                  <HStack pl={1}>
                    <Box>{icon}</Box>
                    <Text fontWeight={"semibold"} color={"Neutral.500"}>
                      {text}
                    </Text>
                  </HStack>
                </Flex>
                <ChevronDownIcon transform={isOpen ? "rotate(180deg)" : ""} />
              </Flex>
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <VStack spacing={2} align="start" ml={5}>
                {subItems?.map((subItem) => (
                  <ChakraLink
                    key={subItem.url}
                    as={NavLink}
                    to={subItem.url}
                    fontWeight="semibold"
                    display="flex"
                    alignItems="center"
                    fontSize={"sm"}
                    color="grey"
                    _hover={{
                      color: "#1396ab",
                    }}
                    _activeLink={{
                      color: "#1396ab",
                    }}
                  >
                    {subItem.text}
                  </ChakraLink>
                ))}
              </VStack>
            </Collapse>
          </>
        ) : (
          <ChakraLink
            w="full"
            as={NavLink}
            fontWeight="normal"
            fontSize={"sm"}
            _hover={{
              bg: "Neutral.50",
            }}
            _activeLink={{
              bg: "Primary.50",
              color: "Primary.700",
              borderRadius: "8",
              borderColor: "#1396ab",
              borderRight: "none",
            }}
            to={url}
            px={5}
            py={2}
            borderRadius="8"
            display="flex"
            alignItems="center"
          >
            <HStack
              to={url}
              as={NavLink}
              w={"full"}
              _activeLink={{
                borderRight: "2px solid",
                borderColor: "Primary.700",
              }}
            >
              <Box>{icon}</Box>
              <Text fontWeight={"semibold"} color={"Neutral.500"}>
                {text}
              </Text>
            </HStack>
          </ChakraLink>
        )}
      </>
    );
  }
};
