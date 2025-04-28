import { z } from "zod";
import { apiFetch } from "./api";
import { Address } from "@/types/address";
import { addressSchema } from "../schemad/addressSchema";

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

export const fetchPaymentMethods = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};

export const deletePaymentMethod = async (id: number) => {
  try {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.error("Error deleting payment method:", error);
    throw error;
  }
};

export const setDefaultPaymentMethod = async (id: number, userId: string) => {
  try {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
  } catch (error) {
    console.error("Error setting default payment method:", error);
    throw error;
  }
};

export const savePaymentMethod = async (
  data: any,
  editingPaymentId: number | null
) => {
  try {
    const method = editingPaymentId ? "PUT" : "POST";
    const url = editingPaymentId
      ? `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods/${editingPaymentId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods`;

    const response = await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });

    return response;
  } catch (error) {
    console.error("Error saving payment method:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/orders`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export async function cancelOrder(orderId: string, reason: string) {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${orderId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );

    return response;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
}

export async function returnOrder(orderId: string, reason: string) {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${orderId}/return`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );

    return response;
  } catch (error) {
    console.error("Error submitting return request:", error);
    throw error;
  }
}

export const fetchWalletDetails = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/wallet`,
      {
        method: "GET",
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw error;
  }
};

export const useWalletBalance = async (orderId: string, amount: number) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/wallet/use`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, amount }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error using wallet balance:", error);
    throw error;
  }
};