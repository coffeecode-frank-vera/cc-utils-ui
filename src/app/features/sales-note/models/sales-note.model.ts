export interface SalesNoteDates {
  creationDate: Date;
  deliveryDate: Date;
}

export interface Customer {
  name: string;
  phone?: string;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type Currency = 'MXN' | 'USD';

export interface SalesNote {
  dates: SalesNoteDates;
  customer: Customer;
  products: Product[];
  total: number;
  currency: Currency;
  createdAt: Date;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  address: string;
  email: string;
}
