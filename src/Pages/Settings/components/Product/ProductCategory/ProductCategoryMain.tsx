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
import ProductCategory from "../../../../../models/ProductCategory";
import ProductCategoryList from "./ProductCategoryList";
import CreateProductCategory, {
  CreateProductCategoryValidation,
} from "./CreateProductCategory";
import DeleteProductCategory from "./DeleteProductCategory";

import UpdateProductCategory, {
  UpdateProductCategoryValidation,
} from "./UpdateProductCategory";
import useProductCategory from "../../../../../hooks/Settings/Product/ProductCategory/useProductCategory";
import useCreateProductCategory from "../../../../../hooks/Settings/Product/ProductCategory/useCreateProductCategory";
import useProductCategoryMutation from "../../../../../hooks/Settings/Product/ProductCategory/useProductCategoryMutation";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const ProductCategoryMain = () => {
  const { data, isLoading, isError } = useProductCategory();
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createProductCategoryQuery = useCreateProductCategory(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateProductCategoryValidation) => {
    const newProductCategory: ProductCategory = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
    };
    createProductCategoryQuery.mutate(newProductCategory);
  };

  //update
  const updateModal = useDisclosure();
  const [updateProductCategory, setUpdateProductCategory] =
    useState<ProductCategory>();
  const ProductCategoryMutation = useProductCategoryMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateProductCategoryValidation) => {
    const updatedProductCategory: ProductCategory = {
      code: data.code,
      name: data.name,
      description: data.description,
      companyId: user?.companyId || 0,
      id: updateProductCategory?.id || 0,
    };
    ProductCategoryMutation.mutate(updatedProductCategory);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteProductCategoryId, setDeleteProductCategoryId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Product Categories
      </Heading>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <ProductCategoryList
              data={data || []}
              setDeleteProductCategoryId={setDeleteProductCategoryId}
              deleteModal={deleteModal}
              setUpdateProductCategory={setUpdateProductCategory}
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
        <CreateProductCategory onSubmit={handleCreateForm} />
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
        <UpdateProductCategory
          onSubmit={handleUpdateForm}
          defaultValue={updateProductCategory}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteProductCategory
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        ProductCategoryId={deleteProductCategoryId}
      />
    </Card>
  );
};

export default ProductCategoryMain;
