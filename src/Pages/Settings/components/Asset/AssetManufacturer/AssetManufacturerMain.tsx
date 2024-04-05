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
import AssetManufacturer from "../../../../../models/AssetManufacturer";
import AssetManufacturerList from "./AssetManufacturerList";
import CreateAssetManufacturer, {
  CreateAssetManufacturerValidation,
} from "./CreateAssetManufacturer";
import DeleteAssetManufacturer from "./DeleteAssetManufacturer";
import useAssetManufacturer from "../../../../../hooks/Settings/Assets/AssetManufacturer/useAssetManufacturer";
import useCreateAssetManufacturer from "../../../../../hooks/Settings/Assets/AssetManufacturer/useCreateAssetManufacturer";
import UpdateAssetManufacturer, {
  UpdateAssetManufacturerValidation,
} from "./UpdateAssetManufacturer";
import useAssetManufacturerMutation from "../../../../../hooks/Settings/Assets/AssetManufacturer/useAssetManufacturerMutation";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const AssetManufacturerMain = () => {
  const { data, isError, isLoading } = useAssetManufacturer();
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createAssetManufacturerQuery = useCreateAssetManufacturer(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateAssetManufacturerValidation) => {
    const newAssetManufacturer: AssetManufacturer = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
    };
    createAssetManufacturerQuery.mutate(newAssetManufacturer);
  };

  //update
  const updateModal = useDisclosure();
  const [updateAssetManufacturer, setUpdateAssetManufacturer] =
    useState<AssetManufacturer>();
  const AssetManufacturerMutation = useAssetManufacturerMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateAssetManufacturerValidation) => {
    const updatedAssetManufacturer: AssetManufacturer = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
      id: updateAssetManufacturer?.id || 0,
    };
    AssetManufacturerMutation.mutate(updatedAssetManufacturer);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteAssetManufacturerId, setDeleteAssetManufacturerId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Asset Manufacturers
      </Heading>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <AssetManufacturerList
              data={data || []}
              setDeleteAssetManufacturerId={setDeleteAssetManufacturerId}
              deleteModal={deleteModal}
              setUpdateAssetManufacturer={setUpdateAssetManufacturer}
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
        <CreateAssetManufacturer onSubmit={handleCreateForm} />
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
        <UpdateAssetManufacturer
          onSubmit={handleUpdateForm}
          defaultValue={updateAssetManufacturer}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteAssetManufacturer
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        assetManufacturerId={deleteAssetManufacturerId}
      />
    </Card>
  );
};

export default AssetManufacturerMain;
