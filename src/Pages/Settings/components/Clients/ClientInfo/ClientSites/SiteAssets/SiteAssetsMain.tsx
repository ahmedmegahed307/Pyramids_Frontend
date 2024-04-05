import {
  Button,
  Card,
  Drawer,
  HStack,
  Heading,
  Spacer,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AddIcon } from "@chakra-ui/icons";
import useAuthStore from "../../../../../../../hooks/Authentication/store";
import usePageTitleStore from "../../../../../../../hooks/NavBar/PageTitleStore";
import useCreateAsset from "../../../../../../../hooks/Settings/Assets/MainAsset/useCreateAsset";
import CreateAsset, {
  CreateAssetValidation,
} from "../../../../Asset/MainAsset/CreateAsset";
import { Asset } from "../../../../../../../models/Asset";
import useAssetMutation from "../../../../../../../hooks/Settings/Assets/MainAsset/useAssetMutation";
import UpdateAsset, {
  UpdateAssetValidation,
} from "../../../../Asset/MainAsset/UpdateAsset";
import useAssetCreationData from "../../../../../../../hooks/DataCreation/useAssetCreationData";
import { IAssetCreationData } from "../../../../../../../models/Interfaces/IAssetCreationData";
import IsLoading from "../../../../../../GeneralComponents/IsLoading";
import IsError from "../../../../../../GeneralComponents/IsError";
import SiteAssetsList from "./SiteAssetsList";
import DeleteAsset from "../../../../Asset/MainAsset/DeleteAsset";
import useGetAssetsBySiteId from "../../../../../../../hooks/Settings/Assets/MainAsset/useGetAssetsBySiteId";

const SiteAssetsMain = () => {
  const { user } = useAuthStore();

  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Site Assets");
  }, []);
  const { id } = useParams();
  const {
    data: assets,
    isLoading,
    isError,
  } = useGetAssetsBySiteId(parseInt(id));

  //create
  const createModal = useDisclosure();
  const createAssetQuery = useCreateAsset(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: CreateAssetValidation) => {
    const newAsset: Asset = {
      serialNo: data.serialNo,
      tagNo: data.tagNo,
      description: data.description,
      quantity: data.quantity,
      companyId: user?.companyId || 0,
      siteId: id ? parseInt(id) : null,
      assetTypeId: parseInt(data.assetTypeId),
      assetModelId: parseInt(data.assetModelId),
      assetManufacturerId: parseInt(data.assetManufacturerId),
    };
    console.log("newAsset", newAsset);
    createAssetQuery.mutate(newAsset);
  };

  //update
  const editModal = useDisclosure();
  const [editAsset, setEditAsset] = useState<Asset>();

  const AssetMutation = useAssetMutation(() => {
    editModal.onClose();
  }, true);

  const handleUpdateForm = (data: UpdateAssetValidation) => {
    const updatedAsset: Asset = {
      id: editAsset?.id,
      serialNo: data.serialNo,
      companyId: user?.companyId,
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
  const [deleteAssetId, setDeleteAssetId] = useState(0);

  const deleteModal = useDisclosure();
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
      <HStack w={"full"} mb={4}>
        <Heading size={"md"}>Site Assets</Heading>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          variant="outline"
          size="md"
          onClick={() => {
            createModal.onOpen();
          }}
        >
          Add
        </Button>
      </HStack>
      <SiteAssetsList
        data={assets?.filter((a) => a.isActive) || []}
        setDeleteAssetId={setDeleteAssetId}
        deleteModal={deleteModal}
        setEditAsset={setEditAsset}
        editModal={editModal}
      />

      {/* Create Modal */}
      <Drawer
        onClose={() => {
          createModal.onClose();
        }}
        isOpen={createModal.isOpen}
        size={{
          base: "sm",
          md: "lg",
        }}
      >
        <CreateAsset
          assetCreationData={assetCreationData}
          onSubmit={handleCreateForm}
          isAccessFromClientPage={true}
        />
      </Drawer>

      {/* Update modal  */}

      <Drawer
        onClose={editModal.onClose}
        isOpen={editModal.isOpen}
        size={{
          base: "sm",
          md: "lg",
        }}
      >
        <UpdateAsset
          onSubmit={handleUpdateForm}
          defaultValue={editAsset}
          assetCreationData={assetCreationData}
          isAccessFromClientPage={true}
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

export default SiteAssetsMain;
