import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { start } from "repl";
import useEngineer from "../../../../hooks/Settings/User/useEngineer";
import useUser from "../../../../hooks/Settings/User/useUser";
import MultiUserSelect from "../../../GeneralComponents/MultiUserSelect";
import MultiEngineerSelect from "../../../GeneralComponents/MultiEngineerSelect";
interface Props {
  startDateDefault: any;
  endDateDefault: any;
  selectedType: string;
  onEventSubmit: (event: any) => void;
  createEventModal: any;
}
const CreateRegularEvent = ({
  startDateDefault,
  endDateDefault,
  selectedType,
  onEventSubmit,
  createEventModal,
}: Props) => {
  const [event, setEvent] = useState({
    eventType: "",
    title: "",
    startDate: startDateDefault,
    endDate: endDateDefault,
    description: "",
    employeesId: "",
  });
  useEffect(() => {
    setEvent({ ...event, eventType: selectedType });
  }, [selectedType]);

  console.log("selected type3", event);
  const handleEventSubmit = () => {
    onEventSubmit(event);
  };

  const { data: engineers, isLoading, isError } = useEngineer(true);
  const {
    data: users,
    isLoading: userLoading,
    isError: isUserError,
  } = useUser(true);

  return (
    <>
      {" "}
      <FormControl mt={4}>
        <RequiredFormLabel label={"Title"} />
        <Input
          type="text"
          placeholder="Add Title"
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"Start Date"} />
        <Input
          // defaultValue={format(startDateDefault, "dd/MM/yyyy HH:mm") ?? ""}
          defaultValue={format(startDateDefault, "yyyy-MM-dd'T'HH:mm") ?? ""}
          type="datetime-local"
          className="FormControl"
          placeholder="Start Date"
          onChange={(e) =>
            setEvent({ ...event, startDate: new Date(e.target.value) })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <RequiredFormLabel label={"End Date"} />
        <Input
          defaultValue={format(endDateDefault - 1, "yyyy-MM-dd'T'HH:mm") ?? ""}
          type="datetime-local"
          className="FormControl"
          placeholder="End Date"
          onChange={(e) =>
            setEvent({ ...event, endDate: new Date(e.target.value) })
          }
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter Description"
          size="md"
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </FormControl>
      {selectedType === "Meeting" ? (
        <FormControl mt={4}>
          <FormLabel>Attendees</FormLabel>
          <MultiUserSelect
            onSelectedUsers={(usersId) =>
              setEvent({ ...event, employeesId: usersId.join(",") })
            }
          />
        </FormControl>
      ) : (
        <FormControl mt={4}>
          <FormLabel>Engineers</FormLabel>
          <MultiEngineerSelect
            onSelectedEngineers={(engineersId) =>
              setEvent({ ...event, employeesId: engineersId.join(",") })
            }
          />
        </FormControl>
      )}
      <Flex justifyContent="flex-end" mt={8}>
        <Button colorScheme="teal" mr={2} onClick={handleEventSubmit}>
          Save
        </Button>
        <Button onClick={createEventModal.onClose}>Cancel</Button>
      </Flex>
    </>
  );
};

export default CreateRegularEvent;
