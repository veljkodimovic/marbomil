import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from './newsletter.service';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  emails: any[] = [];
  temp: any[];
  email: any;
  emailSelected: any;
  isLoading: boolean;

  constructor(private newsletterServce: NewsletterService,
    private notificationService: NotificationsService, ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllSubscribers();
  }

  getAllSubscribers() {
    this.newsletterServce.getAllSubscribers().subscribe((emails: any[]) => {
      this.temp = [...emails];
      this.emails = emails;
      this.isLoading = false;
    });
  }

  addAddress(email: any) {
    this.newsletterServce.subscribeToNewsletter({ email: email }).subscribe((response: any) => {
      this.email = null;
      this.handleResponse(response);
      this.getAllSubscribers();
    });
  }

  openModal(email: any) {
    this.emailSelected = email;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.newsletterServce.signOutFromNewsletter(this.emailSelected.email).subscribe((data: any) => {
      this.getAllSubscribers();
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase().trim();
    // filter our data
    const temp = this.temp.filter((d: any) => {
      return (d.email.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // update the rows
    this.emails = temp;
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
