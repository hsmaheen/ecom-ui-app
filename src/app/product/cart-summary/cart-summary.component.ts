import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit, OnChanges {
  @Input() products: Product[];

  totalValue = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach(product => {
      console.log(
        'Adding: ' + product.productName + ' $ ' + product.productPrice
      );
      this.totalValue += (product.cartQty > 1) ? product.productPrice * product.cartQty : product.productPrice;
    });
  }

  ngOnInit() { }
}

