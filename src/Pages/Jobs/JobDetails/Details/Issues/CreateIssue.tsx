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
  Select,
  Textarea,
} from "@chakra-ui/react";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import { Asset } from "../../../../../models/Asset";

const schema = z.object({
  assetId: z.string().nonempty({ message: "Asset selection required" }),
  description: z.string().nonempty({ message: "Issue description required" }),
  jobIssuePriority: z
    .string()
    .nonempty({ message: "Priority selection required" }),
});

export type CreateIssueValidation = z.infer<typeof schema>;
type IssueFormProps = {
  onSubmit: (data: CreateIssueValidation) => void;
  clientAssets: Asset[];
};

const CreateIssue = ({ onSubmit, clientAssets }: IssueFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateIssueValidation>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: CreateIssueValidation) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={errors.assetId !== undefined}
              >
                <RequiredFormLabel label={"Asset"} />
                <Select size={"md"} variant="outline" {...register("assetId")}>
                  <option value={0} key={0}>
                    --None--
                  </option>
                  {clientAssets?.map((asset, index) => {
                    return (
                      <option value={asset.id} key={index + 1}>
                        {asset.serialNo}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>
                  <FormErrorMessage>
                    {errors.assetId && errors.assetId.message}
                  </FormErrorMessage>
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={errors.description !== undefined}
              >
                <RequiredFormLabel label={"Issue"} />
                <Textarea
                  size={"md"}
                  variant="outline"
                  placeholder="Issue"
                  {...register("description")}
                />
                <FormErrorMessage>
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
                isInvalid={errors.jobIssuePriority !== undefined}
              >
                <RequiredFormLabel label={"Priority"} />
                <Select
                  size={"md"}
                  variant="outline"
                  placeholder="Select Priority"
                  {...register("jobIssuePriority")}
                >
                  <option value={"Low"} key={1}>
                    Low
                  </option>
                  <option value={"Medium"} key={2}>
                    Medium
                  </option>
                  <option value={"High"} key={3}>
                    High
                  </option>
                </Select>
                <FormErrorMessage>
                  <FormErrorMessage>
                    {errors.jobIssuePriority && errors.jobIssuePriority.message}
                  </FormErrorMessage>
                </FormErrorMessage>
              </FormControl>

              <Button type="submit" w={"full"} my={10} isLoading={isSubmitting}>
                Submit
              </Button>
            </form>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default CreateIssue;
