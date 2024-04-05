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
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  TableContainer,
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
import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { Job } from "../../../models/Job";
import { IconFlag } from "../../../assets/icons/IconFlag";
import ExportToExcel from "../../Excel/ExportToExcel";
import { IconSortArrow } from "../../../assets/icons/IconSortArrow";
import PaginationTable from "../../Settings/components/PaginationTable/PaginationTable";
import { JobQueryResponse } from "../../../models/JobQueryResponse";

const columnHelper = createColumnHelper<JobQueryResponse>();

const columns = [
  columnHelper.accessor("jobId", {
    cell: (info) => <Text>{info.getValue() ?? ""}</Text>,
    header: () => "ID",
  }),
  columnHelper.accessor("priorityName", {
    header: "Priority",

    cell: (info) => {
      return info.getValue() != null ? (
        <>
          {" "}
          <Button
            variant={"link"}
            color={
              info.getValue() == "Low"
                ? "Info.500"
                : info.getValue() == "High"
                ? "Error.500"
                : "Success.500"
            }
            leftIcon={<IconFlag />}
            aria-label={"sdd"}
          >
            {" "}
            <Text color={"gray"}>{info.getValue()}</Text>{" "}
          </Button>{" "}
        </>
      ) : (
        "-"
      );
    },
  }),
  columnHelper.accessor((value) => value.jobTypeName ?? "-", {
    header: "Type",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor((value) => value.jobSubTypeName ?? "-", {
    header: "Sub Type",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor((value) => value?.clientName ?? "-", {
    header: "Client",

    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor((value) => value.site?.name ?? "-", {
    header: "Site",

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

  columnHelper.accessor((value) => value.description ?? "-", {
    header: "Description",
    cell: (info) => {
      const description = info.getValue() ?? "-";
      const truncatedDescription = description.substring(0, 50);
      return (
        <Tooltip label={description} background={"gray.50"} color={"teal"}>
          <Text>
            {truncatedDescription} {description.length > 50 && "..."}
          </Text>
        </Tooltip>
      );
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
  columnHelper.accessor(
    (value) => {
      const jobDate = moment(value.jobDate);
      const formattedDate = jobDate.isValid()
        ? jobDate.format("MMM DD - hh:mm a")
        : "-";
      return formattedDate;
    },
    {
      header: "Job Date",
      cell: (info) => {
        return info.getValue() ?? "-";
      },
    }
  ),
];
interface Props {
  filterResult: any;
}

const FilterResult = ({ filterResult }: Props) => {
  console.log("filterResult::", filterResult);
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState(""); //2
  const table = useReactTable({
    data: filterResult || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), //3
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering, // *3
    debugTable: true,
  });
  const headers = [
    "Job ID",
    "Priority",
    "Type/SubType",
    "Client",
    "Site",
    "Address",
    "Description",
    "Schedule Date",
    "Logged Date",
  ];
  const keys = [
    "id",
    "priority",
    "type",
    "customerId",
    "site",
    "adress",
    "desc",
    "schadule",
    "loggedDate",
  ];

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <InputGroup width={{ base: "100%", md: "50%", lg: "30%" }} m={5}>
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input
            borderRadius={"xl"}
            placeholder="Enter filter"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </InputGroup>
        <Spacer />

        <ExportToExcel
          data={[]}
          headers={headers || []}
          keys={keys || []}
          sheetName={"Filter_Results"}
        />
      </Flex>
      <TableContainer>
        <Table
          size={{
            base: "sm",
            md: "sm",
            lg: "md",
          }}
          rounded={"xl"}
          borderRadius={"xl"}
        >
          <Thead borderBottom={"1px solid #E5E5E5"}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
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

                      <Box color={"#1396ab"} fontSize={"md"} ml={1}>
                        <IconSortArrow />
                      </Box>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer></Spacer>
      <PaginationTable data={filterResult ?? []} table={table} />
    </>
  );
};

export default FilterResult;
