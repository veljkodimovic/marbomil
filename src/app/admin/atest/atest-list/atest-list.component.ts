import { Component, OnInit } from '@angular/core';
import { AtestService } from '../atest.service';

@Component({
  selector: 'app-atest-list',
  templateUrl: './atest-list.component.html',
  styleUrls: ['./atest-list.component.scss']
})

export class AtestListComponent implements OnInit {

  atestData: any;

  constructor(private svc: AtestService) {}

  ngOnInit() {
    this.svc.getAtest().subscribe(data => {
      this.atestData = data;
    });
  }

}
