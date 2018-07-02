import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionsComponent } from './collections/collections.component';

const routes: Routes = Route.withShell([
  // { path: 'products/list', component: ServiceComponent, data: { title: extract('Servisi') } },
  // { path: 'products/:id', component: WarrantyComponent, data: { title: extract('Garancija') } },
  { path: 'categories', component: CategoriesComponent, data: { title: extract('Categories') } },
  { path: 'collections', component: CollectionsComponent, data: { title: extract('Collections') } },
  { path: 'collections/:id', component: CollectionsComponent, data: { title: extract('Collection Products') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ShopRoutingModule { }
