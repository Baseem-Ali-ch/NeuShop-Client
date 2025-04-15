export const fetchProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const fetchProductsUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/products`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};


