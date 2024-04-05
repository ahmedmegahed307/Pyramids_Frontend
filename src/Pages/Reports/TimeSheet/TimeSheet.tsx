import { Button, Center, HStack, Heading, Card, Box } from "@chakra-ui/react";

import FilterResult from "./FilterResult";
import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import DateFromSelect from "../GeneralFilters/DateFromSelect";
import DateToSelect from "../GeneralFilters/DateToSelect";
import EngineerSelect from "../GeneralFilters/EngineerSelect";

export interface timeSheetFormData {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  engineers: string[] | undefined;
}

const TimeSheet = () => {
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("TimeSheet  Report");
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<timeSheetFormData>();

  const onSubmit: SubmitHandler<timeSheetFormData> = (data) => {
    data.engineers = timeSheet.engineers;
    console.log("data", data);
    setFilterData(data);
  };

  const [timeSheet, settimeSheet] = useState<timeSheetFormData>(
    {} as timeSheetFormData
  );
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [filterData, setFilterData] = useState<timeSheetFormData>();

  return (
    <>
      <Box m={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={5} borderWidth={1} borderRadius="xl">
            <HStack marginTop={10} marginLeft={10}>
              <DateFromSelect register={register} errors={errors} />
              <DateToSelect register={register} errors={errors} />
              <EngineerSelect
                onSelectedEngineers={(engineers) =>
                  settimeSheet({ ...timeSheet, engineers })
                }
              />
            </HStack>

            <Center>
              <Button
                mt={5}
                type="submit"
                px={10}
                variant="solid"
                size="md"
                onClick={() => setIsSearchClicked(true)}
              >
                Search
              </Button>
            </Center>
          </Box>
        </form>

        {isSearchClicked && (
          <Box mt={5}>
            <FilterResult data={filterData || []} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default TimeSheet;
