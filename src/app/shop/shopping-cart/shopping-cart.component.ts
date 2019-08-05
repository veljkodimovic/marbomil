import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { HeaderService } from '@app/core/shell/header/header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Order } from '@app/core/types/order';
import { ShoppingCartService } from './shopping-cart.service';

class Purchase {
  date: Date;
  note: string;
  items: any[];

  constructor(note: string, items: any[]) {
    this.date = new Date();
    this.note = note;
    this.items = items;
  }
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart: Product[];
  note: string;
  apiUrl: string;
  modalRef: any;
  constructor(private persistenceService: PersistenceService, private headerService: HeaderService, private modalService: NgbModal, private router: Router, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.apiUrl = this.persistenceService.apiUrl;
    this.cart = JSON.parse(sessionStorage.getItem('my-cart')) ? JSON.parse(sessionStorage.getItem('my-cart')).orders : null;
  }

  changeCountOfItem() {
    const myCart = JSON.parse(sessionStorage.getItem('my-cart'));
    myCart.orders = this.cart;
    sessionStorage.setItem('my-cart', JSON.stringify(myCart));
    this.headerService.shoppingCartItemsCount.emit(null);
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
    sessionStorage.setItem('my-cart', JSON.stringify({ orders: this.cart.filter((o: Product) => o.id !== order.id) }));
    this.cart = JSON.parse(sessionStorage.getItem('my-cart')).orders;
    this.headerService.shoppingCartItemsCount.emit(-order.count);
  }

  openConfirmModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  confirmPurchase() {
    this.modalRef.close();
    const orders = JSON.parse(sessionStorage.getItem('my-cart')).orders;
    const purchase = new Purchase('', []);
    orders.forEach((o: any) => {
      purchase.items.push({ productId: o.id, quantity: o.count });
    });
    purchase.note = this.note;
    this.shoppingCartService.confirmShopping(purchase).subscribe((data) => {
      console.log(data);
      sessionStorage.removeItem('my-cart');
      this.headerService.shoppingCartItemsCount.emit(null);
      this.router.navigate(['/shopping-confirmed']);
    });
  }
}
