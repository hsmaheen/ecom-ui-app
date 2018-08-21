export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
}

export class Order {
  $key: string;
  orderID: string;
  orderAddress: string;
  orderPostalCode: number;
  orderCreatedDate: Date;
  products: Product[];
  user: User;

}

export class User {
  $key: string;
  userName: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  createdOn: string;
  isAdmin: boolean;
  avatar: string;
}
