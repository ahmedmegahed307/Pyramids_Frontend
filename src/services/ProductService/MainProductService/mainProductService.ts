import { Product } from "../../../models/Product";
import Api from "../../api-fetch";

const ProductApi = new Api<any>("/Product");

export const getAllProducts = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Products = await ProductApi.getAll(isActive, companyId);
  return Products.data;
};

export const updateProduct = async (
  ProductId: number,
  updatedData: any
) => {
  const updatedProduct = await ProductApi.update(
    ProductId,
    updatedData
  );
  return updatedProduct;
};


export const deleteProduct = async (
  ProductId: number
): Promise<ResponseData> => {
  const responseData = await ProductApi.delete(ProductId);
  return responseData;
};

export const createProduct = async (ProductData: Product) => {
  const newProduct = await ProductApi.post(ProductData);
  return newProduct;
};
