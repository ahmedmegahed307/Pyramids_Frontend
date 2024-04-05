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
import AssetType from "../../../../../models/AssetType";

import useAssetType from "../../../../../hooks/Settings/Assets/AssetType/useAssetType";
import useCreateAssetType from "../../../../../hooks/Settings/Assets/AssetType/useCreateAssetType";

import useAssetTypeMutation from "../../../../../hooks/Settings/Assets/AssetType/useAssetTypeMutation";
import CreateAssetType, { CreateAssetTypeValidation } from "./CreateAssetType";
import UpdateAssetType, { UpdateAssetTypeValidation } from "./UpdateAssetType";
import AssetTypeList from "./AssetTypeList";
import DeleteAssetType from "./DeleteAssetType";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const AssetTypeMain = () => {
  const { data, isLoading, isError } = useAssetType();
  console.log("data::", data);
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createAssetTypeQuery = useCreateAssetType(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateAssetTypeValidation) => {
    const newAssetType: AssetType = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
    };
    createAssetTypeQuery.mutate(newAssetType);
  };

  //update
  const updateModal = useDisclosure();
  const [updateAssetType, setUpdateAssetType] = useState<AssetType>();
  const AssetTypeMutation = useAssetTypeMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateAssetTypeValidation) => {
    const updatedAssetType: AssetType = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
      id: updateAssetType?.id || 0,
    };
    AssetTypeMutation.mutate(updatedAssetType);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteAssetTypeId, setDeleteAssetTypeId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Asset Types
      </Heading>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <AssetTypeList
              data={data || []}
              setDeleteAssetTypeId={setDeleteAssetTypeId}
              deleteModal={deleteModal}
              setUpdateAssetType={setUpdateAssetType}
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
        <CreateAssetType onSubmit={handleCreateForm} />
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
        <UpdateAssetType
          onSubmit={handleUpdateForm}
          defaultValue={updateAssetType}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteAssetType
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        assetTypeId={deleteAssetTypeId}
      />
    </Card>
  );
};

export default AssetTypeMain;
