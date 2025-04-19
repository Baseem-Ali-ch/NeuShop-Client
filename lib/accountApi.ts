import { z } from "zod";
import { apiFetch } from "./api";
import { addressSchema } from "./schemad/addressSchema";
import { Address } from "@/types/address";

export const fetchUserDetails = async (): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/details`,
      {
        method: "GET",
      }
    );

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching user details.",
    };
  }
};

export const updateUserDetails = async (
  data: any
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/details`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error updating user details:", error);
    return {
      success: false,
      message: error.message || "Failed to update user details.",
    };
  }
};

export const updateUserPassword = async (
  data: any
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/details/password`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error updating user password:", error);
    return {
      success: false,
      message: error.message || "Failed to update user password.",
    };
  }
};

export const fetchAddresses = async (): Promise<Address[]> => {
  try {
    const result = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/addresses`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    throw new Error("Failed to fetch addresses.");
  }
};

type AddressFormValues = z.infer<typeof addressSchema>;
export const saveAddress = async (
  data: AddressFormValues,
  editingAddressId: number | null
): Promise<Address> => {
  const method = editingAddressId ? "PUT" : "POST";
  const url = editingAddressId
    ? `${process.env.NEXT_PUBLIC_BACKEND_API}/addresses/${editingAddressId}`
    : `${process.env.NEXT_PUBLIC_BACKEND_API}/addresses`;

  try {
    const result = await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    return result;
  } catch (error: any) {
    console.error("Error saving address:", error);
    throw new Error("Failed to save address.");
  }
};

export const deleteAddress = async (id: number): Promise<void> => {
  try {
    await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/addresses/${id}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    throw new Error("Failed to delete address.");
  }
};

export const setDefaultAddress = async (id: number): Promise<void> => {
  try {
    await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/addresses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
  } catch (error: any) {
    console.error("Error setting default address:", error);
    throw new Error("Failed to set default address.");
  }
};
