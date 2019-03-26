import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryViewComponent } from '@app/shop/categories/category-view/category-view.component';
import { CollectionsComponent } from './collections/collections.component';
import { ProductComponent } from '@app/shop/product/product.component';
import { ProductViewComponent } from '@app/shop/product/product-view/product-view.component';
import { ShoppingCartComponent } from '@app/shop/shopping-cart/shopping-cart.component';

const routes: Routes = Route.withShell([
  { path: 'products/list', component: ProductComponent, data: { title: extract('Proizvodi') } },
  { path: 'product/:id', component: ProductViewComponent, data: { title: extract('Proizvod') } },
  { path: 'categories', component: CategoriesComponent, data: { title: extract('Kategorije') } },
  { path: 'categories/:id', component: CategoryViewComponent, data: { title: extract('Kategorije') } },
  { path: 'collections', component: CollectionsComponent, data: { title: extract('Kolekcije') } },
  { path: 'collections/:id', component: CollectionsComponent, data: { title: extract('Kolekcija Proizvoda') } },
  { path: 'shopping-cart', component: ShoppingCartComponent, data: { title: extract('Moja Korpa') } },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ShopRoutingModule { }
