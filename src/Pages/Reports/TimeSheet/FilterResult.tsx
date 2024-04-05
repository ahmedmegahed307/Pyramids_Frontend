import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
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
import React from "react";
import CollapsedTables from "./CollapsedTables";
import ExportToExcel from "../../Excel/ExportToExcel";
import { IconSortArrow } from "../../../assets/icons/IconSortArrow";
import PaginationTable from "../../Settings/components/PaginationTable/PaginationTable";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("userId", {
    header: () => <span>Engineer</span>,
    cell: (info) => (
      // <i>{GetUserName({ userId: info.getValue()?.toString() ?? "" })}</i>
      <Text>{info.getValue()}</Text>
    ),
  }),
  columnHelper.accessor("startTime", {
    header: () => <span>Normal Hours</span>,
    cell: (info) => <Text>-</Text>,
  }),
  columnHelper.accessor("endTime", {
    header: () => <span>Overtime Hours(x1.5)</span>,
    cell: (info) => <Text>-</Text>,
  }),
  columnHelper.accessor("isActive", {
    header: () => <span>Overtime Hours(x2)</span>,
    cell: (info) => <Text>-</Text>,
  }),
  columnHelper.accessor("id", {
    header: () => <span>Travel Hours</span>,
    cell: (info) => <Text>-</Text>,
  }),
  columnHelper.accessor("createdAt", {
    header: () => <span>Total Hours</span>,
    cell: (info) => <Text>-</Text>,
  }),
  columnHelper.accessor("jobId", {
    header: () => <span>Total Cost</span>,
    cell: (info) => <Text>0</Text>,
  }),
];
interface Props {
  data: any;
}
const FilterResult = ({ data }: Props) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (rowId: string) => {
    if (expandedRows.has(rowId)) {
      expandedRows.delete(rowId);
    } else {
      expandedRows.add(rowId);
    }
    setExpandedRows(new Set(expandedRows));
  };

  const columnsWithCollapsible = [
    {
      id: "collapsible",
      accessor: "userId",
      cell: (info: any) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => toggleRowExpansion(info.row.original)}
        >
          {expandedRows.has(info.row.original) ? (
            <TriangleDownIcon color={"teal"} fontSize={"xs"} />
          ) : (
            <TriangleUpIcon color={"teal"} fontSize={"xs"} />
          )}
        </span>
      ),
    },
    ...columns,
  ];

  const [filterItem, setFilterItem] = useState<any[]>();
  console.log("filter data", filterItem);

  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState(""); //2
  const table = useReactTable({
    data: filterItem ?? data,
    columns: columnsWithCollapsible,
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
  // const headers = [
  //   "Job ID",
  //   "Priority",
  //   "Client",
  //   "Type/SubType",

  //   "Site",
  //   "Description",

  //   "Logged Date",
  //   "Schedule Date",
  // ];
  // const keys = [
  //   "id",
  //   "proirty",
  //   "usersID",
  //   "type",

  //   "adress",
  //   "desc",
  //   "loggedDate",
  //   "schadule",
  // ];

  // const transformedData = filterItem?.map((item: any) => ({
  //   ...item,
  //   type: item.type?.name + "/" + item.type?.subType,
  //   adress: item.adress?.name,
  // }));

  return (
    <>
      <Card
        p={0}
        borderRadius={"xl"}
        width={"full"}
        variant={"outline"}
        borderRight={"hidden"}
        overflow={"scroll"}
      >
        <Flex w={"full"} direction={"row"}>
          <InputGroup width={"35%"} m={5}>
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
            headers={[]}
            keys={[]}
            sheetName={"Filter_Results"}
          />
        </Flex>
        <Table
          size={{
            base: "sm",
            md: "sm",
            lg: "md",
          }}
          rounded={"xl"}
          borderRadius={"xl"}
        >
          <Thead
            p={0}
            m={0}
            borderRadius={"xl"}
            bg={"#F7F7FB"}
            shadow={"none"}
            w={"full"}
          >
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
              <React.Fragment key={row.id}>
                <Tr bg={index % 2 !== 0 ? "Neutral.100" : "white"}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
                <React.Fragment key={`${row.id}-expanded`}>
                  {expandedRows.has(row.original) && (
                    <Tr>
                      <Td colSpan={columns.length}>
                        <CollapsedTables
                          session={row.original}
                          expandedRows={expandedRows}
                        />
                      </Td>
                    </Tr>
                  )}
                </React.Fragment>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
        <Spacer></Spacer>
        <PaginationTable data={filterItem} table={table} />
      </Card>
    </>
  );
};

export default FilterResult;
