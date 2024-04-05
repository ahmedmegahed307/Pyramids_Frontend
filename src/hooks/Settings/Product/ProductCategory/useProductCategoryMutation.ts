import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ProductCategory from "../../../../models/ProductCategory";
import { deleteProductCategory, updateProductCategory } from "../../../../services/ProductService/ProductCategoryService/productCategoryService";


const useProductCategoryMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, ProductCategory | number>(
    async (ProductCategory: ProductCategory | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (ProductCategory as ProductCategory).id;
        return await updateProductCategory(id ?? 0, ProductCategory);
      } else {
        const id = ProductCategory as number;
        return await deleteProductCategory(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["productCategoryList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Category has been updated successfully!"
            : "Category has been deleted successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useProductCategoryMutation;
