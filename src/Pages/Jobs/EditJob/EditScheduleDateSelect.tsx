import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";

interface Props extends FormValidation {
  defaultValue: string;
}

const EditScheduleDateSelect = ({ register, errors, defaultValue }: Props) => {
  console.log("defaultValue::", defaultValue);
  return (
    <FormControl w={"full"} isInvalid={errors.scheduleDate !== undefined}>
      <FormLabel>Schedule Date</FormLabel>

      <Input
        defaultValue={defaultValue}
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

export default EditScheduleDateSelect;
