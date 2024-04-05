import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Product } from "../../../../models/Product";
import { deleteProduct, updateProduct } from "../../../../services/ProductService/MainProductService/mainProductService";


const useProductMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Product | number>(
    async (Product: Product | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (Product as Product).id;
        return await updateProduct(id ?? 0, Product);
      } else {
        const id = Product as number;
        return await deleteProduct(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["productList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Product has been updated successfully!"
            : "Product has been deleted successfully!",
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

export default useProductMutation;
