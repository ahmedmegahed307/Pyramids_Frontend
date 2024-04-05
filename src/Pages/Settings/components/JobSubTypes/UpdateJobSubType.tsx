import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Heading,
  AbsoluteCenter,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import JobSubType from "../../../../models/JobSubType";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import JobType from "../../../../models/JobType";

const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Resolution must be at least 3 characters" }),
  jobTypeId: z.string().nonempty({ message: "Please select a Job Type" }),
});
export type FormUpdateValidation = z.infer<typeof updateSchema>;

type UpdateJobSubTypeFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  defaultValue: JobSubType;
  jobTypeList: JobType[];
};

const UpdateJobSubType = ({
  onSubmit,
  jobTypeList,
  defaultValue,
}: UpdateJobSubTypeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: defaultValue.name,
      jobTypeId: defaultValue.jobTypeId.toString(),
    },
  });

  const handleFormSubmit = (data: FormUpdateValidation) => {
    onSubmit(data);
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter pl={5}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Heading size={"md"} color={"teal"} mb={10}>
                Update Job SubType
              </Heading>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  className="FormControl"
                  placeholder=""
                  {...register("name")}
                />
                {errors.name && <Text color="red">{errors.name.message}</Text>}
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
                Update
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default UpdateJobSubType;
