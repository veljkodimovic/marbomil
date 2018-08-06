import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
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

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'servis', component: ServiceComponent, data: { title: extract('Servisi') } },
  { path: 'garancija', component: WarrantyComponent, data: { title: extract('Garancija') } },
  { path: 'kvalitet', component: QualityComponent, data: { title: extract('Kvalitet') } },
  { path: 'kontakt', component: ContactComponent, data: { title: extract('Kontakt') } },
  { path: 'video', component: VideoComponent, data: { title: extract('Video') } },
  { path: 'katalog', component: CatalogueComponent, data: { title: extract('Katalog') } },
  { path: 'atest', component: AtestComponent, data: { title: extract('Atesti') } },
  { path: 'download', component: DownloadComponent, data: { title: extract('Dokumenta') } },
  { path: '404', component: NotFoundComponent, data: { title: extract('404') } },
  { path: 'about-us', component: AboutUsComponent, data: { title: extract('O nama') } },
  { path: 'locations', component: LocationComponent, data: { title: extract('Gde kupiti') } },
  { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
