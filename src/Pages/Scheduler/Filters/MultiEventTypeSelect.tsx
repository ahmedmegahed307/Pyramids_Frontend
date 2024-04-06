import { GroupBase, OptionBase, Select } from "chakra-react-select";
import React from "react";
import {
  ColorOption,
  EventType,
  eventTypeOptions,
} from "../../../StaticData/StaticData";

interface Props {
  onSelectedEventTypes: (types: string[] | undefined) => void;
}

const MultiEventTypeSelect = ({ onSelectedEventTypes }: Props) => {
  const handleTypeChange = (selectedTypes) => {
    const types = selectedTypes.map((type) => type.value);
    onSelectedEventTypes(types);
  };
  return (
    <Select<ColorOption, true, GroupBase<ColorOption>>
      useBasicStyles
      styles={{
        control: (provided) => ({
          ...provided,
          border: 0,
          outline: "1px solid white",
        }),
      }}
      placeholder="Select Event Type(s)"
      isMulti
      options={eventTypeOptions}
      onChange={handleTypeChange}
    />
  );
};

export default MultiEventTypeSelect;
