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
} from "@chakra-ui/react";

const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Resolution must be at least 3 characters" }),
});
export type FormUpdateValidation = z.infer<typeof updateSchema>;

type UpdateResolutionFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  defaultValue: string;
};

const UpdateResolution = ({
  onSubmit,
  defaultValue,
}: UpdateResolutionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: defaultValue,
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
          <AbsoluteCenter>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Heading my={5} size={"md"}>
                Update Resolution
              </Heading>
              <FormControl pb={5} w={"lg"}>
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

export default UpdateResolution;
