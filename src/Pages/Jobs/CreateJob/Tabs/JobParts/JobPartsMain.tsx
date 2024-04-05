import React, { useState, useEffect } from "react";
import PartList from "./PartList";
import CreatePart from "./CreatePart";
import JobPart from "../../../../../models/JobPart";

interface JobPartsProps {
  createPartModal: any;
  parts: JobPart[];
  updateParts: (newParts: JobPart[]) => void;
}

const JobPartsMain = ({
  createPartModal,
  parts,
  updateParts,
}: JobPartsProps) => {
  const [localParts, setLocalParts] = useState<JobPart[]>(parts);

  // Update localParts when the parts prop changes
  useEffect(() => {
    setLocalParts(parts);
  }, [parts]);

  const addNewPart = (newPart: JobPart) => {
    const updatedParts = [...localParts, newPart];
    setLocalParts(updatedParts);
    updateParts(updatedParts);
  };

  return (
    <>
      <PartList
        createPartModal={createPartModal}
        parts={localParts} // Use localParts instead of parts here
        updateParts={updateParts}
      />
      <CreatePart createPartModal={createPartModal} addNewPart={addNewPart} />
    </>
  );
};

export default JobPartsMain;
