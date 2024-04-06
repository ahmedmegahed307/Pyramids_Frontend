import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Text,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import UpdateRegularEvent from "./UpdateRegularEvent";
import UpdateJobEvent from "./UpdateJobEvent";

interface CreateEventProps {
  eventMain: any;
  updateEventModal: any;
  onJobSubmit?: (event: any) => void;
  onEventSubmit: (event: any) => void;
}

const UpdateEventMain = ({
  updateEventModal,
  eventMain,
  onJobSubmit,
  onEventSubmit,
}: CreateEventProps) => {
  console.log("eventToUpdate", eventMain);

  const handleJobSubmit = (job) => {
    onJobSubmit(job);
  };
  const handleEventSubmit = (event) => {
    onEventSubmit(event);
  };

  return (
    <>
      <Modal
        isOpen={updateEventModal.isOpen}
        onClose={updateEventModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"gray.500"}>Update Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Type</FormLabel>
              <Input
                bgColor={"gray.300"}
                value={eventMain?.eventType}
                type="text"
                disabled={true}
              />
            </FormControl>

            {eventMain?.eventType === "Job" ? (
              <UpdateJobEvent
                jobToUpdate={eventMain.job}
                updateEventModal={updateEventModal}
              />
            ) : (
              <UpdateRegularEvent
                eventToUpdate={eventMain?.event}
                updateEventModal={updateEventModal}
                onEventSubmit={handleEventSubmit}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEventMain;
