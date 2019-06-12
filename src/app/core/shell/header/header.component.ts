import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';
import { HeaderService } from './header.service';
import { Product } from '@app/core/types/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  menuHidden = true;
  activeLanguage = '';
  myCart = JSON.parse(sessionStorage.getItem('my-cart'));
  cartCount = this.myCart ? this.getCartCount(this.myCart.orders) : 0;

  constructor(private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private headerService: HeaderService) {
    this.headerService.shoppingCartItemsCount.subscribe((item: number) => {
      this.cartCount += item;
    });
  }

  ngOnInit() {
    this.activeLanguage = this.i18nService.language;
  }

  isAuth(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.activeLanguage = language;
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  getCartCount(orders: Product[]): number {
    let cartCount = 0;
    orders.forEach((o: Product) => cartCount += o.count);
    return cartCount;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const user = JSON.parse(localStorage.getItem('username'));
    return user ? `${user.fname} ${user.lname}` : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

}
