import {
  Box,
  Flex,
  IconButton,
  Spacer,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  HStack,
  Stack,
  VStack,
  Heading,
  MenuGroup,
  MenuDivider,
  PopoverTrigger,
  Popover,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useGetClientById from "../../../hooks/Settings/Client/useGetClientById";
import BillIcon from "../../../assets/img/BillIcon";
import IconUser from "../../../assets/icons/IconUser";
import LogOutIcon from "../../../assets/icons/LogOutIcon";
import ThemeIcon from "../../../assets/icons/ThemeIcon";
import HelpIcon from "../../../assets/icons/HelpIcon";
import ContactsIcon from "../../../assets/icons/ContactsIcon";
interface Props {
  onSearch: (searchText: string) => void;
}
function ClientNav({ onSearch }: Props) {
  const { data: client } = useGetClientById(12);

  return (
    <>
      <Box w={"full"} as="nav" pt={5} mb={5}>
        <Flex alignItems={"center"} px={5}>
          <Heading fontSize={"22px"}>Page Title</Heading>
          <Spacer />

          <HStack spacing={0}>
            <Menu>
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Notifications"
                    icon={<BillIcon />}
                    variant="ghost"
                    fontSize="xl"
                    mx={5}
                    title="Notifications"
                    color={"Neutral.500"}
                    _hover={{ bg: "none", color: "Primary.700" }}
                  />
                </PopoverTrigger>
                {/* <Portal>
                  <PopoverContent
                    w={"360px"}
                    mr={12}
                    borderRadius={"2xl"}
                    boxShadow={"md"}
                    borderColor={"gray.50"}
                  >
                    <PopoverArrow ml={6} />
                    <PopoverHeader>
                      <HStack my={4}>
                        <Heading size={"sm"} pl={2}>
                          Notification
                        </Heading>
                        <Badge
                          size={"2xl"}
                          bg={"Primary.50"}
                          color={"Primary.700"}
                          borderRadius={"50%"}
                          px={3}
                          py={1}
                        >
                          200
                        </Badge>
                        <Spacer />
                        <Text color={"Primary.700"} pr={2}>
                          Mark as unread
                        </Text>
                      </HStack>
                    </PopoverHeader>
                    <PopoverBody>
                      <div>
                        <HStack>
                          <Avatar size={"md"} bg="Primary.700" />
                          <VStack align={"start"}>
                            <HStack>
                              <Text fontSize={"14px"}>
                                <strong>Ahmed Test</strong>
                              </Text>
                            </HStack>
                            <Text fontSize={"sm"} pl={1}>
                              15/10/2023 12:00
                            </Text>
                          </VStack>
                        </HStack>
                        <Divider my={1} />
                      </div>
                    </PopoverBody>

                    <PopoverFooter h={28}>
                      <Link to="/notifications" target="_blank">
                        <Button
                          px={6}
                          py={5}
                          mt={5}
                          ml={5}
                          size={"md"}
                          fontSize={"sm"}
                        >
                          View all notifications
                        </Button>
                      </Link>
                    </PopoverFooter>
                  </PopoverContent>
                </Portal> */}
              </Popover>
            </Menu>

            <Box pr={2}>
              <Menu>
                <MenuButton>
                  <Stack direction="row" align={"center"} spacing={1}>
                    <Avatar
                      size={"sm"}
                      bg={"Primary.500"}
                      textColor={"black"}
                      name={client?.name}
                      src="https://bit.ly/broken-lisdsdsdnk"
                    />
                    <ChevronDownIcon />
                  </Stack>
                </MenuButton>
                <MenuList borderRadius={10} p={5} w={"250px"} shadow={"sm"}>
                  <HStack
                    mb={2}
                    pl={1}
                    align={"center"}
                    alignContent={"center"}
                    height={"7vh"}
                    spacing={4}
                    // bgImage={"/src/assets/img/profileMenuBack.png"}
                  >
                    <Avatar
                      size={"sm"}
                      bg={"Primary.500"}
                      h={"30px"}
                      w={"30px"}
                      fontWeight={"bold"}
                      name={client?.name}
                      src="https://bit.ly/broken-lisdsdsdnk"
                    />
                    <VStack align={"start"} spacing={0}>
                      <Heading fontWeight={"lg"} fontSize={"md"}>
                        {client?.name}
                      </Heading>
                      <Text color={"rgba(134, 134, 135, 1)"}>
                        {"test@gmail.com"}
                      </Text>
                    </VStack>
                  </HStack>

                  <MenuGroup>
                    <Link to={"/clientPortal/settings/account"}>
                      <MenuItem
                        _hover={{ bg: "#EDEDED" }}
                        borderRadius={10}
                        h={12}
                        icon={<IconUser />}
                      >
                        {" "}
                        Profile
                      </MenuItem>
                    </Link>
                    <Link to="/clientPortal/settings/contacts">
                      <MenuItem
                        _hover={{ bg: "#EDEDED" }}
                        mt={1}
                        borderRadius={10}
                        h={12}
                        icon={<ContactsIcon />}
                      >
                        {" "}
                        Contacts
                      </MenuItem>
                    </Link>
                    <MenuItem
                      _hover={{ bg: "#EDEDED" }}
                      mt={1}
                      borderRadius={10}
                      h={12}
                      icon={<ThemeIcon />}
                    >
                      Theme
                    </MenuItem>
                    <MenuItem
                      _hover={{ bg: "#EDEDED" }}
                      my={1}
                      borderRadius={10}
                      h={12}
                      icon={<HelpIcon />}
                    >
                      Help
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider
                    w={"247px"}
                    ml={-5}
                    border={"1px solid rgba(0, 0, 0, 0.1)"}
                  />

                  <MenuItem
                    borderRadius={10}
                    h={12}
                    _hover={{ bg: "#EDEDED" }}
                    icon={<LogOutIcon />}
                  >
                    {" "}
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default ClientNav;
