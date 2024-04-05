import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";

interface Props extends FormValidation {
  defaultValue: string;
}
const EditJobDescription = ({ register, errors, defaultValue }: Props) => {
  return (
    <FormControl w={"full"} isInvalid={errors.description !== undefined}>
      <FormLabel>Description</FormLabel>
      <Textarea
        defaultValue={defaultValue}
        placeholder="Enter Job Description"
        {...register("description")}
      ></Textarea>
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default EditJobDescription;
