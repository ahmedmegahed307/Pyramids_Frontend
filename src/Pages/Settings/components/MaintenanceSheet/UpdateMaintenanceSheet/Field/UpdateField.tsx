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
import { set } from "date-fns";
import RequiredFormLabel from "../../../../../RequiredFields/RequiredFormLabel";
import { FieldTypes } from "../../../../../../StaticData/StaticData";
interface UpdateFieldProps {
  updateModal: any;
  onSubmit: (event: UpdateFieldValidation) => void;
  //originalField: CheckListItems | undefined;
  originalField: any | undefined;
}

const schema = z.object({
  id: z.string().optional(),
  label: z.string().nonempty({ message: "Field Name is required" }),
  type: z.enum(["HEADER", "SUBHEADER", "TEXTBOX", "DROPBOX", "CHECKBOX"], {
    errorMap: () => ({
      message: "Type is required",
    }),
  }),
  isReq: z.boolean().optional(),
  initValue: z.array(z.string()).optional(),
});

export type UpdateFieldValidation = z.infer<typeof schema>;
const UpdateField = ({
  updateModal,
  onSubmit,
  originalField,
}: UpdateFieldProps) => {
  console.log("originalField", originalField);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateFieldValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: UpdateFieldValidation) => {
    onSubmit(data);

    reset();
  };
  const [selectedType, setSelectedType] = useState<any>();

  const [newOption, setNewOption] = useState<string>("");
  const [initialValueList, setInitialValueList] = useState<string[]>(
    (originalField?.initValue as string[]) || []
  );
  const [dropdownOptions, setDropdownOptions] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (originalField) {
      setSelectedType(originalField?.type);
      setInitialValueList((originalField?.initValue as string[]) || []);

      setDropdownOptions(originalField?.initValue || []);
    }
  }, [originalField?.type, originalField?.initValue]);

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

  // get default values
  useEffect(() => {
    setValue("id", originalField?.id || "");
    setValue("label", originalField?.label || "");
    setValue("type", (originalField?.type as any) || "");
    setValue("isReq", originalField?.isReq || false);
    setValue("initValue", initialValueList);
  }, [setValue, originalField, initialValueList]);

  return (
    <>
      <Modal isOpen={updateModal.isOpen} onClose={updateModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4} isInvalid={!!errors.label}>
                <RequiredFormLabel label={"Field Name"} />
                <Input
                  type="text"
                  placeholder="Add Name"
                  {...register("label")}
                />
                {errors.label && (
                  <FormErrorMessage color="red">
                    {errors.label.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.type}>
                <RequiredFormLabel label={"Field Type"} />
                <Select
                  {...register("type")}
                  onChange={(e) => setSelectedType(e.target.value as any)}
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

              {selectedType === FieldTypes.DROPBOX && (
                <>
                  <FormControl mt={4}>
                    <RequiredFormLabel label={"Initial Value"} />
                    <Select
                      //value={initialValueList}
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
                        <option key={index} value={option ?? ""}>
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
                      <Button colorScheme="Primary" onClick={handleAddOption}>
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

              {selectedType !== FieldTypes.HEADER &&
                selectedType !== FieldTypes.SUBHEADER && (
                  <FormControl mt={6}>
                    <RadioGroup>
                      <Switch
                        size="md"
                        colorScheme="Primary"
                        {...register("isReq")}
                      >
                        Required
                      </Switch>
                    </RadioGroup>
                  </FormControl>
                )}
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="Primary" mr={3}>
                Save
              </Button>
              <Button onClick={updateModal.onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateField;
