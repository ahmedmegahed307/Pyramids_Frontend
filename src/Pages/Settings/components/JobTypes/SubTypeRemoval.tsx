import { Flex, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import JobSubType from "../../../../models/JobSubType";

interface SubTypeListProps {
  subTypeList: JobSubType[];
  onRemoveSubType: (index: number) => void;
}

const SubTypeRemoval = ({ subTypeList, onRemoveSubType }: SubTypeListProps) => {
  return (
    <Flex wrap="wrap">
      {subTypeList.map((subType, index) => (
        <Tag
          key={index}
          borderRadius="full"
          variant="solid"
          colorScheme="Primary"
          mr={2}
          mb={2}
        >
          <TagLabel>{subType.name}</TagLabel>
          <TagCloseButton onClick={() => onRemoveSubType(index)} />
        </Tag>
      ))}
    </Flex>
  );
};

export default SubTypeRemoval;
