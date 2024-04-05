//import useAdminJobs from "../../../Jobs/hooks/AdminJobs/useAdminJobs";
import {
  Card,
  Heading,
  CardBody,
  VStack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import JobList from "../../../Jobs/JobList/JobList";
//import AllJobsTable from "../../../Jobs/JobList/AllJobsTable";

const JobsData = () => {
  //const { data: jobsList } = useAdminJobs();
  // const filteredJobsList = jobsList?.filter((item) => item.status !== "VISIT");

  // // Calculate the overall percentage of completion
  // const totalJobs = filteredJobsList?.length || 0;
  // const openJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "OPEN").length || 0;
  // const assignedJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "ASSIGNED").length || 0;
  // const resolvedJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "RESOLVED").length || 0;
  // const closedJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "CLOSED").length || 0;
  // const cancelledJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "CANCELLED").length || 0;
  // const pendingJobsCount =
  //   filteredJobsList?.filter((item) => item.status === "PENDING").length || 0;

  return (
    <Card w={"full"} borderRadius={"2xl"} variant={"outline"}>
      <Heading px={5} mt={1} fontSize={"lg"} fontWeight={"bold"}>
        Statics on September
      </Heading>
      <CardBody>
        <VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Total Jobs
              </Heading>{" "}
              <Text fontWeight={"lg"}>{1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#4BA1FF"
                height="12px"
                isLabelVisible={false}
                completed={100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Open
              </Heading>{" "}
              <Text fontWeight={"lg"}>{1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#01565B"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Assigned{" "}
              </Heading>{" "}
              <Text fontWeight={"lg"}> {1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#E1F296"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Resolved
              </Heading>{" "}
              <Text fontWeight={"lg"}>{1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#4BA1FF"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Closed
              </Heading>{" "}
              <Text fontWeight={"lg"}>{1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#01565B"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Canceled{" "}
              </Heading>{" "}
              <Text fontWeight={"lg"}> {1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#E1F296"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
          <VStack w={"full"}>
            <HStack w={"full"} justify={"space-between"}>
              {" "}
              <Heading fontSize={"sm"} color={"Neutral.500"}>
                Pending
              </Heading>{" "}
              <Text fontWeight={"lg"}> {1}</Text>
            </HStack>

            <Box w={"full"}>
              <ProgressBar
                width="full"
                bgColor="#4BA1FF"
                height="12px"
                isLabelVisible={false}
                completed={(1 / 1) * 100}
              />
            </Box>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default JobsData;
