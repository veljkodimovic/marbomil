import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import { AtestService } from '@app/admin/atest/atest.service';
import {Atest} from '@app/core/types/atest';

@Component({
  selector: 'app-home-atest',
  templateUrl: './atest.component.html',
  styleUrls: ['./atest.component.scss']
})
export class AtestComponent implements OnInit {

  atestData: Atest[];
  constructor(private svc: AtestService) { }

  ngOnInit() {
    this.svc.getAllAtests().subscribe(data => {
      this.atestData = data;
    });
  }

}
