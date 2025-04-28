import { Customer } from "@/types/customer";
import { apiFetch } from "./api";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/customers`,
    {
      method: "GET",
    }
  );
  const data = response;
  if (!data.customers || !Array.isArray(data.customers)) {
    throw new Error(
      "Invalid response format: Expected data.customers to be an array"
    );
  }

  return data.customers.map((customer: any) => {
    const latestOrder =
      customer.orders?.length > 0
        ? new Date(
            Math.max(
              ...customer.orders.map((o: any) => new Date(o.date).getTime())
            )
          )
        : null;

    return {
      id: customer._id.toString(),
      name:
        `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
        "Unknown",
      email: customer.email || "N/A",
      phone: customer.phone || "N/A",
      dateRegistered: customer.createdAt
        ? new Date(customer.createdAt).toLocaleDateString()
        : "N/A",
      ordersCount: customer.orders?.length || 0,
      totalSpent: customer.totalSpent
        ? `$${customer.totalSpent.toFixed(2)}`
        : "$0.00",
      lastOrderDate: latestOrder ? latestOrder.toLocaleDateString() : null,
      status: customer.status || "active",
      avatar: customer.avatar || "/placeholder.svg",
    };
  });
};

export const activateCustomer = async (customerId: string): Promise<void> => {
  try {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/customers/${customerId}/activate`,
      {
        method: "PATCH",
      }
    );
  } catch (error) {
    console.log("error deactivate customer", error);
    throw new Error("Failed to deactivate customer");
  }
};

export const deactivateCustomer = async (customerId: string): Promise<void> => {
  try {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/customers/${customerId}/deactivate`,
      {
        method: "PATCH",
      }
    );
  } catch (error) {
    console.log("error deactivate customer", error);
    throw new Error("Failed to deactivate customer");
  }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/customers/${customerId}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.log("error delete customer", error);
    throw new Error("Failed to delete customer");
  }
};
