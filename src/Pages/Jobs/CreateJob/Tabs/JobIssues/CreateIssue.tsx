import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal, { SweetAlertIcon } from "sweetalert2";
import JobIssue from "../../../../../models/JobIssue";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import useAsset from "../../../../../hooks/Settings/Assets/MainAsset/useAsset";
import { Asset } from "../../../../../models/Asset";
import { Form } from "react-router-dom";

interface JobIssuesProps {
  createIssueModal: any;
  addNewIssue: (newIssue: any) => void;
  clientAssets: Asset[];
}
const CreateIssue = ({
  createIssueModal,
  addNewIssue,
  clientAssets,
}: JobIssuesProps) => {
  const [createIssue, setCreateIssue] = useState<JobIssue>({
    issue: "",
    priority: "Low",
    assetId: 0,
    assetName: "",
    id: uuidv4(),
  });

  const handleIssueCreate = () => {
    if (!createIssue?.issue || !createIssue?.priority) {
      Swal.fire({
        title: "Oops",
        text: "Please fill out all fields to add Issue",
        icon: "error" as SweetAlertIcon,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      //createIssueModal.onClose();
      return;
    }
    addNewIssue(createIssue);
    createIssueModal.onClose();
    setCreateIssue({
      issue: "",
      priority: "",
      assetId: 0,
      assetName: "",
      id: uuidv4(),
    });
  };

  const [selectedAsset, setSelectedAsset] = useState<JobIssue | null>(null);
  const handleAssetSelection = (selectedAssetId: string) => {
    if (selectedAssetId) {
      const selectedAsset = clientAssets.find(
        (Asset) => Asset.id === parseInt(selectedAssetId)
      );
      if (selectedAsset) {
        setSelectedAsset(selectedAsset);
        setCreateIssue({
          ...createIssue,
          assetId: selectedAsset.id,
          assetName: selectedAsset.serialNo,
          id: uuidv4(),
        });
      }
    } else {
      setSelectedAsset(null);
    }
  };
  return (
    <>
      <Drawer
        onClose={createIssueModal.onClose}
        isOpen={createIssueModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter ml={2}>
              <>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel>Asset</FormLabel>
                  <Select
                    size={"md"}
                    variant="outline"
                    onChange={(e) => handleAssetSelection(e.target.value)}
                  >
                    <option value={0} key={0}>
                      --None--
                    </option>
                    {clientAssets?.map((Asset, index) => {
                      return (
                        <option value={Asset.id} key={index}>
                          {Asset.serialNo}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <RequiredFormLabel label={"Issue"} />
                  <Textarea
                    size={"md"}
                    variant="outline"
                    placeholder="Issue"
                    value={createIssue?.issue}
                    onChange={(e) =>
                      setCreateIssue({
                        ...createIssue,
                        issue: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <RequiredFormLabel label={"Priority"} />
                  <Select
                    size={"md"}
                    variant="outline"
                    defaultValue={"Low"}
                    onChange={(e) =>
                      setCreateIssue({
                        ...createIssue,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value={"Low"} key={1}>
                      Low
                    </option>
                    <option value={"Medium"} key={2}>
                      Medium
                    </option>
                    <option value={"High"} key={3}>
                      High
                    </option>
                  </Select>
                </FormControl>

                <Button onClick={handleIssueCreate} w={"full"} my={10}>
                  Save
                </Button>
              </>
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateIssue;
