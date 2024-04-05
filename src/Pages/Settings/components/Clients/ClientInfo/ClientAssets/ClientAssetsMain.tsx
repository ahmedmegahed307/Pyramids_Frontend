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
import useGetClientById from "../../../../../../hooks/Settings/Client/useGetClientById";
import usePageTitleStore from "../../../../../../hooks/NavBar/PageTitleStore";
import IsLoading from "../../../../../GeneralComponents/IsLoading";
import IsError from "../../../../../GeneralComponents/IsError";
import ClientAssetsList from "./ClientAssetsList";
import { Asset } from "../../../../../../models/Asset";
import useAssetMutation from "../../../../../../hooks/Settings/Assets/MainAsset/useAssetMutation";
import { AddIcon } from "@chakra-ui/icons";
import useCreateAsset from "../../../../../../hooks/Settings/Assets/MainAsset/useCreateAsset";
import CreateAsset, {
  CreateAssetValidation,
} from "../../../Asset/MainAsset/CreateAsset";
import UpdateAsset, {
  UpdateAssetValidation,
} from "../../../Asset/MainAsset/UpdateAsset";
import DeleteAsset from "../../../Asset/MainAsset/DeleteAsset";
import useAssetCreationData from "../../../../../../hooks/DataCreation/useAssetCreationData";
import { IAssetCreationData } from "../../../../../../models/Interfaces/IAssetCreationData";
import useAuthStore from "../../../../../../hooks/Authentication/store";

const ClientAssetsMain = () => {
  const { user } = useAuthStore();

  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Client Assets");
  }, []);
  const { id } = useParams();
  const { data: client, isLoading, isError } = useGetClientById(parseInt(id));

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
      clientId: client?.id,
      siteId: data.siteId ? parseInt(data.siteId) : null,
      assetTypeId: parseInt(data.assetTypeId),
      assetModelId: parseInt(data.assetModelId),
      assetManufacturerId: parseInt(data.assetManufacturerId),
    };
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
      clientId: client?.id,
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
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <HStack w={"full"}>
              <Heading size={"md"}>Client Assets</Heading>
              <Spacer />
              <Button
                leftIcon={<AddIcon />}
                variant="solid"
                size="md"
                onClick={() => {
                  createModal.onOpen();
                }}
              >
                Add
              </Button>
            </HStack>
            <ClientAssetsList
              data={client?.assets || []}
              setDeleteAssetId={setDeleteAssetId}
              deleteModal={deleteModal}
              setEditAsset={setEditAsset}
              editModal={editModal}
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
          isAccessFromClientPage={true}
        />
      </Drawer>

      {/* Update modal  */}

      <Drawer
        onClose={editModal.onClose}
        isOpen={editModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
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

export default ClientAssetsMain;
