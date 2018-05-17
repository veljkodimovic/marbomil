import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { BannerComponent } from './banner.component';
import {BannerViewComponent} from '@app/banner/banner-view/banner-view.component';

const routes: Routes = Route.withShell([
  // { path: '', redirectTo: '/banner', pathMatch: 'full' },
  { path: 'banners', component: BannerComponent, data: { title: extract('Banner') } },
  { path: 'banner/:id', component: BannerViewComponent, data: { title: extract('Banner View') } },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BannerRoutingModule { }
