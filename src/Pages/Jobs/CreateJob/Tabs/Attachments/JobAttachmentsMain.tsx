import React, { useState, useEffect } from "react";
import AttachmentList from "./AttachmentList";
import CreateAttachment from "./CreateAttachment";

interface JobAttachmentsProps {
  createAttachmentModal: any;
  attachments: File[];
  updateAttachments: (newAttachments: File[]) => void;
}

const JobAttachmentsMain = ({
  createAttachmentModal,
  updateAttachments,
  attachments,
}: JobAttachmentsProps) => {
  const [localAttachments, setLocalAttachments] = useState<File[]>([]);

  // Update localAttachments when the Attachments prop changes
  useEffect(() => {
    if (attachments != null) {
      setLocalAttachments(attachments);
    }
  }, [attachments]);
  const addNewAttachment = (newAttachment: File) => {
    const updatedAttachments = [...localAttachments, newAttachment];
    setLocalAttachments(updatedAttachments);
    updateAttachments(updatedAttachments);
  };

  return (
    <>
      <AttachmentList
        createAttachmentModal={createAttachmentModal}
        Attachments={localAttachments ?? []}
        updateAttachments={updateAttachments}
      />
      <CreateAttachment
        createAttachmentModal={createAttachmentModal}
        addNewAttachment={addNewAttachment}
      />
    </>
  );
};

export default JobAttachmentsMain;
