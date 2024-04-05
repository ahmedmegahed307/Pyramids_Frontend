import React, { useState, useEffect } from "react";
import PartList from "./PartList";
import CreatePart, { CreatePartValidation } from "./CreatePart";
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
import JobPart from "../../../../../models/JobPart";
import useCreatePart from "../../../../../hooks/Settings/Part/useCreatePart";
import DeletePart from "./DeletePart";
import usePartMutation from "../../../../../hooks/Settings/Part/usePartMutation";
import UpdatePart, { UpdatePartValidation } from "./UpdatePart";

interface JobPartsProps {
  parts: JobPart[];
  jobId: number;
}

const PartsMain = ({ parts, jobId }: JobPartsProps) => {
  //create
  const createModal = useDisclosure();
  const createPartQuery = useCreatePart(() => {
    createModal.onClose();
  }, jobId);

  const handleCreateForm = (data: CreatePartValidation) => {
    createPartQuery.mutateAsync({
      productId: parseInt(data.productId),
      quantity: data.quantity,
      jobId: jobId,
      isActive: true,
    });
  };

  //update
  const updateModal = useDisclosure();
  const [updatePart, setUpdatePart] = useState<JobPart>();
  const partMutation = usePartMutation(
    () => {
      updateModal.onClose();
    },
    true,
    jobId
  );
  const handleUpdateForm = (data: UpdatePartValidation) => {
    console.log("update part::", data);
    const updatedJobPart: JobPart = {
      id: updatePart?.id,
      productId: parseInt(data.productId),
      quantity: data.quantity,
      jobId: jobId,
      isActive: true,
    };

    partMutation.mutate(updatedJobPart);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deletePartId, setDeletePartId] = useState(0);
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
          Add Part
        </Button>
      </HStack>
      <PartList
        parts={parts}
        setDeletePartId={setDeletePartId}
        deleteModal={deleteModal}
        setUpdatePart={setUpdatePart}
        updateModal={updateModal}
      />

      {/* Create Modal */}
      <Drawer
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
        size={"lg"}
      >
        <CreatePart onSubmit={handleCreateForm} />
      </Drawer>
      {/* Update modal  */}

      <Drawer
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
        size={"lg"}
      >
        <UpdatePart onSubmit={handleUpdateForm} defaultValue={updatePart} />
      </Drawer>
      {/* Delete Modal  */}
      <DeletePart
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        partId={deletePartId}
        jobId={jobId}
      />
    </>
  );
};

export default PartsMain;
