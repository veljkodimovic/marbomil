import { Component, OnInit } from '@angular/core';
import { AtestService} from '../atest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atest-view',
  templateUrl: './atest-view.component.html',
  styleUrls: ['./atest-view.component.scss']
})
export class AtestViewComponent implements OnInit {

   atest: any;
   link: any;
  constructor(private svc: AtestService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getAtestDetails();
  }

  getAtestDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.svc.getAtestById(id).subscribe(data => {
      this.atest = data.data;
    });
  }

}
