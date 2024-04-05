import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";

const ScheduleDateSelect = ({ register, errors }: FormValidation) => {
  return (
    <FormControl w={"full"} isInvalid={errors.scheduleDate !== undefined}>
      <FormLabel>Schedule Date</FormLabel>

      <Input
        {...register("scheduleDate")}
        type="datetime-local"
        className="FormControl"
        placeholder="Select Schedule Date"
      />
      <FormErrorMessage>
        <FormErrorMessage>
          {errors.scheduleDate && errors.scheduleDate.message}
        </FormErrorMessage>
      </FormErrorMessage>
    </FormControl>
  );
};

export default ScheduleDateSelect;
