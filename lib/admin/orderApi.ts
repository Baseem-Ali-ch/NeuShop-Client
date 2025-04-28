import { Order } from "@/types/order";
import { apiFetch } from "./api";

export const getOrders = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/orders`,
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

export async function fetchOrderDetails(orderId: string): Promise<Order> {
  console.log("Fetching order details for ID:", orderId);
  const response = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/orders/${orderId}`,
    {
      method: "GET",
    }
  );
  const orderData = response.orders?.[0] || response.order || response;

  return orderData;
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = response;
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}
