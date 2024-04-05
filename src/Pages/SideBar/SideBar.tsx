import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Link as ChakraLink,
  Collapse,
  Button,
  useDisclosure,
  Text,
  Image,
  HStack,
  Divider,
  Icon,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Briefcase } from "../../assets/icons/IconBriefcase";
import { LogoSVG } from "../../assets/icons/logoSVG";
import { IconDashboard } from "../../assets/icons/IconDashboard";
import { People } from "../../assets/icons/IconPeople";
import { PPMIcon } from "../../assets/icons/IconPPM";
import { Calendar } from "../../assets/icons/IconCalendar";
import { Setting } from "../../assets/icons/IconSetting";
import { ReportsIcon } from "../../assets/icons/IconReports";
import useAuthStore from "../../hooks/Authentication/store";
import ArrowCollapseRight from "../../assets/icons/ArrowCollapseRight";
import ArrowCollapseLeft from "../../assets/icons/ArrowCollapseLeft";
import { SideBarStore } from "../../store/SideBarStore";
import IconUser from "../../assets/icons/IconUser";
import logo1 from "../../assets/img/logo1";
import LogoBackground from "../../assets/img/LogoBackground";
import LogoWithoutText from "../../assets/icons/LogoWithoutText";

const SideBar = () => {
  const { setIsSideBarCollapsed } = SideBarStore();

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isOpen, setIsOpen] = useState(isLargerThan800);

  useEffect(() => {
    setIsOpen(isLargerThan800);
  }, [isLargerThan800]);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Box
      borderRight="1px solid"
      h="92vh"
      borderColor="gray.200"
      bgColor={"white"}
      as="nav"
      style={{
        transition: "transform 0.7s ease-in-out",
        transform: isOpen ? "" : "translateX(5px)",
      }}
      pt={4}
      position={"relative"}
    >
      <Flex alignItems="center" justifyContent={"center"}>
        {isOpen ? (
          <Flex direction="column" alignItems="center" pt={20}>
            <Box
              position={"absolute"}
              top={6}
              left={"35%"}
              transform="translateX(-35%)"
            >
              <IconButton
                w={{
                  base: "auto",
                  md: "28",
                  lg: "36",
                  xl: "56",
                }}
                bg={"none"}
                icon={<LogoSVG />}
                onClick={() => navigate("/")}
                cursor={"pointer"}
                aria-label={""}
              ></IconButton>
            </Box>
            <Box position={"absolute"} top={5} right={0}>
              <IconButton
                onClick={() => {
                  setIsOpen(!isOpen);

                  setIsSideBarCollapsed(true);
                }}
                aria-label="arrow-collapse"
                icon={<ArrowCollapseLeft />}
                variant="ghost"
                fontSize="xl"
                pl={6}
                title="arrow-collapse"
                color={"Neutral.500"}
                _hover={{ bg: "none", color: "Primary.700" }}
              />
            </Box>
            <VStack
              spacing={4}
              w={{
                base: "auto",
                md: "32",
                lg: "40",
                xl: "56",
              }}
              align="start"
            >
              <SideBarItem
                icon={<IconDashboard />}
                text="Dashboard"
                url="/dashboard"
              />
              <SideBarItem icon={<Briefcase />} text="Jobs" url="/jobs" />

              <SideBarItem
                icon={<People />}
                text="Clients"
                url="/settings/clients"
              />

              <SideBarItem
                icon={<IconUser />}
                text="Users "
                url="/settings/users"
              />

              <SideBarItem icon={<PPMIcon />} text="PPM" url="ppm" />
              <SideBarItem
                icon={<Calendar />}
                text="Scheduler"
                url="/scheduler"
              />

              <SideBarItem
                icon={<ReportsIcon />}
                text="Reports"
                url="/"
                subItems={[
                  {
                    text: "Job Query Report",
                    url: "/reports/jobQuery",
                  },
                  // {
                  //   text: "Time Sheet Report",
                  //   url: "/reports/timeSheet",
                  // },
                ]}
              />

              <Divider></Divider>

              <SideBarItem
                icon={<Setting />}
                text="Global Settings"
                url={`/globalSettings/users/${user?.id}`}
              />
            </VStack>
          </Flex>
        ) : (
          <VStack spacing={8} w={10} align="start" mt={20}>
            <Box
              position={"absolute"}
              top={7}
              left="40%"
              transform="translateX(-40%)"
              boxSize={10}
            >
              <Icon
                as={LogoBackground}
                onClick={() => navigate("/")}
                cursor={"pointer"}
              ></Icon>
            </Box>
            <Box
              position={"absolute"}
              top={4}
              right={-6}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <IconButton
                onClick={() => {
                  setIsOpen(!isOpen);

                  setIsSideBarCollapsed(false);
                }}
                aria-label="arrow-collapse"
                icon={<ArrowCollapseRight />}
                variant="ghost"
                fontSize="xl"
                pl={14}
                mt={3}
                title="arrow-collapse"
                color={"Neutral.500"}
                _hover={{ bg: "none", color: "Primary.700" }}
              />
            </Box>

            <SideBarCollapsedItem icon={<IconDashboard />} url="/dashboard" />
            <SideBarCollapsedItem icon={<Briefcase />} url="/jobs" />
            <SideBarCollapsedItem icon={<People />} url="/settings/clients" />
            <SideBarCollapsedItem
              icon={<SettingsIcon fontSize="md" mx="2px" />}
              url="/settings/users"
            />
            <SideBarCollapsedItem icon={<PPMIcon />} url="ppm" />
            <SideBarCollapsedItem icon={<Calendar />} url="/scheduler" />
            <Divider></Divider>
            <SideBarCollapsedItem
              icon={<ReportsIcon />}
              url="/reports/jobQuery"
            />
            <Divider></Divider>
            <SideBarCollapsedItem
              icon={<Setting />}
              url={`/globalSettings/users/${user?.id}`}
            />
          </VStack>
        )}
      </Flex>
    </Box>
  );
};

