import {
  AbsoluteCenter,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import JobAttachment from "../../../../../models/JobAttachment";

interface JobAttachmentsProps {
  createAttachmentModal: any;

  addNewAttachment: (file: File | null) => void;
}
const CreateAttachment = ({
  createAttachmentModal,
  addNewAttachment,
}: JobAttachmentsProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    addNewAttachment(file);
    createAttachmentModal.onClose();
  };
  return (
    <>
      <Drawer
        onClose={createAttachmentModal.onClose}
        isOpen={createAttachmentModal.isOpen}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter>
              <>
                <Input type="file" w={270} onChange={handleFileChange} />
                <Center mt={5}>
                  <Button
                    onClick={handleSubmit}
                    w={"auto"}
                    colorScheme="blue"
                    alignItems={"center"}
                    variant={"solid"}
                    size={"sm"}
                    bg={"#1396ab"}
                  >
                    Submit
                  </Button>
                </Center>
              </>
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateAttachment;
