import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import { Select } from "chakra-react-select";
import { eventTypeOptions } from "../../../../StaticData/StaticData";
import CreateRegularEvent from "./CreateRegularEvent";
import CreateJobEvent from "./CreateJobEvent";
interface CreateEventProps {
  createEventModal: any;
  onEventSubmit: (event: any) => void;
  startDateDefault: any;
  endDateDefault: any;
}

const CreateEventMain = ({
  createEventModal,
  onEventSubmit,
  startDateDefault,
  endDateDefault,
}: CreateEventProps) => {
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const handleTypeChange = (selectedType) => {
    console.log("selected type1", selectedType.value);
    setSelectedType(selectedType.value);
  };

  const handleEventSubmit = (event) => {
    onEventSubmit(event);
    setSelectedType("Meeting");
  };

  useEffect(() => {
    setSelectedType("Meeting");
  }, [createEventModal]);

  return (
    <>
      <Modal
        isOpen={createEventModal.isOpen}
        onClose={createEventModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"gray.500"}>Create Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <RequiredFormLabel label={"Event Type"} />
              <Select
                defaultValue={{
                  label: "Meeting",
                  value: "Meeting",
                }}
                useBasicStyles
                selectedOptionColorScheme="Primary"
                placeholder="Select Event Type"
                colorScheme="Primary"
                options={eventTypeOptions}
                onChange={handleTypeChange}
              />
            </FormControl>

            {selectedType === "Job" ? (
              <CreateJobEvent
                startDateDefault={startDateDefault}
                createEventModal={createEventModal}
              />
            ) : (
              <CreateRegularEvent
                selectedType={selectedType}
                startDateDefault={startDateDefault}
                endDateDefault={endDateDefault}
                createEventModal={createEventModal}
                onEventSubmit={handleEventSubmit}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEventMain;
