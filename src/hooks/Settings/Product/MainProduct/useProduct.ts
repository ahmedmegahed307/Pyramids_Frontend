import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import { Product } from "../../../../models/Product";
import { getAllProducts } from "../../../../services/ProductService/MainProductService/mainProductService";


const useProduct = () => {
  const { user } = useAuthStore();

  return useQuery<Product[], Error>({
    queryKey: [
      "productList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllProducts,
  });
};

export default useProduct;
