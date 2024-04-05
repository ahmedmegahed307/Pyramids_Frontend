import {
  Flex,
  Spacer,
  Button,
  Input,
  useDisclosure,
  Drawer,
  InputLeftElement,
  InputGroup,
  Heading,
  Card,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

import DeleteJobType from "./DeleteJobType";
import { BsSearch } from "react-icons/bs";
import ExportToExcel from "../../../Excel/ExportToExcel";
import useJobTypeStore from "../../../../hooks/Settings/JobType/store";
import useCreateJobType from "../../../../hooks/Settings/JobType/useCreateJobType";
import useJobType from "../../../../hooks/Settings/JobType/useJobType";
import useJobTypeMutation from "../../../../hooks/Settings/JobType/useJobTypeMutation";
import CreateJobType, { FormCreateValidation } from "./CreateJobType";
import UpdateJobType, { FormUpdateValidation } from "./UpdateJobType";
import JobType from "../../../../models/JobType";
import JobTypeList from "./JobTypeList";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import IsLoading from "../../../GeneralComponents/IsLoading";
import IsError from "../../../GeneralComponents/IsError";
import useAuthStore from "../../../../hooks/Authentication/store";
const JobTypesMain = () => {
  const { user } = useAuthStore();
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Job Types");
  }, []);
  // get jobTypeList
  const { data: jobTypeList, isError, isLoading } = useJobType();
  console.log("dataJobType", jobTypeList);
  const { updateJobTypeInput } = useJobTypeStore();

  //create
  const createModal = useDisclosure();

  const createJobTypeQuery = useCreateJobType(() => {
    createModal.onClose();
  });
  const handleCreateForm = (data: FormCreateValidation) => {
    createJobTypeQuery.mutateAsync({
      name: data.name,
      companyId: user?.companyId,
    });
  };

  //update
  const updateModal = useDisclosure();
  const updateJobType = useJobTypeMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: FormUpdateValidation) => {
    updateJobType.mutateAsync({
      name: data.name,
      id: updateJobTypeInput.id,
    });
  };

  //delete
  const deleteModal = useDisclosure();
  const [deleteJobTypeId, setDeleteJobTypeId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Flex direction={"column"} alignItems="center" w={"full"}>
        <Flex w={"full"} direction={"row"}>
          <Heading size={"md"} mt={8}>
            Job Types
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
        <JobTypeList
          jobTypeList={jobTypeList || []}
          setDeleteJobTypeId={setDeleteJobTypeId}
          updateModal={updateModal}
          deleteModal={deleteModal}
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
        <CreateJobType onSubmit={handleCreateForm} />
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
        <UpdateJobType
          onSubmit={handleUpdateForm}
          defaultValue={updateJobTypeInput}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteJobType
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        jobTypeId={deleteJobTypeId}
      />
    </Card>
  );
};

export default JobTypesMain;
