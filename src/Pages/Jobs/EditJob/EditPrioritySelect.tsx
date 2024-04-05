import {
  FormControl,
  FormLabel,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import Priority from "../../../models/Priority";
import { useEffect, useState } from "react";

interface Props extends FormValidation {
  priorities: Priority[];
  onPrioritySelect: (priority: Priority | null) => void;
  defaultValue: number;
}

const EditPrioritySelect = ({
  register,
  errors,
  defaultValue,
  priorities,
  onPrioritySelect,
}: Props) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );
  useEffect(() => {
    if (defaultValue !== 0) {
      const priority = priorities?.find((p) => p.id === defaultValue);
      setSelectedPriority(priority);
    }
  }, [defaultValue, priorities]);

  if (defaultValue === 0 || priorities === null) {
    return (
      <FormControl width={"full"}>
        <HStack>
          <FormLabel>Priority:</FormLabel>
          <Spinner
            size="md"
            thickness="4px"
            speed="0.65s"
            emptyColor="Neutral.300"
            color="Primary.700"
          />
        </HStack>
      </FormControl>
    );
  }

  const handlePriorityClick = (priority: Priority) => {
    if (selectedPriority?.id === priority.id) {
      setSelectedPriority(null);
      onPrioritySelect(null);
    } else {
      setSelectedPriority(priority);
      onPrioritySelect(priority);
    }
  };

  return (
    <FormControl width={"full"}>
      <HStack spacing={3}>
        <FormLabel pt={2}>Priority:</FormLabel>

        {priorities?.map((priority) => (
          <Tag
            key={priority.id}
            size="lg"
            variant={selectedPriority?.id === priority.id ? "solid" : "outline"}
            colorScheme={
              selectedPriority?.id === priority.id ? "Primary" : "teal"
            }
            cursor="pointer"
            onClick={() => handlePriorityClick(priority)}
          >
            <TagLabel>{priority.priority}</TagLabel>
          </Tag>
        ))}
      </HStack>
    </FormControl>
  );
};

export default EditPrioritySelect;
