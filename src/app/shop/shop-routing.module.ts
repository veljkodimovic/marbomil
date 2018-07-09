import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionsComponent } from './collections/collections.component';
import { ProductComponent } from '@app/shop/product/product.component';
import { ProductViewComponent } from '@app/shop/product/product-view/product-view.component';

const routes: Routes = Route.withShell([
  { path: 'products/list', component: ProductComponent, data: { title: extract('Proizvodi') } },
  { path: 'product/:id', component: ProductViewComponent, data: { title: extract('Proizvod') } },
  { path: 'categories', component: CategoriesComponent, data: { title: extract('Kategorije') } },
  { path: 'collections', component: CollectionsComponent, data: { title: extract('Kolekcije') } },
  { path: 'collections/:id', component: CollectionsComponent, data: { title: extract('Kolekcija Proizvoda') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ShopRoutingModule { }
