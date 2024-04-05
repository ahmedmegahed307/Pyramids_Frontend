import { Select } from "chakra-react-select";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
import useJobSubType from "../../hooks/Settings/JobSubType/useJobSubType";
interface Props {
  onSelectedSubTypes: (subtypesId: number[] | undefined) => void;
  register: any;
  errors: any;
}

const MultiJobSubTypeSelect = ({
  onSelectedSubTypes,
  register,
  errors,
}: Props) => {
  const { data: subTypes, isLoading, isError } = useJobSubType();
  const subTypesOptions = subTypes?.map((subtype) => ({
    value: subtype.id,
    label: subtype.name,
  }));

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  const handleSubTypeChange = (selectedSubTypes) => {
    const subTypesId = selectedSubTypes.map((subtype) => subtype.value);
    onSelectedSubTypes(subTypesId);
  };
  return (
    <Select
      useBasicStyles
      placeholder="Select Subtype(s)"
      isMulti
      {...register("subTypesId")}
      colorScheme="Primary"
      options={subTypesOptions}
      onChange={handleSubTypeChange}
    />
  );
};

export default MultiJobSubTypeSelect;
