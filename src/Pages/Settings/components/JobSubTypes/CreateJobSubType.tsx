import { useForm } from "react-hook-form";
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
  Select,
  Text,
} from "@chakra-ui/react";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";
import { Form } from "react-router-dom";
import JobType from "../../../../models/JobType";

const schema = z.object({
  name: z.string().min(3, { message: "JobType must be at least 3 characters" }),
  jobTypeId: z.string().nonempty({ message: "JobType is required" }),
});
export type FormCreateValidation = z.infer<typeof schema>;

type JobSubTypeFormProps = {
  onSubmit: (data: FormCreateValidation) => void;
  jobTypeList: JobType[];
};

const CreateJobSubType = ({ onSubmit, jobTypeList }: JobSubTypeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormCreateValidation>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormCreateValidation) => {
    onSubmit(data);
    reset();
  };
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter pl={5}>
            <Heading size={"md"} color={"teal"} mb={10}>
              Create JobType
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.name}
              >
                <RequiredFormLabel label={" Name"}></RequiredFormLabel>
                <Input
                  {...register("name")}
                  className="FormControl"
                  placeholder=""
                />
                {errors.name && (
                  <FormErrorMessage color="red">
                    {errors.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={!!errors.jobTypeId}
              >
                <RequiredFormLabel label={"Job Type"}></RequiredFormLabel>
                <Select {...register("jobTypeId")} placeholder="Select JobType">
                  {jobTypeList?.map((jobType) => (
                    <option key={jobType.id} value={jobType.id}>
                      {jobType.name}
                    </option>
                  ))}
                </Select>
                {errors.jobTypeId && (
                  <FormErrorMessage color="red">
                    {errors.jobTypeId.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit" w={"full"} my={10}>
                Submit
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default CreateJobSubType;
