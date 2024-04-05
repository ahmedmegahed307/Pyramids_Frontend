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
  Spinner,
} from "@chakra-ui/react";
import useClient from "../../../../hooks/Settings/Client/useClient";
import Site from "../../../../models/Site";

interface SiteProps {
  onSelectedSites: (sites: string[] | undefined) => void;
  sites: Site[];
}
const SiteSelect = ({ onSelectedSites, sites }: SiteProps) => {
  console.log("sites::", sites);
  if (!sites) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>Sites</FormLabel>
        <Spinner
          size="md"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </FormControl>
    );
  }

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    onSelectedSites(selectedOptions);
    console.log("selectedOptions", selectedOptions);
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

  const filteredOptions: { value: string; label: string }[] = sites
    ? sites.map((adress) => ({
        value: adress.id.toString(),
        label: adress.name,
      }))
    : [];
  console.log("filteredOptions", filteredOptions);

  return (
    <FormControl w={"full"} pt={2}>
      <FormLabel color={"gray"}>Sites</FormLabel>
      <Flex direction="column" w={"auto"}>
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpen={() => setIsMenuOpen(true)}
        >
          <MenuButton
            as={Button}
            color={"gray"}
            bgColor={"gray.100"}
            rightIcon={
              <Box as="span" fontSize="sm">
                ▼
              </Box>
            }
          >
            Select Sites
          </MenuButton>
          <MenuList minWidth="300px">
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

export default SiteSelect;
