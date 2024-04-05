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

interface props {
  createAssignModal: any;
  addAssignRecord: (newRecord: any) => void;
  engineers: User[];
}
const CreateAssign = ({
  createAssignModal,
  addAssignRecord,
  engineers,
}: props) => {
  const [createAssign, setCreateAssign] = useState<AssignTabModel>({
    id: uuidv4(),
    estimatedDuration: null,
    scheduleDate: "",
    commentsToTech: "",
  });

  const handleAssignCreate = () => {
    addAssignRecord(createAssign);
    createAssignModal.onClose();
    setCreateAssign({
      id: uuidv4(),
      estimatedDuration: 0,
      scheduleDate: "",
      commentsToTech: "",
    });
  };

  const handleEngineerChange = (selectedEngineer) => {
    setCreateAssign({
      ...createAssign,
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
        onClose={createAssignModal.onClose}
        isOpen={createAssignModal.isOpen}
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
                <Heading size={"md"} color={"teal"}>
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
                    type="datetime-local"
                    className="FormControl"
                    placeholder="Select Schedule Date"
                    onChange={(e) =>
                      setCreateAssign({
                        ...createAssign,
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
                        return setCreateAssign({
                          ...createAssign,
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
                    value={createAssign && createAssign!.estimatedDuration!}
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
                    value={createAssign?.commentsToTech}
                    onChange={(e) =>
                      setCreateAssign({
                        ...createAssign,
                        commentsToTech: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <Button onClick={handleAssignCreate} w={"full"} my={10}>
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

export default CreateAssign;
