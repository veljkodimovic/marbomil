import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-atest',
  templateUrl: './atest.component.html',
  styleUrls: ['./atest.component.scss']
})
export class AtestComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

}
