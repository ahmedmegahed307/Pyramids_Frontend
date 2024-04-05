import { useState, useEffect } from "react";
import User from "../../../../../models/User";
import AssignList from "./AssignList";
import CreateAssign from "./CreateAssign";
export interface AssignTabModel {
  id?: number;
  engineerId?: number;
  engineerName?: string;
  estimatedDuration?: number;
  scheduleDate?: string;
  commentsToTech?: string;
}
interface props {
  createAssignModal: any;
  assignlist: AssignTabModel[];
  updateAssign: (assignModel: AssignTabModel[]) => void;
  engineers: User[];
}

const AssignMain = ({
  createAssignModal,
  engineers,
  assignlist,
  updateAssign,
}: props) => {
  const [localAssign, setLocalAssign] = useState<AssignTabModel[]>(assignlist);

  // Update localAssign when the Assign prop changes
  console.log("assignlist::", assignlist);
  useEffect(() => {
    setLocalAssign(assignlist);
  }, [assignlist]);

  const addAssignRecord = (newAssign: AssignTabModel) => {
    const updatedAssign = [...localAssign, newAssign];
    setLocalAssign(updatedAssign);
    updateAssign(updatedAssign);
  };
  return (
    <>
      <AssignList
        createAssignModal={createAssignModal}
        assignlist={localAssign ?? []}
        updateAssign={updateAssign}
        engineers={engineers}
      />
      <CreateAssign
        engineers={engineers}
        createAssignModal={createAssignModal}
        addAssignRecord={addAssignRecord}
      />
    </>
  );
};

export default AssignMain;
