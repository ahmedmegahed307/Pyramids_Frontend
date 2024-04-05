import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Product } from "../../../../models/Product";
import { createProduct } from "../../../../services/ProductService/MainProductService/mainProductService";

const useCreateProduct = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Product>(
    async (Product: Product): Promise<ResponseData> => {
      return await createProduct(Product);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["productList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "Product has been Created successfully!",
          icon: "success",
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

export default useCreateProduct;
