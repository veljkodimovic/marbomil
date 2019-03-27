import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  @Output() shoppingCartItemsCount: EventEmitter<number> = new EventEmitter();

  constructor() {

  }
}
