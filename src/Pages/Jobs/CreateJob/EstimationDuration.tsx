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

const EstimationDuration = ({ register, errors }: FormValidation) => {
  return (
    <FormControl w={"full"} isInvalid={errors.estimationDuration !== undefined}>
      <FormLabel>Est. Duration</FormLabel>
      <Input placeholder="" {...register("estimationDuration")}></Input>
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.estimationDuration && errors.estimationDuration.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default EstimationDuration;
