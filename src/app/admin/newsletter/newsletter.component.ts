import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from './newsletter.service';
import { DeleteModalComponent } from '@app/shared/delete-modal/delete-modal';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  @ViewChild(DeleteModalComponent)
  private modal: DeleteModalComponent;
  emails: string[];
  temp: string[];
  email: string;
  emailSelected: string;

  constructor(private newsletterServce: NewsletterService) { }

  ngOnInit() {
    // this.getAllEmails();
    const emails = ['email1@gmail.com', 'email2@gmail.com', 'email3@gmail.com'];
    this.temp = [...emails];
    this.emails = emails;
  }

  getAllEmails() {
    this.newsletterServce.getAllEmails().subscribe((emails: string[]) => {
      this.temp = [...emails];
      this.emails = emails;
    });
  }

  addAddress(email: string) {
    this.newsletterServce.subscribeToNewsletter(email).subscribe(() => {
      this.getAllEmails();
    });
  }

  openModal(email: string) {
    this.emailSelected = email;
    this.modal.openModal();
  }

  performDelete(event: any) {
    this.newsletterServce.signOutFromNewsletter(this.emailSelected).subscribe((data: any) => {
      this.getAllEmails();
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase().trim();
    // filter our data
    const temp = this.temp.filter((d: string) => {
      return (d.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // update the rows
    this.emails = temp;
  }

}
