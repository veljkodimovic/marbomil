import { Component, OnInit } from '@angular/core';
import { ContactFormClass } from '@app/home/contact/contact';
import { ContactService } from './contact.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new ContactFormClass('', '', '');
  contactName: string;
  contactSubject: string;
  contactMessage: string;

  constructor(private svc: ContactService,
              private notificationService: NotificationsService,
              private router: Router) { }

  ngOnInit() {}

  onSubmit() {
    const message = `Dobili ste novu poruku sa sajta marbomil.rs <br>
    <b>Poruka od:<b> ${this.contactName} <br>
    <b>Naziv poruke:<b> ${this.contactSubject} <br>
    <b>Tekst poruke:<b> ${this.contactMessage}`;
    this.model.subject = 'Nova poruka sa sajta marbomil.rs';
    this.model.message = message;

    this.svc.sendEmail(this.model)
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
      this.notificationService.success('Success', 'Poruka je uspešno poslata.',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100
        });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }
  }

}
