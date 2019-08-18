import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  forgotPasswordCode: string;
  isLoading: boolean;
  oldPassword: string;
  password: string;
  confirmPassword: string;
  successChanged: boolean;

  constructor(private route: ActivatedRoute, private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
    this.isLoading = true;
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
      this.changePasswordService.changePassword(this.oldPassword, this.password).subscribe((data: any) => {
        this.successChanged = true;
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
