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

import CreateProduct, { CreateProductValidation } from "./CreateProduct";
import UpdateProduct, { UpdateProductValidation } from "./UpdateProduct";
import ProductList from "./ProductList";
import DeleteProduct from "./DeleteProduct";
import Product from "../../../../../models/Product";
import useProduct from "../../../../../hooks/Settings/Product/MainProduct/useProduct";
import useCreateProduct from "../../../../../hooks/Settings/Product/MainProduct/useCreateProduct";
import useProductMutation from "../../../../../hooks/Settings/Product/MainProduct/useProductMutation";
import IsLoading from "../../../../GeneralComponents/IsLoading";
import IsError from "../../../../GeneralComponents/IsError";

const ProductMain = () => {
  const { data, isLoading, isError } = useProduct();
  const { user } = useAuthStore();

  //create
  const createModal = useDisclosure();
  const createProductQuery = useCreateProduct(() => {
    createModal.onClose();
  });

  const handleCreateForm = (data: CreateProductValidation) => {
    const newProduct: Product = {
      code: data.code,
      name: data.name,
      description: data.description,
      standardPrice: parseFloat(data.standardPrice),
      jobPrice: parseFloat(data.jobPrice),
      brand: data.brand,
      serialControlled: data.serialControlled,
      quantity: data.quantity,
      categoryId: parseInt(data.categoryId),
      companyId: user?.companyId,
      warehouse: { id: 1 },
    };
    createProductQuery.mutate(newProduct);
  };

  //update
  const updateModal = useDisclosure();
  const [updateProduct, setUpdateProduct] = useState<Product>();
  const ProductMutation = useProductMutation(() => {
    updateModal.onClose();
  }, true);
  const handleUpdateForm = (data: UpdateProductValidation) => {
    const updatedProduct: Product = {
      id: updateProduct?.id,
      code: data.code,
      name: data.name,
      description: data.description,
      standardPrice: parseFloat(data.standardPrice),
      jobPrice: parseFloat(data.jobPrice),
      brand: data.brand,
      serialControlled: data.serialControlled,
      categoryId: parseInt(data.categoryId),
      companyId: user?.companyId,
    };
    ProductMutation.mutate(updatedProduct);
  };

  //delete
  const deleteModal = useDisclosure();

  const [deleteProductId, setDeleteProductId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading size={"md"} mb={4} ml={4}>
        Products
      </Heading>

      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <ProductList
              createModal={createModal}
              data={data || []}
              setDeleteProductId={setDeleteProductId}
              deleteModal={deleteModal}
              setUpdateProduct={setUpdateProduct}
              updateModal={updateModal}
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
        <CreateProduct onSubmit={handleCreateForm} />
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
        <UpdateProduct
          onSubmit={handleUpdateForm}
          defaultValue={updateProduct}
        />
      </Drawer>

      {/* Delete Modal  */}
      <DeleteProduct
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        productId={deleteProductId}
      />
    </Card>
  );
};

export default ProductMain;
