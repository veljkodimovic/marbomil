import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SetPasswordService } from './set-password.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  registrationCode: string;
  isLoading: boolean;
  password: string;
  confirmPassword: string;
  successRegistration: boolean;

  constructor(private route: ActivatedRoute, private setPasswordService: SetPasswordService) { }

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
    if (this.validatePassword()) {
      this.setPasswordService.setPassword(this.registrationCode, this.password).subscribe((data) => {
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
