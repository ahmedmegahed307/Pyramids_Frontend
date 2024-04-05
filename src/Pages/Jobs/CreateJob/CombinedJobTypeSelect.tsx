import { useState, useEffect } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import JobType from "../../../models/JobType";
import JobSubType from "../../../models/JobSubType";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";

interface JobTypeSelectProps {
  label: string;
  jobTypes: JobType[];
  jobSubTypes: JobSubType[];
  onSelect: (value: string) => void;
  register: any;
  errors: any;
}

const CombinedJobTypeSelect = ({
  label,
  jobTypes,
  jobSubTypes,
  onSelect,
  register,
  errors,
}: JobTypeSelectProps) => {
  const [selectedJobType, setSelectedJobType] = useState(0);
  const [selectedJobSubType, setSelectedJobSubType] = useState(0);

  const handleJobTypeChange = (selectedJobType) => {
    setSelectedJobType(selectedJobType.value);
    setSelectedJobSubType(0); // Reset JobSubType when JobType changes
    onSelect(`${selectedJobType.value}/${0}`);
  };

  const handleJobSubTypeChange = (selectedJobSubType) => {
    setSelectedJobSubType(selectedJobSubType.value);
    onSelect(`${selectedJobType}/${selectedJobSubType.value}`);
  };

  const options = jobTypes.flatMap((jobType: any) => {
    const subtypeOptions = jobSubTypes
      .filter((subtype) => subtype.jobTypeId === jobType.id)
      .map((subtype) => ({
        label: `${jobType.name}/${subtype.name}`,
        value: `${jobType.id}/${subtype.id}`,
      }));

    // Include the jobType even if there are no subtypes
    return subtypeOptions.length > 0
      ? subtypeOptions
      : [{ label: jobType.name, value: `${jobType.id}/0` }];
  });

  return (
    <FormControl isInvalid={errors.jobTypeId !== undefined}>
      <RequiredFormLabel label={label} />

      <Select
        size={{
          base: "md",
          md: "md",
          lg: "lg",
        }}
        useBasicStyles
        placeholder="Select Type/SubType"
        selectedOptionColorScheme="Primary"
        {...register("jobTypeId")}
        options={options}
        onChange={(selectedOption) => {
          if (selectedOption && (selectedOption as any).value !== undefined) {
            if ((selectedOption as any).value > 0) {
              handleJobTypeChange(selectedOption);
            } else {
              handleJobSubTypeChange(selectedOption);
            }
          }
        }}
      />
      <FormErrorMessage>
        {errors.jobTypeId && errors.jobTypeId.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CombinedJobTypeSelect;
