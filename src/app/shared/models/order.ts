import { Product } from './product';

export class Order {
  orderId: string;
  userId: string;
  status: string;
  products: Product[];
  paymentMode: string;
  transactionId: string;
  orderAddress: string;
  orderPostalCode: string;
  createdAt: Date;
  updatedAt: Date;
}
