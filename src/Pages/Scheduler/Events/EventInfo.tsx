import {
  Box,
  Button,
  CloseButton,
  HStack,
  Modal,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { set } from "react-hook-form";
import DeleteEvent from "./DeleteEvent/DeleteEvent";
import CancelReason from "../../Jobs/JobDetails/Details/CancelReason";

function EventInfo({ event }) {
  const [eventId, setEventId] = useState<number>(0);
  const [jobId, setJobId] = useState<number>(0);
  const deleteModal = useDisclosure();
  const cancelReasonModal = useDisclosure();
  const [isEventHovering, setIsEventHovering] = useState(false);
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Stop event propagation here
    setEventId(event.event?.id);
    deleteModal.onOpen();
  };
  const [isJobHovering, setIsJobHovering] = useState(false);

  const handleCancelReasonClick = (e) => {
    e.stopPropagation(); // Stop event propagation here
    setJobId(parseInt(event.job?.id));
    cancelReasonModal.onOpen();
  };
  if (event.event !== undefined)
    return (
      <>
        <Tooltip
          bg="#646373"
          borderRadius={5}
          label={
            <Box bg="#646373">
              <Text fontWeight="bold">Event: {event.event?.eventType}</Text>
              <Text fontWeight="bold">Title: {event.event?.title}</Text>
              <Text fontWeight="bold">
                Description: {event.event?.description}
              </Text>

              <Text fontWeight="bold">
                Start Date:{" "}
                {moment(event.event?.startDate).format("DD/MM/YYYY HH:mm")}
              </Text>
              <Text fontWeight="bold">
                End Date:{" "}
                {moment(event.event?.endDate).format("DD/MM/YYYY HH:mm")}
              </Text>
              <Text fontWeight="bold">
                {event.event?.eventType === "AL" ? "Employee: " : "Attendees: "}
                {event.event?.employees.map((employee, index, array) => {
                  if (index === array.length - 1) {
                    return employee?.name;
                  } else {
                    return employee?.name + ", ";
                  }
                })}
              </Text>
            </Box>
          }
        >
          <Box
            pl={2}
            position="relative"
            onMouseEnter={() => setIsEventHovering(true)}
            onMouseLeave={() => setIsEventHovering(false)}
          >
            {isEventHovering && (
              <CloseButton
                position="absolute"
                top={0}
                right={0}
                onClick={handleDeleteClick}
              />
            )}
            <Text fontWeight="normal">
              Title:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "6px",
                }}
              >
                {event.event?.title}
              </span>
            </Text>
            <Text fontWeight="normal">
              Event:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {event.event?.eventType}
              </span>
            </Text>
          </Box>
        </Tooltip>
        <DeleteEvent
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
          eventId={eventId}
        />
      </>
    );
  else if (event.job !== undefined)
    return (
      <>
        <Tooltip
          bg="#646373"
          borderRadius={5}
          label={
            <Box bg="#646373">
              <Text fontWeight="bold">Event: Job</Text>
              <Text fontWeight="bold">Job Id: {event.job?.id}</Text>
              <Text fontWeight="bold">
                Job Status: {event.job?.jobStatusName}
              </Text>
              <Text fontWeight="bold">
                Client: {event.job?.clientName ?? "N/A"}
              </Text>
              <Text fontWeight="bold" display="inline">
                Engineer:{" "}
                {event.job?.engineerName !== " "
                  ? event?.job?.engineerName
                  : "N/A"}
              </Text>
              <Text fontWeight="bold">
                Schedule Date:
                {moment(event.job?.startDate).format("DD/MM/YYYY HH:mm")}
              </Text>
            </Box>
          }
        >
          <Box
            pl={2}
            position="relative"
            onMouseEnter={() => setIsJobHovering(true)}
            onMouseLeave={() => setIsJobHovering(false)}
          >
            {isJobHovering && (
              <CloseButton
                position="absolute"
                top={0}
                right={0}
                onClick={handleCancelReasonClick}
              />
            )}
            <Text fontWeight="normal">
              Job Id:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "1px",
                }}
              >
                {event.job?.id}
              </span>
            </Text>

            <Text fontWeight="normal">
              Client:
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "6px",
                }}
              >
                {event.job?.clientName ?? "N/A"}
              </span>
            </Text>
          </Box>
        </Tooltip>
        {/* Cancel Reason popup */}
        <Modal
          isOpen={cancelReasonModal.isOpen}
          onClose={cancelReasonModal.onClose}
        >
          <CancelReason
            jobId={jobId || undefined}
            cancelReasonModal={cancelReasonModal}
          />
        </Modal>
      </>
    );
  else return null;
}

export default EventInfo;
