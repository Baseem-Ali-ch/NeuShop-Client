interface PaymentData {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv?: string;
    _id?: string;
  }
  
  interface ShippingInfo {
    address: string;
    apartment: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  }
  
  export interface OrderData {
    paymentInfo: PaymentData;
    shippingInfo: ShippingInfo;
    items: any[];
    subtotal: number;
    total: number;
    tax: number;
  }