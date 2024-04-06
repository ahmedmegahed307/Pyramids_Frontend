import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
interface CollapsedTablesProps {
  session: any;
  expandedRows: any;
}
const CollapsedTables = ({ session, expandedRows }: CollapsedTablesProps) => {
  if (expandedRows.has(session)) {
    return (
      <Table ml={10} bg={"Neutral.100"} size="lg" shadow={"md"}>
        <Thead shadow={"none"} w={"full"}>
          <Tr>
            <Th style={{ color: "#cc6751" }}>ID</Th>
            <Th style={{ color: "#cc6751" }}>Description</Th>
            <Th style={{ color: "#cc6751" }}>Mode</Th>
            <Th style={{ color: "#cc6751" }}>Start Time</Th>
            <Th style={{ color: "#cc6751" }}>End Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>description</Td>
            <Td>remote</Td>
            <Td>10/10/2010</Td>
            <Td>15/10/2020</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }
  return null;
};
export default CollapsedTables;
