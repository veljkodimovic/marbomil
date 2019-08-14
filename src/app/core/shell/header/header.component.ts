import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';
import { HeaderService } from './header.service';
import { Product } from '@app/core/types/product';
import { NgForm } from '@angular/forms';
import { SearchResultsService } from '@app/home/search-results/search-results.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  menuHidden = true;
  searchParam: string;
  activeLanguage = '';
  myCart = JSON.parse(sessionStorage.getItem('my-cart'));
  cartCount = this.myCart ? this.getCartCount(this.myCart.orders) : 0;

  constructor(private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private headerService: HeaderService,
    private searchResultsService: SearchResultsService
    ) {
    this.headerService.shoppingCartItemsCount.subscribe((item: number) => {
      if (item) {
        this.cartCount += item;
      } else {
        this.myCart = JSON.parse(sessionStorage.getItem('my-cart'));
        this.cartCount = this.myCart ? this.getCartCount(this.myCart.orders) : 0;
      }
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

  goToMyOrders() {
    this.router.navigate(['my-orders']);
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const user = JSON.parse(localStorage.getItem('username'));
    if (user && user.fname && user.lname) {
      return `${user.fname} ${user.lname}`;
    } else if (user && user.contactPerson) {
      return `${user.contactPerson}`;
    }
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  goToHome() {
    const route = JSON.parse(localStorage.getItem('username')) && JSON.parse(localStorage.getItem('username')).role === 'Admin' ? 'admin' : '/';
    this.router.navigate([route]);
  }

  search(searchParam: string, form: NgForm) {
    if (searchParam) {
      form.reset();
      this.searchResultsService.param = searchParam;
      this.searchResultsService.searchEvent.emit(true);
      this.router.navigate([`/search-results/${searchParam}`]);
    }

  }

}
