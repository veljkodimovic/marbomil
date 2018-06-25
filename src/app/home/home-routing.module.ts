import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { HomeComponent } from './home.component';
import { ServiceComponent } from './service/service.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'servis', component: ServiceComponent, data: { title: extract('Servisi') } },
  { path: 'garancija', component: WarrantyComponent, data: { title: extract('Garancija') } },
  { path: 'kontakt', component: ContactComponent, data: { title: extract('Kontakt') } },
  { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
