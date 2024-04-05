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
  Box,
  Button,
  useDisclosure,
  Checkbox,
  Tooltip,
  Text,
  HStack,
  Avatar,
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

import moment from "moment";

import { Link } from "react-router-dom";
import { IVisit } from "../../../../../models/Interfaces/IVisit";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import PaginationTable from "../../../../Settings/components/PaginationTable/PaginationTable";
import Swal from "sweetalert2";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { IReminder } from "../../../../../models/Interfaces/IReminder";
import useReminderMarkSeen from "../../../../../hooks/PPM/useReminderMarkSeen";
import { BsEyeFill } from "react-icons/bs";

const columnHelper = createColumnHelper<IReminder>();

const columns = [
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
interface props {
  reminders: IReminder[];
}

const RemindersTable = ({ reminders }: props) => {
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
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filtering, setFiltering] = useState<string>("");

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
  const createModal = useDisclosure();

  return (
    <>
      <Flex w={"full"} direction={"row"} my={2}>
        <Spacer />

        <Button
          onClick={handleMarkSeenClick}
          variant="outline"
          size="md"
          leftIcon={<BsEyeFill />}
        >
          Mark Seen
        </Button>
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
                <>
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                </>
              ))}

              {!row.original.jobId ? (
                <Td key={row.id}>
                  <Checkbox
                    colorScheme="Primary"
                    ml={8}
                    mt={5}
                    isChecked={selectedReminderIds.includes(
                      parseInt(row.original.id)
                    )}
                    onChange={() =>
                      handleCheckboxChange(parseInt(row.original.id))
                    }
                  ></Checkbox>
                </Td>
              ) : (
                <Td></Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Spacer></Spacer>
      <PaginationTable data={reminders} table={table} />
    </>
  );
};

export default RemindersTable;
