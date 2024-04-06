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

const schema = z.object({
  name: z.string().min(3, { message: "JobType must be at least 3 characters" }),
});
export type FormCreateValidation = z.infer<typeof schema>;

type JobTypeFormProps = {
  onSubmit: (data: FormCreateValidation) => void;
};

const CreateJobType = ({ onSubmit }: JobTypeFormProps) => {
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
            <Heading size={"md"} color="Primary.700" mb={10}>
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

export default CreateJobType;
