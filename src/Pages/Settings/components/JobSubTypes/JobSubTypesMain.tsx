import {
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Drawer,
  Heading,
  Card,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import ExportToExcel from "../../../Excel/ExportToExcel";
import useJobTypeStore from "../../../../hooks/Settings/JobType/store";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";

import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import useAuthStore from "../../../../hooks/Authentication/store";
import JobSubTypeList from "./JobSubTypeList";
import useJobSubType from "../../../../hooks/Settings/JobSubType/useJobSubType";
import useCreateJobSubType from "../../../../hooks/Settings/JobSubType/useCreateJobSubType";
import CreateJobSubType, { FormCreateValidation } from "./CreateJobSubType";
import DeleteJobSubType from "./DeleteJobSubType";
import UpdateJobSubType, { FormUpdateValidation } from "./UpdateJobSubType";
import useJobSubTypeMutation from "../../../../hooks/Settings/JobSubType/useJobSubTypeMutation";
import JobType from "../../../../models/JobType";
const JobSubTypesMain = () => {
  const { user } = useAuthStore();
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Job SubTypes");
  }, []);

  const { data: jobSubtypeList, isError, isLoading } = useJobSubType();

  const { data: jobTypeList } = useJobType();
  // //create
  const createModal = useDisclosure();

  const createJobSubTypeQuery = useCreateJobSubType(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: FormCreateValidation) => {
    createJobSubTypeQuery.mutateAsync({
      name: data.name,
      jobTypeId: parseInt(data?.jobTypeId),
      companyId: user?.companyId,
    });
  };

  // //update
  const updateModal = useDisclosure();

  const [updateJobSubType, setUpdateJobSubType] = useState<JobType>();
  const JobSubTypeMutation = useJobSubTypeMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: FormUpdateValidation) => {
    JobSubTypeMutation.mutateAsync({
      ...updateJobSubType,
      name: data.name,
      jobTypeId: parseInt(data?.jobTypeId),
    });
  };

  //delete
  const deleteModal = useDisclosure();
  const [deleteSubTypeId, setDeleteSubTypeId] = useState(0);

  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  console.log("jobSubtypeList", jobSubtypeList);

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Flex direction={"column"} alignItems="center" w={"full"}>
        <Flex w={"full"} direction={"row"}>
          <Heading size={"md"} mt={8}>
            Job SubTypes
          </Heading>
          <Spacer />
          <ExportToExcel
            data={[]}
            headers={[]}
            keys={[]}
            sheetName={"JobTypes"}
          />
          <Button
            leftIcon={<AddIcon />}
            my={4}
            variant="outline"
            size="md"
            onClick={() => {
              createModal.onOpen();
            }}
          >
            add
          </Button>
        </Flex>

        <JobSubTypeList
          jobSubtypeList={jobSubtypeList || []}
          setDeleteSubTypeId={setDeleteSubTypeId}
          updateModal={updateModal}
          deleteModal={deleteModal}
          setUpdateJobSubType={setUpdateJobSubType}
        />
      </Flex>

      {/* create */}
      <Drawer
        size={{
          base: "sm",
          lg: "lg",
        }}
        onClose={createModal.onClose}
        isOpen={createModal.isOpen}
      >
        <CreateJobSubType
          jobTypeList={jobTypeList}
          onSubmit={handleCreateForm}
        />
      </Drawer>

      {/* Update modal  */}

      <Drawer
        size={{
          base: "sm",
          lg: "lg",
        }}
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
      >
        <UpdateJobSubType
          jobTypeList={jobTypeList}
          onSubmit={handleUpdateForm}
          defaultValue={updateJobSubType}
        />
      </Drawer>
      {/* Delete Modal  */}
      <DeleteJobSubType
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        subTypeId={deleteSubTypeId}
      />
    </Card>
  );
};

export default JobSubTypesMain;
