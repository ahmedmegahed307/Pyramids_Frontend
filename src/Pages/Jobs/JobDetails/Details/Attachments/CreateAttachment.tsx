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

interface JobAttachmentsProps {
  createModal: any;

  onSubmit: (file: File | null) => void;
}
const CreateAttachment = ({ createModal, onSubmit }: JobAttachmentsProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    onSubmit(file);
    createModal.onClose();
  };
  return (
    <>
      <Drawer
        onClose={createModal.onClose}
        isOpen={createModal.isOpen}
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
                    bg={"Primary.500"}
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
