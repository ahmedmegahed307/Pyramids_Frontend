import ProductCategory from "../../../models/ProductCategory";
import Api from "../../api-fetch";

const ProductCategoryApi = new Api<any>("/Category");


export const getAllProductCategories = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const ProductCategorys = await ProductCategoryApi.getAll(isActive, companyId);
  return ProductCategorys.data;
};

export const updateProductCategory = async (
  ProductCategoryId: number,
  updatedData: any
) => {
  const updatedProductCategory = await ProductCategoryApi.update(
    ProductCategoryId,
    updatedData
  );
  return updatedProductCategory;
};


export const deleteProductCategory = async (
  ProductCategoryId: number
): Promise<ResponseData> => {
  const responseData = await ProductCategoryApi.delete(ProductCategoryId);
  return responseData;
};

export const createProductCategory = async (ProductCategoryData: ProductCategory) => {
  const newProductCategory = await ProductCategoryApi.post(ProductCategoryData);
  return newProductCategory;
};
