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
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";

const JobDescription = ({ register, errors }: FormValidation) => {
  return (
    <FormControl
      width={{
        base: "100%",
        md: "100%",
        lg: "80%",
      }}
      isInvalid={errors.description !== undefined}
    >
      <RequiredFormLabel label={"Description"} />
      <Textarea
        bgColor={"white"}
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

export default JobDescription;
