import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  param: string;
  @Output() searchEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
