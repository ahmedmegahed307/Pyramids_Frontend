import { useState } from "react";
import {
  AbsoluteCenter,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  Select,
  Textarea,
} from "@chakra-ui/react";
import JobIssue from "../../../../../models/JobIssue";
import { v4 as uuidv4 } from "uuid";
import RequiredFormLabel from "../../../../RequiredFields/RequiredFormLabel";
import useAsset from "../../../../../hooks/Settings/Assets/MainAsset/useAsset";
import { Asset } from "../../../../../models/Asset";

interface UpdateIssueProps {
  isOpen: boolean;
  onClose: () => void;
  updateIssue: JobIssue | undefined;
  onUpdate: (updatedIssue: JobIssue) => void;
  clientAssets: Asset[];
}

const UpdateIssue = ({
  isOpen,
  clientAssets,
  onClose,
  updateIssue,
  onUpdate,
}: UpdateIssueProps) => {
  const [updatedIssue, setUpdatedIssue] = useState<JobIssue | undefined>();

  const handleIssueUpdate = () => {
    const updatedIssueWithAllProps = {
      ...updatedIssue!, // Keep all existing properties
      issue: updatedIssue?.issue || updateIssue?.issue,
      priority: updatedIssue?.priority || updateIssue?.priority,
      assetId: updatedIssue.assetId || updateIssue.assetId,
      assetName: updatedIssue.assetName || updateIssue.assetName,
      id: updateIssue?.id || uuidv4(),
    };

    onUpdate(updatedIssueWithAllProps);
    onClose();
    setUpdatedIssue(undefined);
  };

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={{
        base: "sm",
        lg: "lg",
      }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <AbsoluteCenter>
            <>
              <FormControl
                mb={5}
                w={{
                  base: "sm",
                  lg: "lg",
                }}
              >
                <RequiredFormLabel label={" Asset"} />
                <Select
                  size={"md"}
                  variant="outline"
                  onChange={(e) => {
                    const selectedAssetSerialNo = e.target.value;
                    const selectedAsset = clientAssets.find(
                      (asset) => asset.serialNo === selectedAssetSerialNo
                    );
                    if (selectedAsset) {
                      setUpdatedIssue({
                        ...updatedIssue!,
                        assetId: selectedAsset.id,
                        assetName: selectedAsset.serialNo,
                        id: uuidv4(),
                      });
                    }
                  }}
                  defaultValue={updateIssue?.assetName ?? ""}
                >
                  <option value={0} key={0}>
                    --None--
                  </option>
                  {clientAssets?.map((asset, index) => (
                    <option value={asset.serialNo} key={index}>
                      {asset.serialNo}
                    </option>
                  ))}
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
                  defaultValue={updateIssue?.issue}
                  onChange={(e) =>
                    setUpdatedIssue({
                      ...updatedIssue!,
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
                  placeholder="Select Priority"
                  defaultValue={updateIssue?.priority}
                  onChange={(e) =>
                    setUpdatedIssue({
                      ...updatedIssue!,
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

              <Button onClick={handleIssueUpdate} w={"full"} my={10}>
                Update
              </Button>
            </>
          </AbsoluteCenter>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateIssue;
