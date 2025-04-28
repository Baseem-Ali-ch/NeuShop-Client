import { apiFetch } from "./api";

// This is the API calls for login
export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: error.message || "An error occurred. Please try again.",
    };
  }
};