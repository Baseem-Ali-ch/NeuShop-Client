import { apiFetch } from "./api";

export const fetchProducts = async (): Promise<any> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`, {
    method: "GET",
  });
};

// Add a product
export const addProduct = async (productData: FormData): Promise<any> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`, {
    method: "POST",
    body: productData,
  });
};

export const updateProduct = async (
  productId: string,
  productData: any
): Promise<any> => {
  return apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify(productData),
    }
  );
};
