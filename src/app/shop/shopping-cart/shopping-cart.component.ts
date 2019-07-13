import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/types/product';
import { PersistenceService } from '@app/core/persistence.service';
import { HeaderService } from '@app/core/shell/header/header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart: Product[];
  apiUrl: string;
  modalRef: any;
  constructor(private persistenceService: PersistenceService, private headerService: HeaderService, private modalService: NgbModal, private router: Router) { }

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
    sessionStorage.removeItem('my-cart');
    this.headerService.shoppingCartItemsCount.emit(null);
    this.router.navigate(['/shopping-confirmed']);
  }
}
