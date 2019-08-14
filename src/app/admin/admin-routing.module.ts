import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract, AuthenticationGuard } from '@app/core';
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
import { CustomerViewComponent } from './customers/customer-view/customer-view.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderViewComponent } from './orders/order-view/order-view.component';
import { OrdersComponent } from './orders/orders.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { RoleGuard } from '@app/core/authentication/role.guard';

const routes: Routes = Route.withShell([
  { path: 'admin/banners', component: BannerComponent, data: { title: extract('Banner'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/banner/:id', component: BannerViewComponent, data: { title: extract('Banner View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/banner/new', component: BannerViewComponent, data: { title: extract('Banner View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/category', component: CategoriesComponent, data: { title: extract('Category'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/category/:id', component: CategoryViewComponent, data: { title: extract('Category View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/category/new', component: CategoryViewComponent, data: { title: extract('Category View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/collection', component: CollectionsComponent, data: { title: extract('Collection'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/collection/:id', component: CollectionViewComponent, data: { title: extract('Collection View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/collection/new', component: CollectionViewComponent, data: { title: extract('Collection View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/video', component: VideoComponent, data: { title: extract('Video'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/video/:id', component: VideoViewComponent, data: { title: extract('Video View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/video/new', component: VideoViewComponent, data: { title: extract('Video View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/atest', component: AtestComponent, data: { title: extract('Atest'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/atest/:id', component: AtestViewComponent, data: { title: extract('Atest View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/atest/new', component: AtestViewComponent, data: { title: extract('Atest View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/catalogue', component: CatalogueComponent, data: { title: extract('Catalogue'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/catalogue/:id', component: CatalogueViewComponent, data: { title: extract('Catalogue View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/catalogue/new', component: CatalogueViewComponent, data: { title: extract('Catalogue View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/service', component: ServiceComponent, data: { title: extract('Service'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/service/:id', component: ServiceViewComponent, data: { title: extract('Service View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/service/new', component: ServiceViewComponent, data: { title: extract('Service View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/sales', component: SalesComponent, data: { title: extract('Sales'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/sales/:id', component: SalesViewComponent, data: { title: extract('Sales View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/sales/new', component: SalesViewComponent, data: { title: extract('Sales View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/product', component: ProductComponent, data: { title: extract('Product'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/product/:id', component: ProductViewComponent, data: { title: extract('Product View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/product/new', component: ProductViewComponent, data: { title: extract('Product View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/customers', component: CustomersComponent, data: { title: extract('Customers'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/customer/:id', component: CustomerViewComponent, data: { title: extract('Customer View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/customer/new', component: CustomerViewComponent, data: { title: extract('Customer View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/orders', component: OrdersComponent, data: { title: extract('Orders'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/order/:id', component: OrderViewComponent, data: { title: extract('Order View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/order/new', component: OrderViewComponent, data: { title: extract('Order View'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin/newsletter', component: NewsletterComponent, data: { title: extract('Newsletter'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] },
  { path: 'admin', component: AdminComponent, data: { title: extract('Admin'), onlyFor: ['Admin'] }, canActivate: [AuthenticationGuard, RoleGuard] }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
