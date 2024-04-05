import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  Textarea,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";

interface Props extends FormValidation {
  defaultValue: number;
}

const EditEstimatedDuration = ({ register, errors, defaultValue }: Props) => {
  return (
    <FormControl w={"full"} isInvalid={errors.estimationDuration !== undefined}>
      <FormLabel>Est. Duration</FormLabel>
      <Input
        defaultValue={defaultValue}
        placeholder=""
        {...register("estimationDuration")}
      ></Input>
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.estimationDuration && errors.estimationDuration.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default EditEstimatedDuration;
