import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsletterSignOutService } from './newsletter-sign-out.service';

@Component({
  selector: 'app-newsletter-sign-out',
  templateUrl: './newsletter-sign-out.component.html',
  styleUrls: ['./newsletter-sign-out.component.scss']
})
export class NewsletterSignOutComponent implements OnInit {
  email: string;
  showInfo: boolean;
  showAlert: boolean;

  constructor(private route: ActivatedRoute, private newsletterSingOutService: NewsletterSignOutService) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.signOutFromNewsletter(this.email);
    setTimeout(() => {
      if (!this.showInfo) {
        this.showAlert = true;
      }

    }, 2000);

  }

  signOutFromNewsletter(email: string) {
    this.newsletterSingOutService.signOutFromNewsletter(email).subscribe((data) => {
      console.log(data);
      this.showInfo = true;
      this.showAlert = false;
    });
  }

}
