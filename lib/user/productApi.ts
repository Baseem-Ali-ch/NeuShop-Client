import { apiFetch } from "./api";

export const fetchProductsUser = async (): Promise<any> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/products`, {
    method: "GET",
  });
};