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
  Badge,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Job } from "../../models/Job";
import { EJobStatus } from "../../models/Enums/EJobStatus";
import { IconFlag } from "../../assets/icons/IconFlag";
import { ExportToExcelProps } from "../Excel/ExportToExcel";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { IconSortArrow } from "../../assets/icons/IconSortArrow";
import PaginationTable from "../Settings/components/PaginationTable/PaginationTable";

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <Text>{info.getValue() ?? ""}</Text>,
    header: () => "ID",
  }),

  columnHelper.accessor((value) => value.client?.name ?? "-", {
    header: "Client",

    cell: (info) => {
      return info.getValue();
    },
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
    (value) => value.jobType?.name + "/" + value.jobSubType?.name ?? "-",
    {
      header: "Type/SubType",

      cell: (info) => {
        return info.getValue();
      },
    }
  ),

  columnHelper.accessor(
    (value) =>
      (value.engineer?.firstName ?? "") +
      " " +
      (value.engineer?.lastName ?? ""),
    {
      header: "Assignee",

      cell: (info) => {
        return info.getValue();
      },
    }
  ),

  columnHelper.accessor(
    (value) => {
      const schaduleDate = moment(value.scheduleDateEnd);
      const formattedDate = schaduleDate.isValid()
        ? schaduleDate.format("MMM DD - hh:mm a")
        : "-";
      return formattedDate;
    },
    {
      header: "Schedule Date",
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
interface props {
  data: Job[];
  exportToExcel?: (exportToExcel: ExportToExcelProps) => void;
}
const RecentJobs = ({ data, exportToExcel }: props) => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getSortedRowModel: getSortedRowModel(), //3
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering, // *3

    // debugTable: true,
  });
  const headers = [
    "ID",
    "Client",
    "Address",
    "Type/SubType",
    "Assignee",
    "ScheduleDate",
    "Status",
    "Priority",
  ];
  const keys = [
    "id",
    "customerId",
    "adress",
    "type",
    "enginer",
    "schadule",
    "status",
    "proirty",
  ];

  const navigate = useNavigate();
  return (
    <>
      <Box overflowX="auto">
        <Table
          size={{
            base: "sm",
            sm: "md",
            md: "md",
            lg: "lg",
          }}
          width="full"
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      color={"Neutral 700"}
                      fontSize={"sm"}
                      fontWeight={"bold"}
                      alignItems="center"
                      textTransform={"capitalize"}
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}
                onClick={() => navigate(`/jobs/${row.original.id}`)}
                style={{ cursor: "pointer" }}
                _hover={{
                  color: "#4B4B4B",
                  textDecoration: "none",
                  background: "Neutral.200",
                }}
              >
                {row.getVisibleCells().map(
                  (
                    cell,
                    cellIndex // Modify this line
                  ) => (
                    <Td key={cellIndex}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Spacer></Spacer>
      <PaginationTable data={data ?? []} table={table} />
    </>
  );
};

export default RecentJobs;
