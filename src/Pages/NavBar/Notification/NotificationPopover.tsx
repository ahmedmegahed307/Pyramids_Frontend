import {
  HStack,
  VStack,
  Text,
  Avatar,
  Badge,
  Button,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import useNotification from "../../../hooks/Notification/useNotification";
import { IconBillOn } from "../../../assets/icons/IconBillOn";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import BillIcon from "../../../assets/img/BillIcon";

const NotificationPopover = () => {
  const { data: notifications, isLoading, isError } = useNotification();

  if (isError) return <IsError />;

  return (
    <Popover>
      <PopoverTrigger>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="Neutral.300"
            color="Primary.700"
            size="md"
            mx={5}
          />
        ) : (
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
        )}
      </PopoverTrigger>
      <Portal>
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
                {notifications?.length}
              </Badge>
              <Spacer />
              <Text color={"Primary.700"} pr={2}>
                Mark as unread
              </Text>
            </HStack>
          </PopoverHeader>
          <PopoverBody>
            {notifications?.slice(0, 5).map((notification) => (
              <div key={notification.id}>
                <HStack>
                  <Avatar size={"md"} bg="Primary.700" />
                  <VStack align={"start"}>
                    <HStack>
                      <Text fontSize={"14px"}>
                        <strong>{notification?.userFullName}</strong>{" "}
                        {notification?.message}{" "}
                      </Text>
                    </HStack>
                    <Text fontSize={"sm"} pl={1}>
                      {moment(notification?.createdAt).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </Text>
                  </VStack>
                </HStack>
                <Divider my={1} />
              </div>
            ))}
          </PopoverBody>

          <PopoverFooter h={28}>
            <Link to="/notifications" target="_blank">
              <Button px={6} py={5} mt={5} ml={5} size={"md"} fontSize={"sm"}>
                View all notifications
              </Button>
            </Link>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default NotificationPopover;
