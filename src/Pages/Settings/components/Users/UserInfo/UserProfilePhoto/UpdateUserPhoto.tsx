import React, { useState } from "react";
import {
  Input,
  Button,
  AbsoluteCenter,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

interface UpdatePhotoProps {
  onSubmit: (file: File) => void;
}

const UpdateUserPhoto = ({ onSubmit }: UpdatePhotoProps) => {
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async () => {
    if (photo) {
      try {
        onSubmit(photo);
        setPhoto(null);
      } catch (error) {
        console.log("upload", error);

        console.log("Error uploading file: ", error);
      }
    } else {
      console.log("Failed uploading");
    }
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <Input
              type="file"
              accept="image/*"
              w={270}
              onChange={handleFileChange}
            />
            <Button
              onClick={handleSubmit}
              w={"auto"}
              alignItems={"center"}
              variant={"solid"}
              size={"sm"}
              m={4}
            >
              Submit
            </Button>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default UpdateUserPhoto;
