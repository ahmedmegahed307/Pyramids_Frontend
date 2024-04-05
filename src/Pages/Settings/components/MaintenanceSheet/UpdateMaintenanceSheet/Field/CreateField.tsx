import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  FormErrorMessage,
  Select,
  RadioGroup,
  Switch,
  HStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import RequiredFormLabel from "../../../../../RequiredFields/RequiredFormLabel";
interface CreateFieldProps {
  createModal: any;
  onSubmit: (event: CreateFieldValidation) => void;
}

const schema = z.object({
  name: z.string().nonempty({ message: "Field Name is required" }),
  type: z.enum(["HEADER", "SUBHEADER", "TEXTBOX", "DROPBOX", "CHECKBOX"], {
    errorMap: () => ({
      message: "Type is required",
    }),
  }),
  isRequired: z.boolean().optional(),
  initalValues: z.array(z.string()).optional(),
});

export type CreateFieldValidation = z.infer<typeof schema>;
const CreateField = ({ createModal, onSubmit }: CreateFieldProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateFieldValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateFieldValidation) => {
    onSubmit(data);
    reset();
    setSelectedType("");
    setDropdownOptions([]);
    setNewOption("");
    setInitialValueList([]);
  };
  const [selectedType, setSelectedType] = useState("");

  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [initialValueList, setInitialValueList] = useState<string[]>([]);

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...dropdownOptions, newOption];
      setDropdownOptions(updatedOptions);
      setNewOption("");
      setInitialValueList([...initialValueList, newOption]);
    }
  };

  const handleRemoveOption = (option: string) => {
    const updatedOptions = dropdownOptions.filter((item) => item !== option);
    setDropdownOptions(updatedOptions);
    setInitialValueList(initialValueList.filter((item) => item !== option));
  };
  useEffect(() => {
    setValue("initalValues", initialValueList);
  }, [initialValueList]);
  return (
    <>
      <Modal isOpen={createModal.isOpen} onClose={createModal.onClose}>
        <ModalOverlay />
        <ModalContent minH={300}>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4} isInvalid={!!errors.name}>
                <RequiredFormLabel label={"Field Name"} />
                <Input
                  type="text"
                  placeholder="Add Name"
                  {...register("name")}
                />
                {errors.name && (
                  <FormErrorMessage color="red">
                    {errors.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.type}>
                <RequiredFormLabel label={"Field Type"} />
                <Select
                  {...register("type")}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option>Select Type</option>
                  <option value="HEADER">HEADER</option>
                  <option value="SUBHEADER">SUBHEADER</option>
                  <option value="TEXTBOX">TEXTBOX</option>
                  <option value="DROPBOX">DROPBOX</option>
                  <option value="CHECKBOX">CHECKBOX</option>
                </Select>
                {errors.type && (
                  <FormErrorMessage color="red">
                    {errors.type.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              {selectedType === "DROPBOX" && (
                <>
                  <FormControl mt={4}>
                    <RequiredFormLabel label={"Initial Value"} />
                    <Select
                      value={initialValueList[initialValueList.length - 1]}
                      onChange={(e) =>
                        setInitialValueList(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      <option>Select Initial Value</option>
                      {dropdownOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mt={8}>
                    <HStack>
                      <Input
                        type="text"
                        placeholder="add Option to Initial Value"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                      />
                      <Button colorScheme="teal" onClick={handleAddOption}>
                        +
                      </Button>
                      <Button
                        color="gray"
                        bg={"gray.200"}
                        onClick={() =>
                          handleRemoveOption(
                            initialValueList[initialValueList.length - 1]
                          )
                        }
                        mt={2}
                      >
                        -
                      </Button>
                    </HStack>
                  </FormControl>
                </>
              )}

              {selectedType !== "HEADER" &&
                selectedType !== "SUBHEADER" &&
                selectedType !== "" && (
                  <FormControl mt={8}>
                    <RadioGroup>
                      <Switch
                        size="md"
                        colorScheme="Primary"
                        {...register("isRequired")}
                      >
                        Required
                      </Switch>
                    </RadioGroup>
                  </FormControl>
                )}
            </ModalBody>

            <ModalFooter mt={10}>
              <Button type="submit" colorScheme="teal" mr={3}>
                Save
              </Button>
              <Button onClick={createModal.onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateField;
