export interface PaymentMethod {
  _id: number;
  cardholderName: string;
  cardNumber:string;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: string;
  isDefault: boolean;
}
