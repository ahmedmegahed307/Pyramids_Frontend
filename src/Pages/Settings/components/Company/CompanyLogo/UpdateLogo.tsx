import React, { useEffect, useState } from "react";
import {
  Center,
  Input,
  HStack,
  Button,
  AbsoluteCenter,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Company from "../../../../../models/Company";

interface UpdateLogoProps {
  onSubmit: (file: File) => void;
}

const UpdateLogo = ({ onSubmit }: UpdateLogoProps) => {
  const [logo, setLogo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setLogo(file);
    console.log("Logo:", logo);
  };

  const handleSubmit = async () => {
    if (logo) {
      try {
        onSubmit(logo);
        setLogo(null);
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

export default UpdateLogo;
