import { Flex, useDisclosure, Drawer } from "@chakra-ui/react";

import CreateResolution, { FormCreateValidation } from "./CreateResolution";
import UpdateResolution, { FormUpdateValidation } from "./UpdateResolution";
import DeleteResolution from "./DeleteResolution";
import ResolutionList from "./ResolutionList";

import { useEffect } from "react";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import useResolutionStore from "../../../../hooks/Settings/Resolution/ResolutionStore";
import useCreateResolution from "../../../../hooks/Settings/Resolution/useCreateResolution";
import useResolution from "../../../../hooks/Settings/Resolution/useResolution";
import useResolutionMutation from "../../../../hooks/Settings/Resolution/useResolutionMutation";
import Resolution from "../../../../models/Resolution";
import useAuthStore from "../../../../hooks/Authentication/store";

const ResolutionMain = () => {
  //zustand state management
  const { updateResolutionId, updateResolutionInput, deleteResolutionId } =
    useResolutionStore();
  const { user } = useAuthStore();

  // get resolutionList
  const { data: resolutionList } = useResolution();

  //create
  const createModal = useDisclosure();
  const createResolution = useCreateResolution(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: FormCreateValidation) => {
    createResolution.mutate({
      name: data.name,
      companyId: user?.companyId,
      createdAt: new Date(),
      createdByUserId: user?.id,
    });
  };

  //update
  const updateModal = useDisclosure();

  const updateResolution = useResolutionMutation(() => {
    updateModal.onClose();
  }, true);
  console.log("user", user);
  const handleUpdateForm = (data: FormUpdateValidation) => {
    const resolutionData: Resolution = {
      name: data.name,
      id: updateResolutionId,
      isActive: true,
      companyId: user?.companyId,
      isDeleted: false,
    };
    console.log("resolutionData", resolutionData);
    updateResolution.mutate(resolutionData);
  };

  //delete

  const deleteModal = useDisclosure();

  // page title
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Resolutions List");
  }, []);
  console.log("resolutionList", resolutionList);
  return (
    <>
      <Flex direction={"column"} w={"full"} alignItems="center">
        <ResolutionList
          data={resolutionList ?? []}
          updateModal={updateModal}
          deleteModal={deleteModal}
          createModal={createModal}
        />
      </Flex>
      {/* create */}
      <Drawer
        onClose={createModal.onClose}
        isOpen={createModal.isOpen}
        size={"lg"}
      >
        <CreateResolution onSubmit={handleCreateForm} />
      </Drawer>

      {/* Update modal  */}

      <Drawer
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
        size={"lg"}
      >
        <UpdateResolution
          onSubmit={handleUpdateForm}
          defaultValue={updateResolutionInput}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteResolution
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        resolutionId={deleteResolutionId}
      />
    </>
  );
};

export default ResolutionMain;
