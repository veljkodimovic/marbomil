import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { NgxPermissionsService } from 'ngx-permissions';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  returnUrl: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private permissionsService: NgxPermissionsService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      const route = JSON.parse(localStorage.getItem('username')).role === 'Admin' ? 'admin' : '/';
      this.router.navigate([route]);
    } else {
      this.authenticationService.logout();
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe((credentials: any) => {

        if (this.authenticationService.isAuthenticated) {
          log.debug(`${this.loginForm.value.username} successfully logged in`);
          const usernameKey = 'username';
          this.authenticationService.getUserContext().subscribe((userData: any) => {
            console.log('user/context', userData);
            if (userData.role === 'Admin') {
              localStorage.setItem(usernameKey, JSON.stringify({ fname: userData.firstName, lname: userData.lastName, role: userData.role }));
              this.permissionsService.loadPermissions([userData.role]);
              this.router.navigate(['admin']);
            } else if (userData.contactPerson) {
              localStorage.setItem(usernameKey, JSON.stringify({ contactPerson: userData.contactPerson, role: 'Buyer' }));
              this.permissionsService.loadPermissions(['Buyer']);
              this.router.navigateByUrl(this.returnUrl.toLowerCase());
            } else {
              localStorage.setItem(usernameKey, JSON.stringify({ fname: 'user', lname: 'user', role: 'Buyer' }));
              this.permissionsService.loadPermissions(['Buyer']);
              this.router.navigateByUrl(this.returnUrl.toLowerCase());
            }
            // this.router.navigateByUrl(this.returnUrl.toLowerCase());
          });
        }
      }, (error: any) => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
