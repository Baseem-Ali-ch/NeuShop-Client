import { apiFetch } from "./api";

// This is the API calls for login
export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
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

// This is the API calls for registration
export const registerUser = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    console.error("Registration API error:", error);
    return { success: false, message: error.message || "Registration Failed" };
  }
};

// This is the API calls for logout
export const logoutUser = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
      method: "POST",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Logout API error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during logout.",
    };
  }
};
