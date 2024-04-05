import React, { useState, useEffect } from "react";
import IssueList from "./IssueList";
import CreateIssue, { CreateIssueValidation } from "./CreateIssue";
import {
  Button,
  Drawer,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import JobIssue from "../../../../../models/JobIssue";
import useCreateIssue from "../../../../../hooks/Settings/Issue/useCreateIssue";
import useIssueMutation from "../../../../../hooks/Settings/Issue/useIssueMutation";
import { Asset } from "../../../../../models/Asset";
import DeleteIssue from "./DeleteIssue";
import UpdateIssue, { UpdateIssueValidation } from "./UpdateIssue";

interface JobIssuesProps {
  issues: JobIssue[];
  jobId: number;
  clientAssets: Asset[];
}

const IssuesMain = ({ issues, jobId, clientAssets }: JobIssuesProps) => {
  //create
  const createModal = useDisclosure();
  const createIssueQuery = useCreateIssue(() => {
    createModal.onClose();
  }, jobId);

  const handleCreateForm = (data: CreateIssueValidation) => {
    createIssueQuery.mutateAsync({
      jobId: jobId,
      jobIssuePriority: data.jobIssuePriority,
      description: data.description,
      assetId: parseInt(data.assetId),
      isActive: true,
    });
  };

  //update
  const updateModal = useDisclosure();
  const [updateIssue, setUpdateIssue] = useState<JobIssue>();
  const IssueMutation = useIssueMutation(
    () => {
      updateModal.onClose();
    },
    true,
    jobId
  );
  console.log("issues::", issues);
  const handleUpdateForm = (data: UpdateIssueValidation) => {
    console.log("update Issue::", data);
    const updatedJobIssue: JobIssue = {
      id: updateIssue?.id,
      jobId: jobId,
      jobIssuePriority: data.jobIssuePriority,
      description: data.description,
      assetId: parseInt(data.assetId),
      isActive: true,
    };

    IssueMutation.mutate(updatedJobIssue);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteIssueId, setDeleteIssueId] = useState(0);

  return (
    <>
      <HStack justify={"start"} w={"full"}>
        <Button
          leftIcon={<AddIcon />}
          variant="link"
          size="md"
          onClick={() => {
            createModal.onOpen();
          }}
          m={1}
        >
          Add Issue
        </Button>
      </HStack>
      <IssueList
        issues={issues}
        setDeleteIssueId={setDeleteIssueId}
        deleteModal={deleteModal}
        setUpdateIssue={setUpdateIssue}
        updateModal={updateModal}
      />

      {/* Create Modal */}
      <Drawer
        size={{
          base: "sm",
          lg: "lg",
        }}
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
      >
        <CreateIssue
          onSubmit={handleCreateForm}
          clientAssets={clientAssets ?? []}
        />
      </Drawer>
      {/* Update modal  */}

      <Drawer
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
        size={"lg"}
      >
        <UpdateIssue
          onSubmit={handleUpdateForm}
          defaultValue={updateIssue}
          clientAssets={clientAssets ?? []}
        />
      </Drawer>
      {/* Delete Modal  */}
      <DeleteIssue
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        IssueId={deleteIssueId}
        jobId={jobId}
      />
    </>
  );
};

export default IssuesMain;
