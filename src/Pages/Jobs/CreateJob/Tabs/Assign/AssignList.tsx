import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
  Button,
  useDisclosure,
  Spacer,
  Tooltip,
  TableContainer,
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

import { NavLink } from "react-router-dom";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import { AssignTabModel } from "./AssignMain";
import User from "../../../../../models/User";
import { FaRegCalendarAlt, FaUsersCog } from "react-icons/fa";
import moment from "moment";
import UpdateAssign from "./UpdateAssign";

const columnHelper = createColumnHelper<AssignTabModel>();

const columns = [
  columnHelper.accessor("engineerName", {
    header: " Engineer",

    cell: (info) => info?.getValue() || "-",
  }),

  // columnHelper.accessor("commentsToTech", {
  //   header: " Tech Comments",

  //   cell: (info) => info?.getValue(),
  // }),
  columnHelper.accessor((value) => value.commentsToTech ?? "-", {
    header: "Tech Comments",
    cell: (info) => {
      const commentsToTech = info.getValue() ?? "-";
      const commentsToTechTruncate = commentsToTech.substring(0, 50);
      return (
        <Tooltip
          label={commentsToTech}
          background={"gray.50"}
          color="Primary.700"
        >
          <Text>
            {commentsToTechTruncate} {commentsToTech.length > 50 && "..."}
          </Text>
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor(
    (value) => {
      const schaduleDate = moment(value.scheduleDate);
      const formattedDate = schaduleDate.isValid()
        ? schaduleDate.format("DD/MM/YYYY hh:mm a")
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

  columnHelper.accessor("estimatedDuration", {
    header: "Est. Duration",

    cell: (info) => info?.getValue(),
  }),
];
interface AssignTableProps {
  createAssignModal: any;
  assignlist: AssignTabModel[];
  updateAssign: (updatedAssign: AssignTabModel[]) => void;
  engineers: User[];
}

const AssignList = ({
  createAssignModal,
  assignlist,
  engineers,
  updateAssign,
}: AssignTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: assignlist,
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

  //edit
  const updateAssignModal = useDisclosure();
  const [editAssign, setEditAssign] = useState<AssignTabModel>();

  const handleUpdateAssign = (updatedAssign: AssignTabModel) => {
    console.log("updatedAssign::", updatedAssign);
    const updatedAssigns = assignlist?.map((Assign) =>
      Assign.id === updatedAssign.id ? updatedAssign : Assign
    );
    console.log("updatedAssign::s", updatedAssigns);

    updateAssign(updatedAssigns);
    setEditAssign(undefined);
  };

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        {assignlist.length === 0 && (
          <Button
            leftIcon={<FaUsersCog />}
            rightIcon={<FaRegCalendarAlt />}
            mb={4}
            mx={2}
            variant="link"
            size="md"
            onClick={() => {
              createAssignModal.onOpen();
            }}
          >
            Assign
          </Button>
        )}
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
                      fontSize={"md"}
                      fontWeight={"medium"}
                      alignItems="center"
                      textTransform={"capitalize"}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Flex>
                  </Th>
                ))}
                <Th
                  color={"Neutral.500"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                  alignItems="center"
                  textTransform={"capitalize"}
                >
                  <Flex
                    color={"Neutral.500"}
                    fontSize={"md"}
                    fontWeight={"medium"}
                    alignItems="center"
                  >
                    Actions
                  </Flex>
                </Th>
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} px={4}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<EditIcon />}
                    onClick={() => {
                      setEditAssign(row.original);
                      console.log("row", row.original);
                      updateAssignModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                    m={1}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer></Spacer>
      <UpdateAssign
        engineers={engineers}
        isOpen={updateAssignModal.isOpen}
        onClose={updateAssignModal.onClose}
        updateAssignRecord={editAssign}
        onUpdate={handleUpdateAssign}
        updateAssignModal={updateAssignModal}
      />
    </>
  );
};

export default AssignList;
