import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  Wrap,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Company from "../../../../../models/Company";
import { workdayOptions } from "../../../../../StaticData/StaticData";

const schema = z.object({
  vatNumber: z
    .string()
    .min(3, { message: "Vat Number must be at least 3 characters" }),
  taxable: z.boolean().optional(),
  currency: z.string().optional(),
  paymentTerm: z.string().optional(),
  //normal hours
  normalHours: z.string().optional(),
  normalStartHour: z.string().optional(),
  normalEndHour: z.string().optional(),
  normalHourlyRate: z.string().optional(),

  // overtime x2
  overtimeHours: z.string().optional(),
  overtimeStartHour: z.string().optional(),
  overtimeEndHour: z.string().optional(),
  overtimeHourlyRate: z.string().optional(),
});

export type FormUpdateValidation = z.infer<typeof schema>;

type CompanyFormProps = {
  onSubmit: (data: FormUpdateValidation) => void;
  initialOriginal: Partial<Company> | undefined;
};

const UpdateFinancial = ({ onSubmit, initialOriginal }: CompanyFormProps) => {
  // Extract normal working days and hours
  const normalHoursMatch = initialOriginal?.normalWorkingHours?.match(
    /(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\s*\((.*?)\)/
  );
  const startHourNormal = normalHoursMatch?.[1] || "";
  const endHourNormal = normalHoursMatch?.[2] || "";

  // Extract overtime working days and hours x2
  const overtimeHoursMatch = initialOriginal?.overTimeWorkingHours?.match(
    /(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\s*\((.*?)\)/
  );
  const startHourOvertime = overtimeHoursMatch?.[1] || "";
  const endHourOvertime = overtimeHoursMatch?.[2] || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormUpdateValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      vatNumber: initialOriginal?.vatNumber || "",
      taxable: initialOriginal?.taxable || false,
      currency: initialOriginal?.currency || "",
      paymentTerm: initialOriginal?.paymentTerm || "",
      normalHours: initialOriginal?.normalWorkingHours || "",
      normalStartHour: startHourNormal,
      normalEndHour: endHourNormal,
      normalHourlyRate: initialOriginal?.normalHourlyRate?.toString() || "",
      //overtime x2
      overtimeHours: initialOriginal?.overTimeWorkingHours || "",
      overtimeStartHour: startHourOvertime,
      overtimeEndHour: endHourOvertime,
      overtimeHourlyRate: initialOriginal?.overtimeHourlyRate?.toString() || "",
    },
  });

  useEffect(() => {
    //normal
    const normalHoursMatch = initialOriginal?.normalWorkingHours?.match(
      /(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\s*\((.*?)\)/
    );
    const normalDaysSelectedInitial = normalHoursMatch?.[3]?.split(", ") || [];
    setNormalDaysSelected(normalDaysSelectedInitial);
    //overtime 2x
    const overtimeHoursMatch = initialOriginal?.overTimeWorkingHours?.match(
      /(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\s*\((.*?)\)/
    );
    const overtimeDaysSelectedInitial =
      overtimeHoursMatch?.[3]?.split(", ") || [];
    setOvertimeDaysSelected(overtimeDaysSelectedInitial);
  }, [
    initialOriginal?.normalWorkingHours,
    initialOriginal?.overTimeWorkingHours,
  ]);

  const handleFormSubmit = (data: FormUpdateValidation) => {
    const {
      normalStartHour,
      normalEndHour,
      overtimeStartHour,
      overtimeEndHour,
    } = data;

    const normalDays = normalDaysSelected.join(", ");
    const overtimeDays = overtimeDaysSelected.join(", ");
    const newData = {
      ...data,
      normalHours: `${normalStartHour} - ${normalEndHour} (${normalDays})`,
      overtimeHours: `${overtimeStartHour} - ${overtimeEndHour} (${overtimeDays})`,
    };

    onSubmit(newData);
    reset();
  };

  const [normalDaysSelected, setNormalDaysSelected] = useState<string[]>([]);

  const handleNormalDaysSelect = (option: string) => {
    console.log("select option", option);
    if (!normalDaysSelected.includes(option)) {
      setNormalDaysSelected([...normalDaysSelected, option]);
    }
    //console.log("selected normal", normalDaysSelected);
  };

  const handleNormalDaysDeselect = (option: string) => {
    console.log("deslect option", option);
    const updatedOptions = normalDaysSelected.filter(
      (value) => value !== option
    );
    setNormalDaysSelected(updatedOptions);
  };

  //overtime x1.5
  const [overtimeDaysSelected, setOvertimeDaysSelected] = useState<string[]>(
    []
  );
  const handleOvertimeDaysSelect = (option: string) => {
    if (!overtimeDaysSelected.includes(option)) {
      setOvertimeDaysSelected([...overtimeDaysSelected, option]);
    }
    console.log(" overtime selected", overtimeDaysSelected);
  };

  const handleOvertimeDaysDeselect = (option: string) => {
    const updatedOptions = overtimeDaysSelected.filter(
      (value) => value !== option
    );
    setOvertimeDaysSelected(updatedOptions);
  };

  //overtime x2
  const [overtime2DaysSelected, setOvertime2DaysSelected] = useState<string[]>(
    []
  );
  const handleOvertime2DaysSelect = (option: string) => {
    if (!overtime2DaysSelected.includes(option)) {
      setOvertime2DaysSelected([...overtime2DaysSelected, option]);
    }
    console.log(" overtime selected", overtime2DaysSelected);
  };

  const handleOvertime2DaysDeselect = (option: string) => {
    const updatedOptions = overtime2DaysSelected.filter(
      (value) => value !== option
    );
    setOvertime2DaysSelected(updatedOptions);
  };
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter pl={5}>
            <Box overflowY="auto" maxH={"calc(100vh - 50px)"}>
              <form
                style={{ marginRight: "50px" }}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                  isInvalid={!!errors.vatNumber}
                >
                  <FormLabel>VAT NUMBER</FormLabel>
                  <Input
                    {...register("vatNumber")}
                    className="FormControl"
                    placeholder=""
                  />
                  {errors.vatNumber && (
                    <FormErrorMessage color="red">
                      {errors.vatNumber.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Payment Term</FormLabel>
                  <Select {...register("paymentTerm")} className="FormControl">
                    <option value="">Select Payment Term</option>
                    <option value="Net 7">Net 7</option>
                    <option value="Net 8">Net 8</option>
                    <option value="Net 9">Net 9</option>
                  </Select>
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Currency Code</FormLabel>
                  <Select {...register("currency")} className="FormControl">
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GDB">GDB</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>
                    <Checkbox
                      {...register("taxable")}
                      size="lg"
                      colorScheme="Primary"
                      mr={2}
                      ml={1}
                    />
                    TAXABLE
                  </FormLabel>
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Normal Hourly Rates</FormLabel>
                  <Input
                    {...register("normalHourlyRate")}
                    className="FormControl"
                    placeholder="0.00"
                  />
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Overtime (2x) Hourly Rates</FormLabel>
                  <Input
                    {...register("overtimeHourlyRate")}
                    className="FormControl"
                    placeholder="0.00"
                  />
                </FormControl>

                <Divider mb={5} />
                <VStack
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel fontWeight={"bold"} color={"#294C58"}>
                    Normal Hours
                  </FormLabel>
                  <FormControl>
                    <Wrap spacing={2}>
                      {workdayOptions.map((option) => (
                        <Tag
                          key={option}
                          variant="solid"
                          bg={
                            normalDaysSelected.includes(option)
                              ? "Primary.700"
                              : "transparent"
                          }
                          color={
                            normalDaysSelected.includes(option)
                              ? "white"
                              : "gray.500"
                          }
                          cursor="pointer"
                          onClick={() =>
                            normalDaysSelected.includes(option)
                              ? handleNormalDaysDeselect(option)
                              : handleNormalDaysSelect(option)
                          }
                        >
                          <TagLabel>{option}</TagLabel>
                        </Tag>
                      ))}
                    </Wrap>
                  </FormControl>
                  <HStack mt={2}>
                    <FormControl isInvalid={!!errors.normalStartHour}>
                      <Input {...register("normalStartHour")} type="time" />
                      {errors.normalStartHour && (
                        <FormErrorMessage color="red">
                          {errors.normalStartHour.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.normalEndHour}>
                      <Input {...register("normalEndHour")} type="time" />
                      {errors.normalEndHour && (
                        <FormErrorMessage color="red">
                          {errors.normalEndHour.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </HStack>
                </VStack>
                <Divider />
                <VStack
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel fontWeight={"bold"} color={"#294C58"}>
                    Overtime Hours (2x)
                  </FormLabel>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <Wrap spacing={2}>
                      {workdayOptions.map((option) => (
                        <Tag
                          key={option}
                          variant="solid"
                          bg={
                            overtimeDaysSelected.includes(option)
                              ? "Primary.700"
                              : "transparent"
                          }
                          color={
                            overtimeDaysSelected.includes(option)
                              ? "white"
                              : "gray.500"
                          }
                          cursor="pointer"
                          onClick={() =>
                            overtimeDaysSelected.includes(option)
                              ? handleOvertimeDaysDeselect(option)
                              : handleOvertimeDaysSelect(option)
                          }
                        >
                          <TagLabel>{option}</TagLabel>
                        </Tag>
                      ))}
                    </Wrap>
                  </FormControl>
                  <HStack mt={2}>
                    <FormControl>
                      <Input {...register("overtimeStartHour")} type="time" />
                    </FormControl>

                    <FormControl>
                      <Input {...register("overtimeEndHour")} type="time" />
                    </FormControl>
                  </HStack>
                </VStack>
                <Divider />

                <Button type="submit" w={"full"} my={10}>
                  Save
                </Button>
              </form>
            </Box>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default UpdateFinancial;
