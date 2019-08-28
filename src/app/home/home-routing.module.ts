import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract, AuthenticationGuard } from '@app/core';
import { HomeComponent } from './home.component';
import { ServiceComponent } from './service/service.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { QualityComponent } from './quality/quality.component';
import { ContactComponent } from './contact/contact.component';
import { VideoComponent } from '@app/home/video/video.component';
import { CatalogueComponent } from '@app/home/catalogue/catalogue.component';
import { AtestComponent } from '@app/home/atest/atest.component';
import { DownloadComponent } from '@app/home/download/download.component';
import { NotFoundComponent } from '@app/home/404/404.component';
import { AboutUsComponent } from '@app/home/about-us/about-us.component';
import { LocationComponent } from '@app/home/location/location.component';
import { NewsletterSignOutComponent } from './newsletter-sign-out/newsletter-sign-out.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = Route.withShell([

  { path: 'servis', component: ServiceComponent, data: { title: extract('Servisi') } },
  { path: 'garancija', component: WarrantyComponent, data: { title: extract('Garancija') } },
  { path: 'quaility', component: QualityComponent, data: { title: extract('Kvalitet') } },
  { path: 'kontakt', component: ContactComponent, data: { title: extract('Kontakt') } },
  { path: 'video', component: VideoComponent, data: { title: extract('Video') } },
  { path: 'katalog', component: CatalogueComponent, data: { title: extract('Katalog') } },
  { path: 'atest', component: AtestComponent, data: { title: extract('Atesti') } },
  { path: 'download', component: DownloadComponent, data: { title: extract('Dokumenta') } },
  { path: '404', component: NotFoundComponent, data: { title: extract('404') } },
  { path: 'about-us', component: AboutUsComponent, data: { title: extract('O nama') } },
  { path: 'locations', component: LocationComponent, data: { title: extract('Gde kupiti') } },
  { path: 'newsletter-sign-out/:email', component: NewsletterSignOutComponent, data: { title: extract('Newsletter - Uspešna Odjava') } },
  { path: 'search-results/:param', component: SearchResultsComponent, data: { title: extract('Rezultati pretrage') } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: extract('Zaboravljena lozinka') } },
  { path: 'change-password', component: ChangePasswordComponent, data: { title: extract('Promena lozinke') }, canActivate: [AuthenticationGuard] },
  { path: 'set-password/:registrationCode', component: SetPasswordComponent, data: { title: extract('Kreiranje lozinke') } },
  { path: 'reset-password/:forgotPasswordCode', component: ResetPasswordComponent, data: { title: extract('Promena lozinke') } },
  { path: 'home', component: HomeComponent, data: { title: extract('Home') } },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
