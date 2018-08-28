export class CreditCard {
  nameOnCard: String = '';
  creditCardNumber: Number;
  expiration: Number;
  cvv: Number;
}

export class Transaction {
  userId: String;
  status: String;
  orderId: String;
  createdAt: Date;

}
