"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { LogoSVG } from "../../assets/icons/logoSVG";
import Logo1 from "../../assets/img/logo1";
import { useNavigate } from "react-router-dom";
interface Props {
  isLoggedin: boolean;
}
export default function Navbar({ isLoggedin }: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} color={"white"} />
              ) : (
                <HamburgerIcon w={5} h={5} color={"white"} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Logo1 />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {isLoggedin ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              onClick={() => navigate("/dashboard")}
              bg={"Primary.700"}
              color={"white"}
              _hover={{
                bg: "Primary.200",
              }}
            >
              Go to Dashboard
            </Button>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button as={"a"} variant={"link"} href={"/login"}>
              Sign In
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              bg={"Primary.700"}
              href={"/signup"}
              color={"white"}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{
          zIndex: 1000,
          position: "relative",
        }}
      >
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = "#eee";
  const linkHoverColor = "Primary.500";
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} pt={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                fontSize={{
                  base: "md",
                  md: "lg",
                  lg: "xl",
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "Primary.500" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
          color: "Primary.500",
        }}
      >
        <Text fontWeight={600} color={"#777"}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={5}
          borderStyle={"solid"}
          borderColor={"Primary.700"}
          align={"start"}
          color={"black"}
        >
          {children &&
            children.map((child) => (
              <>
                <Box as="a" key={child.label} py={2} href={child.href}>
                  {child.label}
                </Box>
                <Box as="a" key={child.label} py={2} href={child.href}>
                  {child.subLabel}
                </Box>
              </>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "About Us",
    children: [
      {
        label: "Pyramids Field Service",
        subLabel:
          "Pyramids Field Service is a leading provider of field service management software",
        href: "#",
      },
    ],
  },
  {
    label: "Contact Us",
    children: [
      {
        label: "Email",
        subLabel: "pyramids@support.com",
        href: "#",
      },
      {
        label: "Phone",
        subLabel: "+90 546 894 05 31",
        href: "#",
      },
    ],
  },
  {
    label: "Free Trial",
    href: "/signup",
  },
  {
    label: "Book a demo",
    href: "/signup",
  },
];
