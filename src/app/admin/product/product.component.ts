import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    // this.quoteService.getRandomQuote({ category: 'dev' })
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((quote: string) => { this.quote = quote; });
  }

}
