import { Box, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";

function EventInfo({ event }) {
  console.log("event!!", event);

  if (event !== undefined)
    return (
      <>
        <Tooltip
          bg="#646373"
          borderRadius={5}
          label={
            <Box bg="#646373">
              <Text fontWeight="bold">Job Id: {event.id}</Text>
              <Text fontWeight="bold">Site: {event.site?.name ?? "N/A"}</Text>

              <Text fontWeight="bold" display="inline">
                Engineer:{" "}
                {event.engineer?.firstName !== undefined
                  ? event?.engineer?.firstName + " " + event?.engineer?.lastName
                  : "N/A"}
              </Text>
              <Text fontWeight="bold">
                Type: {event.jobType?.name ?? "N/A"}
              </Text>
              <Text fontWeight="bold">
                Subtype: {event.jobSubType?.name ?? "N/A"}
              </Text>
            </Box>
          }
        >
          <Box pl={5} position="relative">
            <Text fontWeight="bold">Job Id: {event.id}</Text>
            <Text fontWeight="bold">Site: {event.site?.name ?? "N/A"}</Text>
          </Box>
        </Tooltip>
      </>
    );
  else return null;
}

export default EventInfo;