export default SideBar;

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
const SideBarItem = ({ text, url, icon, subItems }: SideBarItemProps) => {
  const isExternalLink = !url;
  if (isExternalLink) {
  }
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
              px={{
                base: 1,
                md: 2,
                lg: 2,
                xl: 5,
              }}
              py={2}
              justifyContent="space-between"
            >
              <Flex alignItems="center" justify="space-between" w="full">
                <Flex alignItems="center">
                  <HStack>
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
            px={{
              base: 1,
              md: 2,
              lg: 2,
              xl: 5,
            }}
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
                borderRight: {
                  base: "none",
                  xl: "2px solid",
                },
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

const SideBarCollapsedItem = ({ url, icon }: SideBarItemProps) => {
  const isExternalLink = !url;
  if (isExternalLink) {
    return (
      <ChakraLink
        w="auto"
        fontWeight="normal"
        fontSize={"sm"}
        color="Neutral.500"
        _hover={{
          bg: "Neutral.50",
        }}
        display="flex"
      >
        <HStack w={"full"}>
          <Box>{icon}</Box>
        </HStack>
      </ChakraLink>
    );
  } else {
    return (
      <>
        <ChakraLink
          w="auto"
          as={NavLink}
          fontWeight="normal"
          fontSize={"sm"}
          color="Neutral.500"
          _hover={{
            bg: "Neutral.50",
          }}
          _activeLink={{
            bg: "Primary.50",
            color: "Primary.700",
            borderColor: "#1396ab",
          }}
          to={url}
          display="flex"
        >
          <HStack
            to={url}
            as={NavLink}
            w={"full"}
            _activeLink={{
              borderColor: "Primary.700",
            }}
          >
            <Box>{icon}</Box>
          </HStack>
        </ChakraLink>
      </>
    );
  }
};
