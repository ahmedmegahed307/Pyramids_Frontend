import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import ProductCategory from "../../../../models/ProductCategory";
import { getAllProductCategories } from "../../../../services/ProductService/ProductCategoryService/productCategoryService";


const useProductCategory = () => {
  const { user } = useAuthStore();

  return useQuery<ProductCategory[], Error>({
    queryKey: [
      "productCategoryList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllProductCategories,
  });
};

export default useProductCategory;
