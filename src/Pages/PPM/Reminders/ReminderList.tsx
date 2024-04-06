import {
  Card,
  Flex,
  Text,
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
  Button,
  Checkbox,
  HStack,
  VStack,
  Tooltip,
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
import { BsEyeFill, BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { IReminder } from "../../../models/Interfaces/IReminder";
import useReminder from "../../../hooks/PPM/useReminder";
import ExportToExcel from "../../Excel/ExportToExcel";
import { IconSortArrow } from "../../../assets/icons/IconSortArrow";
import PaginationTable from "../../Settings/components/PaginationTable/PaginationTable";
import moment from "moment";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import useReminderMarkSeen from "../../../hooks/PPM/useReminderMarkSeen";
import MainSearchIcon from "../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<IReminder>();

const columns = [
  columnHelper.accessor("clientName", {
    header: "Client",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("contractRef", {
    header: "Contract Reference",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jobId", {
    header: "Job ID",
    cell: (info) => (
      <Link to={`/jobs/${info.getValue()}`} target="_blank">
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("reminderDate", {
    header: "Reminder Date",
    cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
  }),

  columnHelper.accessor("engineerName", {
    header: "Engineer",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("reminderDetails", {
    header: "Reminder Details",
    cell: (info) => {
      const details = info.getValue() || "-";
      const truncatedDetails = details.substring(0, 50);

      return (
        <Tooltip label={details} background={"gray.50"} color={"teal"}>
          <Text>
            {truncatedDetails} {details.length > 50 && "..."}
          </Text>
        </Tooltip>
      );
    },
  }),
];

const ReminderList = () => {
  const { data: reminders, isLoading, isError } = useReminder(true);

  const [selectedReminderIds, setSelectedReminderIds] = useState<number[]>([]);
  console.log("selectedReminderIds::", selectedReminderIds);
  const [isSeenUpdated, setIsSeenUpdated] = useState(false);

  const markReminderAsSeenQuery = useReminderMarkSeen();

  const handleCheckboxChange = (reminderId: number) => {
    if (selectedReminderIds.includes(reminderId)) {
      setSelectedReminderIds(
        selectedReminderIds.filter((id) => id !== reminderId)
      );
    } else {
      setSelectedReminderIds([...selectedReminderIds, reminderId]);
    }
    setIsSeenUpdated(true);
  };

  const handleMarkSeenClick = () => {
    if (isSeenUpdated) {
      markReminderAsSeenQuery.mutateAsync(selectedReminderIds);
      setIsSeenUpdated(false);
      setSelectedReminderIds([]); // Clear the selected IDs
    }
  };

  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState(""); //2

  const table = useReactTable({
    data: reminders || [],
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
    "Client",
    " Contract Reference",
    "Job ID",
    "Reminder Date",
    "Engineer",
    "Reminder Details",
  ];
  const keys = [
    "client",
    "contractReference",
    "jobID",
    "reminderDate",
    "engineer",
    "reminderDetails",
  ];
  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  return (
    <>
      <HStack w={"full"}>
        <InputGroup width={{ base: "100%", md: "50%", lg: "30%" }} mb={2}>
          <InputLeftElement pointerEvents="none" pt={2} pl={5}>
            <MainSearchIcon />
          </InputLeftElement>
          <Input
            // bg={"white"}
            pl={12}
            h={"12"}
            borderRadius={"10"}
            // border={"none"}
            focusBorderColor="Primary.500"
            // borderWidth={0}
            placeholder="Enter filter"
            _placeholder={{
              color: "Neutral.500",
              opacity: "0.7",
            }}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </InputGroup>

        <Spacer />
        <VStack align="flex-end">
          <HStack>
            <ExportToExcel
              data={[]}
              headers={headers || []}
              keys={keys || []}
              sheetName={"Reminders_List"}
            />

            <Button
              onClick={handleMarkSeenClick}
              variant="outline"
              size="md"
              leftIcon={<BsEyeFill />}
            >
              Mark Seen
            </Button>
          </HStack>
          <HStack pr={1}>
            <Text color={"yellow.500"}>
              Table shows reminders for the past 2 weeks and next 30 days
            </Text>
          </HStack>
        </VStack>
      </HStack>
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

                    <Box color={"Primary.500"} fontSize={"md"} ml={1}>
                      <IconSortArrow />
                    </Box>
                  </Flex>
                </Th>
              ))}
              <Th
                color={"Neutral.500"}
                fontSize={"sm"}
                fontWeight={"medium"}
                alignItems="center"
              >
                Actions
              </Th>
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
              <Checkbox
                ml={8}
                mt={5}
                colorScheme="Primary"
                isChecked={selectedReminderIds.includes(
                  parseInt(row.original.id)
                )}
                onChange={() => handleCheckboxChange(parseInt(row.original.id))}
              >
                {row.original.isSeen}
              </Checkbox>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Spacer></Spacer>

      <PaginationTable data={reminders} table={table} />
    </>
  );
};

export default ReminderList;
