import { FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiClientSelect from "../../GeneralComponents/MultiClientSelect";
import MultiEngineerSelect from "../../GeneralComponents/MultiEngineerSelect";
import MultiEventTypeSelect from "../Filters/MultiEventTypeSelect";

export interface FilterFormData {
  clientsId?: number[] | undefined;
  engineersId?: number[] | undefined;
  eventTypes?: string[] | undefined;
  onFilterData?: (data: FilterFormData) => void;
}

const CalendarFilterMain = ({ onFilterData }: FilterFormData) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FilterFormData>();

  const [filterForm, setFilterForm] = useState<FilterFormData>({
    clientsId: [],
    engineersId: [],
    eventTypes: [],
  });

  useEffect(() => {
    onFilterData(filterForm);
  }, [filterForm]);

  const handleSelectedClients = (clientsId: number[] | undefined) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      clientsId,
    }));
  };

  const handleSelectedEngineers = (engineersId: number[] | undefined) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      engineersId,
    }));
  };

  const handleSelectedEventTypes = (eventTypes: string[] | undefined) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      eventTypes,
    }));
  };

  return (
    <>
      <FormControl w={"400px"} ml={5}>
        <FormLabel color={"gray.500"}>Client</FormLabel>
        <MultiClientSelect onSelectedClients={handleSelectedClients} />
      </FormControl>
      <FormControl w={"400px"}>
        <FormLabel color={"gray.500"}>Engineers</FormLabel>
        <MultiEngineerSelect onSelectedEngineers={handleSelectedEngineers} />
      </FormControl>

      <FormControl w={"400px"}>
        <FormLabel color={"gray.500"}>Event Types</FormLabel>
        <MultiEventTypeSelect onSelectedEventTypes={handleSelectedEventTypes} />
      </FormControl>
    </>
  );
};

export default CalendarFilterMain;
