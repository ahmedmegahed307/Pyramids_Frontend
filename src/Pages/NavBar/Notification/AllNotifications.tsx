import moment from "moment";
import React, { useEffect, useState } from "react";

import { Avatar, HStack, VStack, Text, Divider, Card } from "@chakra-ui/react";
import useNotification from "../../../hooks/Notification/useNotification";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";

const AllNotifications = () => {
  const { data: notifications, isLoading, isError } = useNotification();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      {notifications?.map((notification) => (
        <>
          <HStack py={2} key={notification.id}>
            <Avatar size={"md"} bg="Primary.700" />
            <VStack align={"start"}>
              <HStack>
                <Text fontSize={"14px"}>
                  <strong>{notification?.userFullName}</strong>{" "}
                  {notification?.message}{" "}
                </Text>
              </HStack>
              <Text fontSize={"sm"} pl={1}>
                {moment(notification?.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </VStack>
          </HStack>
          <Divider color={"gray.200"} />
        </>
      ))}
    </Card>
  );
};

export default AllNotifications;
