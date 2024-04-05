import { useState } from "react";
import { Button, Drawer, HStack, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import AttachmentsList from "./AttachmentsList";
import DeleteAttachment from "./DeleteAttachment";
import useCreateJobAttachment from "../../../../../hooks/Jobs/useCreateJobAttachment";
import useAuthStore from "../../../../../hooks/Authentication/store";
import JobAttachment from "../../../../../models/JobAttachment";
import CreateAttachment from "./CreateAttachment";

interface props {
  attachments: JobAttachment[];
  jobId: number;
}

const AttachmentsMain = ({ attachments, jobId }: props) => {
  console.log("attachments::", attachments);
  const { user } = useAuthStore();
  //create
  const createModal = useDisclosure();
  const createAttachmentQuery = useCreateJobAttachment(() => {
    createModal.onClose();
  }, jobId);

  const handleCreateForm = (data: File) => {
    createAttachmentQuery.mutateAsync({
      jobId: jobId,
      fileName: data?.name,
      fileType: data?.type,
      fileURL: "",
      createdByUserId: user?.id,
      fileToUpload: data,
    });
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteAttachmentId, setDeleteAttachmentId] = useState(0);

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
          Add Attachment
        </Button>
      </HStack>
      <AttachmentsList
        attachments={attachments ?? []}
        setDeleteAttachmentId={setDeleteAttachmentId}
        deleteModal={deleteModal}
      />

      {/* Create Modal */}
      <Drawer
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
        size={"lg"}
      >
        <CreateAttachment
          onSubmit={handleCreateForm}
          createModal={createModal}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteAttachment
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        attachmentId={deleteAttachmentId}
        jobId={jobId}
      />
    </>
  );
};

export default AttachmentsMain;
