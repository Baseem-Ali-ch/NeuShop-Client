import { AppDispatch } from "@/store/store";
import { ApiError, apiFetch } from "./api";
import { addItem, setCart } from "@/store/slices/cartSlice";
import { OrderData } from "@/types/checkout";

interface AddToCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export const addToCart = async (
  item: AddToCartItem,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new ApiError(
        `Failed to add to cart: ${response.status}`,
        response.status
      );
    }

    dispatch(addItem(item));
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const fetchCart = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/cart`
    );
    dispatch(setCart({ items: response.items, total: response.total }));
    return response;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// export const fetchAddresses = async (): Promise<any[]> => {
//   try {
//     const response = await apiFetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_API}/addresses`,
//       {
//         method: "GET",
//       }
//     );

//     const data = response;
//     return data.addresses || [];
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     throw error;
//   }
// };

// export const fetchPaymentMethods = async (): Promise<any[]> => {
//   try {
//     const response = await apiFetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_API}/payment-methods`,
//       {
//         method: "GET",
//       }
//     );

//     const data = response;
//     return data.paymentMethods || [];
//   } catch (error) {
//     console.error("Error fetching payment methods:", error);
//     throw error;
//   }
// };


export const placeOrder = async (orderData: OrderData): Promise<any> => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/place-orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const result = response;
    return result;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
