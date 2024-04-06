import {
  AbsoluteCenter,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "../../../../../models/User";
import { AssignTabModel } from "./AssignMain";
import { Select } from "chakra-react-select";
import IsLoading from "../../../../GeneralComponents/IsLoading";

interface props {
  updateAssignModal: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedAssignRecord: any) => void;
  updateAssignRecord: any;
  engineers: User[];
}

const UpdateAssign = ({
  updateAssignModal,
  updateAssignRecord,
  onUpdate,
  isOpen,
  onClose,
  engineers,
}: props) => {
  const [updateAssign, setUpdateAssign] = useState<AssignTabModel>({
    id: uuidv4(),
    estimatedDuration: null,
    scheduleDate: "",
    commentsToTech: "",
  });

  const handleAssignUpdate = () => {
    const updatedAssignWithAllProps = {
      ...updateAssign!, // Keep all existing properties
      id: updateAssignRecord?.id || uuidv4(),
      engineerId: updateAssign.engineerId || updateAssignRecord.engineerId,
      engineerName:
        updateAssign.engineerName || updateAssignRecord.engineerName,
      estimatedDuration:
        updateAssign.estimatedDuration || updateAssignRecord.estimatedDuration,
    };
    console.log("updatedAssignWithAllProps::", updatedAssignWithAllProps);
    onUpdate(updatedAssignWithAllProps);
    onClose();
    setUpdateAssign(undefined);
  };

  const handleEngineerChange = (selectedEngineer) => {
    setUpdateAssign({
      ...updateAssign,
      engineerId: selectedEngineer.value,
      engineerName: selectedEngineer.label,
      id: uuidv4(),
    });
  };
  const options = [
    { label: "Select engineer", value: 0 }, // Empty option
    ...(engineers?.map((engineer) => ({
      label: engineer.firstName + " " + engineer.lastName,
      value: engineer.id,
    })) || []),
  ];

  return (
    <>
      <Drawer
        onClose={updateAssignModal.onClose}
        isOpen={updateAssignModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <DrawerOverlay />
        <DrawerContent px={10}>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter>
              <>
                <Heading size={"md"} color="Primary.700">
                  Assign & Schedule Job
                </Heading>
                <Divider mb={10} />
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Engineer</FormLabel>

                  <Select
                    useBasicStyles
                    defaultValue={
                      updateAssignRecord
                        ? options.find(
                            (engineer) =>
                              engineer.value === updateAssignRecord?.engineerId
                          )
                        : null
                    }
                    placeholder="Select Engineer"
                    selectedOptionColorScheme="Primary"
                    options={options}
                    onChange={handleEngineerChange}
                  />
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Schedule Date</FormLabel>

                  <Input
                    defaultValue={updateAssignRecord?.scheduleDate}
                    type="datetime-local"
                    className="FormControl"
                    placeholder="Select Schedule Date"
                    onChange={(e) =>
                      setUpdateAssign({
                        ...updateAssign,
                        scheduleDate: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Est. Duration (Minutes)</FormLabel>
                  <Input
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = parseInt(inputValue);
                      if (!isNaN(numericValue) || inputValue === "") {
                        return setUpdateAssign({
                          ...updateAssign,
                          estimatedDuration: isNaN(numericValue)
                            ? null
                            : numericValue,
                        });
                      }
                    }}
                    onKeyPress={(e) => {
                      // Allow only numeric characters and certain control keys
                      const key = e.key;
                      const allowedKeys = [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "Backspace",
                        "Delete",
                        "Tab",
                        "Enter",
                        "ArrowLeft",
                        "ArrowRight",
                      ];
                      if (!allowedKeys.includes(key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="enter estimated duration in minutes"
                    defaultValue={
                      updateAssignRecord &&
                      updateAssignRecord!.estimatedDuration!
                    }
                  ></Input>
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Tech Comments</FormLabel>

                  <Textarea
                    size={"md"}
                    variant="outline"
                    placeholder=""
                    defaultValue={updateAssignRecord?.commentsToTech}
                    onChange={(e) =>
                      setUpdateAssign({
                        ...updateAssign,
                        commentsToTech: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <Button onClick={handleAssignUpdate} w={"full"} my={10}>
                  Save
                </Button>
              </>
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateAssign;
