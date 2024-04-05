import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  RadioGroup,
  Select,
  Switch,
} from "@chakra-ui/react";

import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import MultiJobSubTypeSelect from "../../../GeneralComponents/MultiJobSubTypeSelect";
import { useState } from "react";

const schema = z.object({
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

export type CreateMaintenanceSheetValidation = z.infer<typeof schema>;
type Props = {
  onSubmit: (data: CreateMaintenanceSheetValidation) => void;
};
const CreateMaintenanceSheet = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateMaintenanceSheetValidation>({
    resolver: zodResolver(schema),
  });

  const handleSubTypeSelect = (data: any) => {
    setValue("subtypesId", data);
  };
  const handleFormSubmit = (data: CreateMaintenanceSheetValidation) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <Heading size={"md"} mb={8}>
              Create Maintenance Sheet
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.title}
              >
                <RequiredFormLabel label={"Title"} />{" "}
                <Input
                  {...register("title")}
                  placeholder="Enter Title"
                  autoFocus
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.visibleOn}
              >
                <RequiredFormLabel label={"Visible On"} />{" "}
                <Select
                  {...register("visibleOn")}
                  placeholder="Select Visibility"
                >
                  <option value="Start Day">Start Day</option>
                  <option value="Before Travel">Before Travel</option>
                  <option value="Before Work">Before Work</option>
                  <option value="During Work">During Work</option>
                  <option value="On Close">On Close</option>
                </Select>
                {errors.visibleOn && (
                  <FormErrorMessage>
                    {errors.visibleOn.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.subtypesId}
              >
                <RequiredFormLabel label={"Subtypes"} />
                <MultiJobSubTypeSelect
                  register={register}
                  errors={errors}
                  onSelectedSubTypes={handleSubTypeSelect}
                />
              </FormControl>

              <FormControl>
                <RadioGroup>
                  <Switch
                    size="md"
                    colorScheme="Primary"
                    {...register("mandatory")}
                  />
                  <span style={{ fontWeight: "bold", marginLeft: 8 }}>
                    Required
                  </span>
                </RadioGroup>
              </FormControl>
              <Button type="submit" w={"full"} my={10} isLoading={isSubmitting}>
                Submit
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default CreateMaintenanceSheet;
