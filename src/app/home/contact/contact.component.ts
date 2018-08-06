import { Component, OnInit } from '@angular/core';
import { ContactFormClass } from '@app/home/contact/contact';

@Component({
  selector: 'app-home-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  submitted = false;
  model = new ContactFormClass('', '', '', '');

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
