import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { BsFileEarmarkExcel } from "react-icons/bs";
import * as XLSX from "xlsx";
import { IconDownload } from "../../assets/icons/IconDownload";

export interface ExportToExcelProps {
  data: any[];
  headers: any[];
  keys: string[];
  sheetName: string;
}

const ExportToExcel = ({
  data,
  headers,
  keys,
  sheetName,
}: ExportToExcelProps) => {
  const handleOnExport = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [];

    if (data) {
      wsData.push(headers); // Header row

      data.forEach((item) => {
        const rowData = keys.map((key) => item[key]);
        wsData.push(rowData);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };

  return (
    <Button
      leftIcon={<IconDownload />}
      my={4}
      mx={2}
      variant="unstyled"
      size="sm"
      color={"Neutral.500"}
      onClick={handleOnExport}
      _hover={{
        color: "Primary.700",
      }}
    />
  );
};

export default ExportToExcel;
