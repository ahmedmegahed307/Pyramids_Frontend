import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ProductCategory from "../../../../models/ProductCategory";
import { createProductCategory } from "../../../../services/ProductService/ProductCategoryService/productCategoryService";

const useCreateProductCategory = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, ProductCategory>(
    async (ProductCategory: ProductCategory): Promise<ResponseData> => {
      return await createProductCategory(ProductCategory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["productCategoryList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "Category has been Created successfully!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        OnClose();
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useCreateProductCategory;
