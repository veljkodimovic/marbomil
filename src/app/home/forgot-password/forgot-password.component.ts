import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean;
  registrationCode: any;
  successSent: boolean;
  email: string;

  constructor(private route: ActivatedRoute, private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
    this.isLoading = true;
    this.registrationCode = this.route.snapshot.paramMap.get('registrationCode');
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  scrollTop(f: NgForm) {
    if (!f.form.valid) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }

  saveOnClick() {
    this.isLoading = true;
    this.forgotPasswordService.generateCode(this.email).subscribe(data => {
      this.successSent = true;
      this.isLoading = false;
    });
  }
}
