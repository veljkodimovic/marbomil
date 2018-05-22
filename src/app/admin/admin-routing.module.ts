import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { AdminComponent } from './admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BannerViewComponent } from './banner/banner-view/banner-view.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = Route.withShell([
  { path: 'admin/banners', component: BannerComponent, data: { title: extract('Banner') } },
  { path: 'admin/banner/:id', component: BannerViewComponent, data: { title: extract('Banner View') } },
  { path: 'admin', component: AdminComponent, data: { title: extract('Admin') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
