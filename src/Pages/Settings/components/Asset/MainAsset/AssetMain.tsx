import {
  Button,
  useDisclosure,
  Drawer,
  Tabs,
  TabPanels,
  TabPanel,
  HStack,
  Box,
  Spinner,
  Heading,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import useAuthStore from "../../../../../hooks/Authentication/store";

import CreateAsset, { CreateAssetValidation } from "./CreateAsset";
import UpdateAsset, { UpdateAssetValidation } from "./UpdateAsset";
import AssetList from "./AssetList";
import DeleteAsset from "./DeleteAsset";
import useAsset from "../../../../../hooks/Settings/Assets/MainAsset/useAsset";
import { Asset } from "../../../../../models/Asset";
import useCreateAsset from "../../../../../hooks/Settings/Assets/MainAsset/useCreateAsset";
import useAssetMutation from "../../../../../hooks/Settings/Assets/MainAsset/useAssetMutation";
import useAssetCreationData from "../../../../../hooks/DataCreation/useAssetCreationData";
import { IAssetCreationData } from "../../../../../models/Interfaces/IAssetCreationData";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const AssetMain = () => {
  const { data, isLoading, isError } = useAsset();
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createAssetQuery = useCreateAsset(() => {
    createModal.onClose();
  });
  //

  const handleCreateForm = (data: CreateAssetValidation) => {
    const newAsset: Asset = {
      serialNo: data.serialNo,
      tagNo: data.tagNo,
      description: data.description,
      quantity: data.quantity,
      companyId: user?.companyId || 0,
      clientId: parseInt(data.clientId),
      siteId: data.siteId ? parseInt(data.siteId) : null,
      assetTypeId: parseInt(data.assetTypeId),
      assetModelId: parseInt(data.assetModelId),
      assetManufacturerId: parseInt(data.assetManufacturerId),
    };
    createAssetQuery.mutate(newAsset);
  };

  //update
  const updateModal = useDisclosure();
  const [updateAsset, setUpdateAsset] = useState<Asset>();
  const AssetMutation = useAssetMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateAssetValidation) => {
    const updatedAsset: Asset = {
      id: updateAsset?.id,
      serialNo: data.serialNo,
      companyId: user?.companyId,
      clientId: parseInt(data.clientId),
      quantity: data.quantity,
      tagNo: data.tagNo ?? "",
      description: data.description ?? "",
      siteId: data?.siteId ? parseInt(data.siteId) : null,
      assetTypeId: data?.assetTypeId ? parseInt(data.assetTypeId) : null,
      assetModelId: data?.assetModelId ? parseInt(data.assetModelId) : null,
      assetManufacturerId: data?.assetManufacturerId
        ? parseInt(data.assetManufacturerId)
        : null,
    };
    AssetMutation.mutate(updatedAsset);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteAssetId, setDeleteAssetId] = useState(0);
  // asset creation data
  const { data: assetCreationData } = useAssetCreationData() as {
    data: IAssetCreationData;
  };
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Assets
      </Heading>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <AssetList
              data={data || []}
              setDeleteAssetId={setDeleteAssetId}
              deleteModal={deleteModal}
              setUpdateAsset={setUpdateAsset}
              updateModal={updateModal}
              createModal={createModal}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Create Modal */}
      <Drawer
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <CreateAsset
          assetCreationData={assetCreationData}
          onSubmit={handleCreateForm}
        />
      </Drawer>

      {/* Update modal  */}

      <Drawer
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <UpdateAsset
          onSubmit={handleUpdateForm}
          defaultValue={updateAsset}
          assetCreationData={assetCreationData}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteAsset
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        AssetId={deleteAssetId}
      />
    </Card>
  );
};

export default AssetMain;
