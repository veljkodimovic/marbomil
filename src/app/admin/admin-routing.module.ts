import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { AdminComponent } from './admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BannerViewComponent } from './banner/banner-view/banner-view.component';
import { BannerComponent } from './banner/banner.component';
import { CategoryViewComponent } from './categories/category-view/category-view.component';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionViewComponent } from './collections/collection-view/collection-view.component';
import { CollectionsComponent } from './collections/collections.component';
import { VideoViewComponent } from './video/video-view/video-view.component';
import { VideoComponent } from './video/video.component';
import { AtestViewComponent } from './atest/atest-view/atest-view.component';
import { AtestComponent } from './atest/atest.component';
import { CatalogueViewComponent } from './catalogue/catalogue-view/catalogue-view.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ServiceViewComponent } from './service/service-view/service-view.component';
import { ServiceComponent } from './service/service.component';
import { SalesViewComponent } from './sales/sales-view/sales-view.component';
import { SalesComponent } from './sales/sales.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = Route.withShell([
  { path: 'admin/banners', component: BannerComponent, data: { title: extract('Banner') } },
  { path: 'admin/banner/:id', component: BannerViewComponent, data: { title: extract('Banner View') } },
  { path: 'admin/banner/new', component: BannerViewComponent, data: { title: extract('Banner View') } },
  { path: 'admin/category', component: CategoriesComponent, data: { title: extract('Category') } },
  { path: 'admin/category/:id', component: CategoryViewComponent, data: { title: extract('Category View') } },
  { path: 'admin/collection', component: CollectionsComponent, data: { title: extract('Collection') } },
  { path: 'admin/collection/:id', component: CollectionViewComponent, data: { title: extract('Collection View') } },
  { path: 'admin/video', component: VideoComponent, data: { title: extract('Video') } },
  { path: 'admin/video/:id', component: VideoViewComponent, data: { title: extract('Video View') } },
  { path: 'admin/atest', component: AtestComponent, data: { title: extract('Atest') } },
  { path: 'admin/atest/:id', component: AtestViewComponent, data: { title: extract('Atest View') } },
  { path: 'admin/catalogue', component: CatalogueComponent, data: { title: extract('Catalogue') } },
  { path: 'admin/catalogue/:id', component: CatalogueViewComponent, data: { title: extract('Catalogue View') } },
  { path: 'admin/service', component: ServiceComponent, data: { title: extract('Service') } },
  { path: 'admin/service/:id', component: ServiceViewComponent, data: { title: extract('Service View') } },
  { path: 'admin/sales', component: SalesComponent, data: { title: extract('Sales') } },
  { path: 'admin/sales/:id', component: SalesViewComponent, data: { title: extract('Sales View') } },
  { path: 'admin/product', component: ProductComponent, data: { title: extract('Product') } },
  { path: 'admin/product/:id', component: ProductViewComponent, data: { title: extract('Product View') } },
  { path: 'admin', component: AdminComponent, data: { title: extract('Admin') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
