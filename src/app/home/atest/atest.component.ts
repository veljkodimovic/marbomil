import { Component, OnInit } from '@angular/core';
import { AtestService } from '@app/admin/atest/atest.service';
import { Atest } from '@app/core/types/atest';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home-atest',
  templateUrl: './atest.component.html',
  styleUrls: ['./atest.component.scss']
})
export class AtestComponent implements OnInit {
  apiUrl: string;
  atestData: Atest[];
  constructor(private svc: AtestService) {
    this.apiUrl = environment.serverUrl;
  }

  ngOnInit() {
    this.svc.getAllAtests().subscribe(data => {
      this.atestData = data;
    });
  }

}
