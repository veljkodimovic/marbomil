import { Component, OnInit } from '@angular/core';
import {Banner} from '@app/core/types/banner';
import { AtestService } from '@app/admin/atest/atest.service';
import { Atest } from '@app/core/types/atest';

@Component({
  selector: 'app-home-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  downloadData: Atest[];
  constructor(private svc: AtestService) { }

  ngOnInit() {
    this.svc.getAllAtests().subscribe(data => {
      this.downloadData = data;
    });
  }

}
