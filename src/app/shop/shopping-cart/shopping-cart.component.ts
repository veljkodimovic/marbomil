import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { HeaderService } from '@app/core/shell/header/header.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart: Product[];
  apiUrl: string;
  constructor(private persistenceService: PersistenceService, private headerService: HeaderService) { }

  ngOnInit() {
    this.apiUrl = this.persistenceService.apiUrl;
    this.cart = JSON.parse(sessionStorage.getItem('my-cart')).orders;
  }

  totalPrice(orders: Product[]) {
    let price = 0;
    orders = orders.length ? orders : [];
    orders.forEach((o: Product) => {
      price += o.price * o.count;
    });
    return price;
  }

  removeFromCart(order: Product) {
    sessionStorage.setItem('my-cart', JSON.stringify({ orders: this.cart.filter((o: Product) => o.id !== order.id)}));
    this.cart = JSON.parse(sessionStorage.getItem('my-cart')).orders;
    this.headerService.shoppingCartItemsCount.emit(-order.count);
  }

}
