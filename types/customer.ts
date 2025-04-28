export interface Customer {
    _id: string;
    id: string
    name: string;
    email: string;
    phone: string;
    dateRegistered: string;
    ordersCount: number;
    totalSpent: string;
    lastOrderDate: string | null;
    isActive: boolean;
    avatar?: string;
    status: string
  }