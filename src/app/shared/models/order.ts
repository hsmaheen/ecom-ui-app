import { Product } from './product';

export class Order {
  orderId: String = '';
  userId: String = '';
  status: String = '';
  products: Product[] = [];
  paymentMode: String = '';
  transactionId: String = '';
  orderAddress: String = '';
  orderPostalCode: String = '';
  createdAt: Date;
  updatedAt: Date;
}
