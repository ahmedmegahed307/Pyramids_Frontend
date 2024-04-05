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
import JobType from "../../../../models/JobType";

const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Resolution must be at least 3 characters" }),
});
export type FormUpdateValidation = z.infer<typeof updateSchema>;

type UpdateJobTypeFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  defaultValue: JobType;
};

const UpdateJobType = ({ onSubmit, defaultValue }: UpdateJobTypeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: defaultValue.name,
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
                Update JobType
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

export default UpdateJobType;
