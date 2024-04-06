import { FormControl, FormLabel } from "@chakra-ui/form-control";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { SchedulerEventUpdate } from "../../../../models/Interfaces/Scheduler/SchedulerEventUpdate";
import MultiUserSelect from "../../../GeneralComponents/MultiUserSelect";
import MultiEngineerSelect from "../../../GeneralComponents/MultiEngineerSelect";
interface Props {
  onEventSubmit: (event: any) => void;
  updateEventModal: any;
  eventToUpdate: any;
}
const UpdateRegularEvent = ({
  eventToUpdate,
  onEventSubmit,
  updateEventModal,
}: Props) => {
  const [currentEvent, setCurrentEvent] = useState<any>(eventToUpdate);
  console.log("currentEvent::", currentEvent);
  console.log("eventToUpdate::", eventToUpdate);
  useEffect(() => {
    setCurrentEvent(eventToUpdate);
  }, [eventToUpdate]);

  const handleEventSubmit = () => {
    console.log("currentEvent:", currentEvent);
    onEventSubmit(currentEvent);
  };
  console.log("currentEvent:", currentEvent);

  return (
    <>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Title"} />
        <Input
          defaultValue={currentEvent.title ?? ""}
          type="text"
          placeholder="Add Title"
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, title: e.target.value })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Start Date"} />
        <Input
          defaultValue={
            format(new Date(currentEvent.startDate), "yyyy-MM-dd'T'HH:mm") ?? ""
          }
          type="datetime-local"
          className="FormControl"
          placeholder="Start Date"
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, startDate: e.target.value })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"End Date"} />
        <Input
          defaultValue={
            format(new Date(currentEvent.endDate), "yyyy-MM-dd'T'HH:mm") ?? ""
          }
          type="datetime-local"
          className="FormControl"
          placeholder="End Date"
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, endDate: e.target.value })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          defaultValue={currentEvent.description ?? ""}
          placeholder="Enter Description"
          size="md"
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, description: e.target.value })
          }
        />
      </FormControl>
      {currentEvent.eventType === "Meeting" ? (
        <FormControl mt={4}>
          <FormLabel>Attendees</FormLabel>
          <MultiUserSelect
            onSelectedUsers={(usersId) => {
              console.log("usersId::", usersId);
              setCurrentEvent({
                ...currentEvent,
                employeesId:
                  usersId.length > 0
                    ? usersId.join(",")
                    : currentEvent.employeesId,
              });
            }}
            defaultUsersId={currentEvent?.employees?.map((user) => user.id)}
          />
        </FormControl>
      ) : (
        <FormControl mt={4}>
          <FormLabel>Engineers</FormLabel>
          <MultiEngineerSelect
            onSelectedEngineers={(engineersId) => {
              console.log("engineersId", engineersId);
              setCurrentEvent({
                ...currentEvent,
                employeesId:
                  engineersId.length > 0
                    ? engineersId.join(",")
                    : currentEvent.employeesId,
              });
            }}
            defaultEngineersId={currentEvent?.employees?.map(
              (engineer) => engineer.id
            )}
          />
        </FormControl>
      )}
      <Flex justifyContent="flex-end" mt={8}>
        <Button colorScheme="Primary" mr={2} onClick={handleEventSubmit}>
          Save
        </Button>
        <Button onClick={updateEventModal.onClose}>Cancel</Button>
      </Flex>
    </>
  );
};

export default UpdateRegularEvent;
