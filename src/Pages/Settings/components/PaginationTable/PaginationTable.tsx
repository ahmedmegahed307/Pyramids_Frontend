import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tooltip,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";

interface PaginationTableProps {
  table: any;
  data: any;
}

const PaginationTable = ({ table, data }: PaginationTableProps) => {
  if (!data || data.length === 0) {
    return (
      <Center>
        <Text color={"red"} m={5}>
          no result found
        </Text>
      </Center>
    );
  }
  const currentPageRecordCount = table.getRowModel().rows.length;
  const isLastPage =
    table.getState().pagination.pageIndex === table.getPageCount() - 1 &&
    data.length > 10;
  const hasLessThan10Records = currentPageRecordCount < 10;

  return (
    <>
      <Flex
        w={"full"}
        justifyContent="space-between"
        m={4}
        alignItems="center"
        whiteSpace={"nowrap"}
      >
        <HStack color={"Neutral.500"} spacing={2}>
          {data.length > 0 && table.getRowModel().rows.length > 0 && (
            <>
              <HStack spacing={2} alignItems="center">
                <Text>Rows per page:</Text>
                <Select
                  variant={"unstyled"}
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </Select>

                <Text fontWeight="bold" as="span">
                  {table.getState().pagination.pageIndex + 1} of
                </Text>

                <Text fontWeight="bold" as="span">
                  {table.getPageCount()}
                </Text>
              </HStack>
            </>
          )}
          {hasLessThan10Records && !isLastPage ? null : ( // Conditional rendering based on record count
            <Tooltip label="Previous Page">
              <IconButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                icon={<ChevronLeftIcon fontSize={"xl"} />}
                ml={4}
                size={"sm"}
                aria-label={""}
                variant={"outline"}
              />
            </Tooltip>
          )}

          {table.getCanNextPage() && (
            <Tooltip label="Next Page">
              <IconButton
                onClick={() => table.nextPage()}
                icon={<ChevronRightIcon fontSize={"xl"} />}
                ml={4}
                size={"sm"}
                aria-label={""}
                variant={"outline"}
              />
            </Tooltip>
          )}
        </HStack>
      </Flex>
    </>
  );
};

export default PaginationTable;
