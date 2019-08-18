import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  forgotPasswordCode: string;
  isLoading: boolean;
  password: string;
  confirmPassword: string;
  successRegistration: boolean;

  constructor(private route: ActivatedRoute, private setPasswordService: ResetPasswordService) { }

  ngOnInit() {
    this.isLoading = true;
    this.forgotPasswordCode = this.route.snapshot.paramMap.get('forgotPasswordCode');
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
    if (this.validatePassword()) {
      this.setPasswordService.setPassword(this.forgotPasswordCode, this.password).subscribe((data) => {
        this.successRegistration = true;
        this.isLoading = false;
      });
    }
  }

  validatePassword() {
    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      return false;
    } else {
      return true;
    }
  }

}

