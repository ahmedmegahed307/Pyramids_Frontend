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
import useClient from "../../../hooks/Settings/Client/useClient";

interface ClientProps {
  onSelectedClients: (clients: string[] | undefined) => void;
}
const ClientSelect = ({ onSelectedClients }: ClientProps) => {
  const { data: clientList } = useClient();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Selected Clients:", selectedOptions);
    onSelectedClients(selectedOptions);
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

  const filteredOptions: { value: string; label: string }[] = clientList
    ? clientList.map((client: any) => ({
        value: client.id,
        label: client.name,
      }))
    : [];

  return (
    <FormControl pb={5} w={"md"}>
      <FormLabel color={"grey"}>Clients</FormLabel>
      <Flex direction="column" maxWidth={300}>
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpen={() => setIsMenuOpen(true)}
        >
          <MenuButton
            bg={"gray.50"}
            as={Button}
            color={"grey"}
            rightIcon={
              <Box as="span" fontSize="sm">
                ▼
              </Box>
            }
          >
            Select Clients
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
              <Tag key={option} variant="solid" bg={"teal"} mr={2} mb={2}>
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

export default ClientSelect;
