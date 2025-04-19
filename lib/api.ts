// lib/api.ts
import { useRouter } from "next/navigation";

export class ApiError extends Error {
  status: number;
  reason?: string;

  constructor(message: string, status: number, reason?: string) {
    super(message);
    this.status = status;
    this.reason = reason;
  }
}

export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // Handle 401 Unauthorized with expired token
    if (
      response.status === 401 &&
      (errorData.reason === "expired" || errorData.message === "Access token expired") &&
      retryCount === 0
    ) {
      try {
        // Attempt to refresh token
        const refreshResponse = await fetch(
          "http://localhost:5001/shared/refresh-token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshResponse.ok) {
          throw new ApiError(
            "Failed to refresh token",
            refreshResponse.status,
            (await refreshResponse.json()).reason
          );
        }

        // Retry original request with new access token
        return apiFetch(url, options, retryCount + 1);
      } catch (error) {
        // If refresh fails (e.g., refresh token expired), redirect to login
        if (error instanceof ApiError && error.reason === "refresh-expired") {
          // Use Next.js router to redirect to login
          if (typeof window !== "undefined") {
            const router = require("next/navigation").useRouter();
            router.push("/auth/login");
          }
        }
        throw error;
      }
    }

    throw new ApiError(
      errorData.message || "Request failed",
      response.status,
      errorData.reason
    );
  }

  return response.json();
};

// export const fetchProducts = async () => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return response.json();
// };

// export const fetchProductsUser = async () => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API}/products`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return response.json();
// };
