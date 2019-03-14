import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { FooterService } from './footer.service';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  newsletterEmail: string;

  constructor(private svc: FooterService,
    private notificationService: NotificationsService,
    private router: Router,
    private titleService: Title,
    private i18nService: I18nService) { }

  ngOnInit() {}

  registerNewsletter() {
    const body = {'email': this.newsletterEmail};

    this.svc.registerNewsletter(body)
    .finally(() => {  })
    .subscribe((response: any) => {
      this.handleResponse(response);
    });
  }

  handleResponse(response: any) {
    if (!response.ok) {
      const body = JSON.parse(response._body);
      if (body.title) {
        this.notificationService.error(body.title, body.description,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          });
      } else {
        let description = '';
        for (const errorDescription of body) {
          description += errorDescription + '<br>';
        }
        this.notificationService.warn('Greška pri slanju', description,
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      }
    } else {
      this.notificationService.success('Success', 'Uspešno ste se prijavili na newsletter.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
    }
  }


}
