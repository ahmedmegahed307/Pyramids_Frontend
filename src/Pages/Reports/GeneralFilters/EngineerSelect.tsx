import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Flex,
  Wrap,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  TagCloseButton,
} from "@chakra-ui/react";
import useEngineer from "../../../hooks/Settings/User/useEngineer";
import User from "../../../models/User";

interface EngineerProps {
  onSelectedEngineers: (Engineers: string[] | undefined) => void;
}
const EngineerSelect = ({ onSelectedEngineers }: EngineerProps) => {
  const { data: EngineerList } = useEngineer(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Selected Engineers:", selectedOptions);
    onSelectedEngineers(selectedOptions);
  }, [selectedOptions]);

  const handleSelectChange = (selectedValues: string[]) => {
    setSelectedOptions(selectedValues);
  };

  const handleOptionSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setIsMenuOpen(false);
  };

  const handleOptionDeselect = (option: string) => {
    const updatedOptions = selectedOptions.filter((value) => value !== option);
    setSelectedOptions(updatedOptions);
  };

  const filteredOptions: { value: string; label: string }[] = EngineerList
    ? EngineerList.map((Engineer: any) => ({
        value: Engineer.id,
        label: Engineer.firstName + " " + Engineer.lastName,
      }))
    : [];

  return (
    <FormControl w={"full"}>
      <FormLabel color={"grey"}>Engineers</FormLabel>
      <Flex direction="column">
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpen={() => setIsMenuOpen(true)}
        >
          <MenuButton
            as={Button}
            bg={"gray.50"}
            color={"grey"}
            rightIcon={
              <Box as="span" fontSize="sm">
                ▼
              </Box>
            }
          >
            Select Engineers
          </MenuButton>
          <MenuList minWidth="200px" zIndex={9999}>
            <MenuOptionGroup
              value={selectedOptions}
              onChange={(values) => handleSelectChange(values as string[])}
            >
              {filteredOptions.map((option) => (
                <MenuItemOption
                  key={option.value}
                  value={option.value}
                  isChecked={selectedOptions.includes(option.value)}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Wrap mt={2}>
          <Flex wrap="wrap">
            {selectedOptions.map((option) => (
              <Tag
                key={option}
                variant="solid"
                bg={"Primary.700"}
                mr={2}
                mb={2}
              >
                <TagLabel>
                  {filteredOptions.find((o) => o.value === option)?.label}
                </TagLabel>
                <TagCloseButton onClick={() => handleOptionDeselect(option)} />
              </Tag>
            ))}
          </Flex>
        </Wrap>
      </Flex>
    </FormControl>
  );
};

export default EngineerSelect;
