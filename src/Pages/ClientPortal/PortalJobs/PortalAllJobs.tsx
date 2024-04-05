import {
  Card,
  Flex,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Spacer,
  Box,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  HStack,
  Badge,
} from "@chakra-ui/react";
import moment from "moment";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaginationTable from "../../Settings/components/PaginationTable/PaginationTable";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Job } from "../../../models/Job";
import { IconFlag } from "../../../assets/icons/IconFlag";
import { BsSearch } from "react-icons/bs";
import { IconSortArrow } from "../../../assets/icons/IconSortArrow";
import useAdminJobs from "../../../hooks/Jobs/useAdminJobs";
import useClientJobs from "../../../hooks/ClientPortal/useClientJobs";
import { EJobStatus } from "../../../models/Enums/EJobStatus";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import MainSearchIcon from "../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <Text>{info.getValue() ?? ""}</Text>,
    header: () => "ID",
  }),

  columnHelper.accessor(
    (value) => {
      const address1 = value.site?.addressLine1 ?? "";
      const address2 = value.site?.addressLine2 ?? "";
      const address = address1 + (address2 ? ", " + address2 : "");
      return address || "-";
    },
    {
      header: "Address",
      cell: (info) => {
        const fullAddress = info.getValue() || "-";
        const truncatedAddress = fullAddress.substring(0, 25);

        return (
          <Tooltip label={fullAddress} background={"gray.50"} color={"teal"}>
            <Text>
              {truncatedAddress} {fullAddress.length > 25 && "..."}
            </Text>
          </Tooltip>
        );
      },
    }
  ),
  columnHelper.accessor(
    (value) => {
      const firstName = value.engineer?.firstName;
      const lastName = value.engineer?.lastName;
      return firstName ? `${firstName} ${lastName}` : "-";
    },
    {
      header: "Assignee",
      cell: (info) => {
        const fullName = info?.getValue() ?? "-";
        return (
          <HStack>
            {fullName !== "-" && (
              <Avatar
                size={"sm"}
                name={fullName}
                textColor={"white"}
                src="https://bit.ly/broken-link"
              />
            )}
            <Text>{fullName}</Text>
          </HStack>
        );
      },
    }
  ),
  columnHelper.accessor((value) => value.jobType?.name ?? "-", {
    header: "Type",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor((value) => value.jobSubType?.name ?? "-", {
    header: "Sub Type",

    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor(
    (value) => {
      const schaduleDate = moment(value.scheduleDateEnd);
      const formattedDate = schaduleDate.isValid()
        ? schaduleDate.format("MMM DD - hh:mm a")
        : "-";
      return formattedDate;
    },
    {
      header: "ScheduleDate",
      cell: (info) => {
        return info.getValue() ?? "-";
      },
    }
  ),
  columnHelper.accessor("jobStatus", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue()?.status;
      const statusId = info.getValue()?.id;

      let color = "gray";
      let background = "#E5F7F8";

      switch (statusId) {
        case EJobStatus.OPEN:
          color = "#00ABB6";
          background = "#E5F7F8";

          break;
        case EJobStatus.CANCELLED:
          color = "#8D8D8D";
          background = "#EEEEEE";
          break;
        case EJobStatus.PENDING:
          color = "#FE9B0E";
          background = "#FFF9EE";

          break;
        case EJobStatus.ASSIGNED:
          color = "#0C9D61";
          background = "#E5F5EC";
          break;
        case EJobStatus.RESOLVED:
          color = "#3A70E2";
          background = "#E4F2FF";
          break;
        default:
          break;
      }

      return (
        <Badge
          variant={"subtle"}
          borderRadius={"xl"}
          px={3}
          py={1.5}
          color={color}
          background={background}
        >
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("jobPriority", {
    header: "Priority",

    cell: (info) => {
      return info.getValue() != null ? (
        <>
          {" "}
          <Button
            variant={"link"}
            color={
              info.getValue().priority == "Medium"
                ? "orange"
                : info.getValue().priority == "High"
                ? "Error.500"
                : "Success.500"
            }
            leftIcon={<IconFlag />}
            aria-label={"sdd"}
          >
            {" "}
            <Text color={"gray"}>
              {info.getValue()?.priority.toString()}
            </Text>{" "}
          </Button>{" "}
        </>
      ) : (
        "-"
      );
    },
  }),
];

const PortalAllJobs = () => {
  const { data, isLoading, isError } = useClientJobs();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [filtering, setFiltering] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

    debugTable: true,
  });

  const navigate = useNavigate();
  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <InputGroup width={{ base: "100%", md: "50%", lg: "30%" }} m={5}>
          <InputLeftElement pointerEvents="none" pt={2} pl={5}>
            <MainSearchIcon />
          </InputLeftElement>
          <Input
            bg={"white"}
            pl={12}
            h={"12"}
            borderRadius={"10"}
            border={"none"}
            focusBorderColor="Primary.500"
            borderWidth={0}
            placeholder="Search job"
            _placeholder={{
              color: "Neutral.500",
              opacity: "0.7",
            }}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </InputGroup>
        <Spacer />
        <Link to="/clientPortal/newRequest">
          <Button fontWeight={"600"} variant={"outline"} mr={5} mt={5}>
            New Request
          </Button>
        </Link>
      </Flex>
      <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
        <Flex w={"full"} direction={"row"}></Flex>

        <Table size="lg" rounded={"xl"} borderRadius={"xl"} maxH={800}>
          <Thead borderBottom={"1px solid #E5E5E5"}>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr key={index}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={index + 1}
                    border="none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      color={"Neutral.500"}
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      alignItems="center"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <Box color={"gray"} fontSize={"sm"} ml={1}>
                        {header.column.getIsSorted() === "desc" ? (
                          <ArrowDownIcon />
                        ) : header.column.getIsSorted() === "asc" ? (
                          <ArrowUpIcon />
                        ) : (
                          <IconSortArrow />
                        )}
                      </Box>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Tr
                key={index}
                bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}
                // onClick={() =>
                //   navigate(`/clientPortal/jobs/${row.original.id}`)
                // }
                // style={{ cursor: "pointer" }}
                _hover={{
                  color: "#4B4B4B",
                  textDecoration: "none",
                  background: "Neutral.200",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td key={index + 1}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Spacer></Spacer>
        <PaginationTable data={data} table={table} />
      </Card>
    </>
  );
};

export default PortalAllJobs;