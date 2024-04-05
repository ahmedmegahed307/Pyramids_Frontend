import {
  Button,
  useDisclosure,
  Drawer,
  Tabs,
  TabPanels,
  TabPanel,
  HStack,
  Heading,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import useAuthStore from "../../../../../hooks/Authentication/store";
import AssetModel from "../../../../../models/AssetModel";

import useAssetModel from "../../../../../hooks/Settings/Assets/AssetModel/useAssetModel";
import useCreateAssetModel from "../../../../../hooks/Settings/Assets/AssetModel/useCreateAssetModel";

import useAssetModelMutation from "../../../../../hooks/Settings/Assets/AssetModel/useAssetModelMutation";
import CreateAssetModel, {
  CreateAssetModelValidation,
} from "./CreateAssetModel";
import UpdateAssetModel, {
  UpdateAssetModelValidation,
} from "./UpdateAssetModel";
import AssetModelList from "./AssetModelList";
import DeleteAssetModel from "./DeleteAssetModel";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const AssetModelMain = () => {
  const { data, isLoading, isError } = useAssetModel();
  console.log("data::", data);
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createAssetModelQuery = useCreateAssetModel(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateAssetModelValidation) => {
    const newAssetModel: AssetModel = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
    };
    createAssetModelQuery.mutate(newAssetModel);
  };

  //update
  const updateModal = useDisclosure();
  const [updateAssetModel, setUpdateAssetModel] = useState<AssetModel>();
  const AssetModelMutation = useAssetModelMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateAssetModelValidation) => {
    const updatedAssetModel: AssetModel = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
      id: updateAssetModel?.id || 0,
    };
    AssetModelMutation.mutate(updatedAssetModel);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteAssetModelId, setDeleteAssetModelId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Asset Models
      </Heading>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <AssetModelList
              data={data || []}
              setDeleteAssetModelId={setDeleteAssetModelId}
              deleteModal={deleteModal}
              setUpdateAssetModel={setUpdateAssetModel}
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
        <CreateAssetModel onSubmit={handleCreateForm} />
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
        <UpdateAssetModel
          onSubmit={handleUpdateForm}
          defaultValue={updateAssetModel}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteAssetModel
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        assetModelId={deleteAssetModelId}
      />
    </Card>
  );
};

export default AssetModelMain;
