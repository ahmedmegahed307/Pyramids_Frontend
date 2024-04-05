import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Select,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import FieldList from "./Field/FieldList";
import { useEffect, useState } from "react";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import MultiJobSubTypeSelect from "../../../../GeneralComponents/MultiJobSubTypeSelect";
import { MSField } from "../../../../../models/Interfaces/MSField";
const FieldMockData: MSField[] = [
  {
    id: 1,
    name: "test",
    type: "input",
    isRequired: true,
    initialValues: ["testing"],
  },
  {
    id: 2,
    name: "test2",
    type: "checkbox",
    isRequired: false,
    initialValues: ["Checked"],
  },
  {
    id: 3,
    name: "test3",
    type: "dropdown",
    isRequired: true,
    initialValues: ["Choice 1, Choice 2, Choice 3"],
  },
];
const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  visibleOn: z.enum(
    ["Start Day", "Before Travel", "Before Work", "During Work", "On Close"],
    {
      errorMap: () => ({
        message: "Visibility is required",
      }),
    }
  ),
  subtypesId: z.array(z.number()).nonempty(),
  mandatory: z.boolean().optional(),
});

export type UpdateMaintenanceSheet = z.infer<typeof schema>;
const UpdateMaintenanceSheet = () => {
  const { id } = useParams();
  console.log("id!!", id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateMaintenanceSheet>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: UpdateMaintenanceSheet) => {
    //   data.id = editMaintenanceSheet?.id;
    console.log("edit contract:", data);
    const updatedMaintenanceSheet: any = {
      ...data,
      subtypesId: data.subtypesId,
      id: data.id,
      isReq: data.mandatory,
      name: data.title,
      visibleOn: data.visibleOn,
    };
    //   updateMaintenanceSheet.mutate(updatedMaintenanceSheet);
  };
  const handleSubTypeSelect = (data: any) => {
    setValue("subtypesId", data);
  };

  const updateModal = useDisclosure();
  const deleteModal = useDisclosure();
  const createModal = useDisclosure();
  const [isReq, setIsReq] = useState<boolean>();

  return (
    <>
      <Card mr={12} mb={5} p={10} pb={20} borderRadius={8} boxShadow={"none"}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gridColumnGap={5}
            gridRowGap={5}
            px={5}
            position={"relative"}
          >
            <FormControl
              isInvalid={!!errors.title}
              fontWeight={"bold"}
              color={"black"}
            >
              <RequiredFormLabel label="Title" />
              <Input
                defaultValue={"test"}
                {...register("title")}
                className="FormControl"
                placeholder=""
              />
              {errors.title && (
                <FormErrorMessage color="red">
                  {errors.title.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errors.visibleOn}
              fontWeight={"bold"}
              color={"black"}
            >
              <RequiredFormLabel label="Visible On" />
              <Select {...register("visibleOn")}>
                <option value="Start Day">Start Day</option>
                <option value="Before Travel">Before Travel</option>
                <option value="Before Work">Before Work</option>
                <option value="During Work">During Work</option>
                <option value="On Close">On Close</option>
              </Select>
              {errors.visibleOn && (
                <FormErrorMessage color="red">
                  {errors.visibleOn.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <RequiredFormLabel label="Subtypes" />
              <MultiJobSubTypeSelect
                register={register}
                errors={errors}
                onSelectedSubTypes={handleSubTypeSelect}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              fontWeight={"bold"}
              color={"black"}
              mt={4}
            >
              <Checkbox
                isChecked={true}
                onChange={(e) => {
                  setIsReq(e.target.checked);
                }}
                size="lg"
                colorScheme="Primary"
              />
              <FormLabel mb="0" ml="10px">
                Mandatory
              </FormLabel>
            </FormControl>

            <Box position={"absolute"} bottom={-4} right={5}>
              <Link to="/globalSettings/maintenanceSheet">
                <Button float={"right"} size={"md"}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" mr={2} float={"right"} size={"md"}>
                Save
              </Button>
            </Box>
          </Grid>
        </form>
        <br />

        <br />
        <Divider borderColor="gray.300" borderWidth="1px" />

        <FieldList
          data={FieldMockData}
          updateModal={updateModal}
          deleteModal={deleteModal}
          createModal={createModal}
        />
      </Card>
    </>
  );
};

export default UpdateMaintenanceSheet;
