export interface OrderItem {
  _id: string;
  productId: any;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingInfo {
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  paymentMethod: string;
}

export interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  items: OrderItem[];
  paymentInfo: PaymentInfo;
  shippingInfo: ShippingInfo;
  paymentStatus: string;
  status: string;
  subtotal: number;
  total: number;
  __v?: number;
}