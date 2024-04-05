import {
  Button,
  Center,
  HStack,
  Heading,
  Box,
  Card,
  Grid,
} from "@chakra-ui/react";
import SiteSelect from "./JobQueryFilters/SiteSelect";
import PrioritySelect from "./JobQueryFilters/PrioritySelect";
import StatusSelect from "./JobQueryFilters/StatusSelect";
import JobTypeSelect from "./JobQueryFilters/JobTypeSelect";

import FilterResult from "./FilterResult";
import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { set } from "date-fns";
import { useParams } from "react-router-dom";
import SingleClientSelect from "./JobQueryFilters/SingleClientSelect";
import { EJobStatus } from "../../../models/Enums/EJobStatus";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import DateTypeSelect from "../GeneralFilters/DateTypeSelect";
import DateFromSelect from "../GeneralFilters/DateFromSelect";
import DateToSelect from "../GeneralFilters/DateToSelect";
import useGetSitesByClientId from "../../../hooks/Settings/Client/Site/useGetSitesByClientId";
import useGetSubTypesByTypeId from "../../../hooks/Settings/JobSubType/useGetSubTypesByTypeId";
import JobSubTypeSelect from "./JobQueryFilters/JobSubTypeSelect";
import { Job } from "../../../models/Job";
import useAuthStore from "../../../hooks/Authentication/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import { GetJobQueryData } from "../../../services/Reports/reportService";
import { EDateType } from "../../../models/Enums/EDateType";
import { useJobQueryStore } from "../../../hooks/AI/AIjobQueryStore";

export interface JobQueryFormData {
  dateType: EDateType | undefined;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  jobPriorityId: string | undefined;
  jobTypeId: string | undefined;
  jobSubTypeId: string | undefined;
  jobStatusId: EJobStatus | undefined;
  clientId: string | undefined;
  siteId: string | undefined;
  companyId: number;
}

const JobQuery = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [mergedData, setMergedData] = useState<JobQueryFormData>(
    {} as JobQueryFormData
  );
  const queryKey = ["jobQueryData", { mergedData }];

  const {
    data: filterResult,
    isLoading,
    isError,
  } = useQuery<Job[]>(queryKey, () => GetJobQueryData(mergedData));

  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("JobQuery");
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<JobQueryFormData>();

  const [jobQuery, setJobQuery] = useState<JobQueryFormData>(
    {} as JobQueryFormData
  );
  const selectedClientId = watch("clientId");
  // get sites according to selected client
  const { data: clientSites } = useGetSitesByClientId(
    parseInt(selectedClientId)
  );

  const selectedJobTypeId = watch("jobTypeId");
  // get subTypes according to selected jobType
  const { data: jobSubTypes } = useGetSubTypesByTypeId(
    parseInt(selectedJobTypeId)
  );

  //submit form
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const onSubmit: SubmitHandler<JobQueryFormData> = async (data) => {
    const mergedData = {
      ...data,
      siteId: jobQuery.siteId,
      companyId: user?.companyId,
    };
    setMergedData(mergedData);
    queryClient.invalidateQueries(queryKey);
    setIsAISearch(false);
    setIsSearchClicked(true);
  };

  const { jobsList, isAISearch, setIsAISearch } = useJobQueryStore();
  useEffect(() => {
    if (isAISearch) {
      setIsSearchClicked(false);
    }
  }, [isAISearch]);
  return (
    <Card mr={12} mb={5} p={10} pr={0} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4}>
        Job Query Report
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gridColumnGap={6}
          gridRowGap={6}
          px={5}
          position={"relative"}
          mb={20}
        >
          <DateTypeSelect register={register} errors={errors} />
          <DateFromSelect register={register} errors={errors} />
          <DateToSelect register={register} errors={errors} />

          <JobTypeSelect register={register} errors={errors} />
          <JobSubTypeSelect
            jobSubTypes={jobSubTypes}
            register={register}
            errors={errors}
          />

          <StatusSelect register={register} errors={errors} />
          <PrioritySelect register={register} errors={errors} />
          <SingleClientSelect register={register} optionalClientId={id} />

          <SiteSelect
            sites={clientSites ?? []}
            onSelectedSites={(sites) => {
              const siteId = sites.map((site) => site).join(";");

              setJobQuery((prevJobQuery) => ({
                ...prevJobQuery,
                siteId,
              }));
            }}
          />

          <Button
            position={"absolute"}
            bottom={-20}
            right={5}
            type="submit"
            variant="solid"
            size="md"
          >
            Search
          </Button>
        </Grid>
      </form>
      {isAISearch ? (
        <Box mt={5}>
          <FilterResult filterResult={jobsList} />
        </Box>
      ) : isSearchClicked && isLoading ? (
        <IsLoading />
      ) : isSearchClicked && isError ? (
        <IsError />
      ) : (
        isSearchClicked &&
        filterResult && (
          <Box mt={5}>
            <FilterResult filterResult={filterResult} />
          </Box>
        )
      )}
    </Card>
  );
};

export default JobQuery;
