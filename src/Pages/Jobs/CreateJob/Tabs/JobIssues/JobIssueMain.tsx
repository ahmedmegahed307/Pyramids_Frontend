import React, { useState, useEffect } from "react";
import IssueList from "./IssueList";
import JobIssue from "../../../../../models/JobIssue";
import CreateIssue from "./CreateIssue";
import { Asset } from "../../../../../models/Asset";

interface JobIssuesProps {
  createIssueModal: any;
  issues: JobIssue[];
  updateIssues: (newIssues: JobIssue[]) => void;
  clientAssets: Asset[];
}

const JobIssueMain = ({
  createIssueModal,
  issues,
  clientAssets,
  updateIssues,
}: JobIssuesProps) => {
  const [localIssues, setLocalIssues] = useState<JobIssue[]>(issues);

  // Update localIssues when the Issues prop changes
  useEffect(() => {
    setLocalIssues(issues);
  }, [issues]);

  const addNewIssue = (newIssue: JobIssue) => {
    const updatedIssues = [...localIssues, newIssue];
    setLocalIssues(updatedIssues);
    updateIssues(updatedIssues);
  };

  return (
    <>
      <IssueList
        createIssueModal={createIssueModal}
        issues={localIssues} // Use localIssues instead of issues here
        updateIssues={updateIssues}
        clientAssets={clientAssets}
      />
      <CreateIssue
        clientAssets={clientAssets}
        createIssueModal={createIssueModal}
        addNewIssue={addNewIssue}
      />
    </>
  );
};

export default JobIssueMain;
