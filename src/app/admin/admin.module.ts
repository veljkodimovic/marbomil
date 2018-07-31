import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, ImageCropperModule } from 'ng2-img-cropper';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BannerViewComponent } from './banner/banner-view/banner-view.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { BannerComponent } from './banner/banner.component';
import { BannerService } from './banner/banner.service';
import { AdminComponent } from './admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryViewComponent } from './categories/category-view/category-view.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryService } from './categories/categories.service';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionViewComponent } from './collections/collection-view/collection-view.component';
import { CollectionListComponent } from './collections/collection-list/collection-list.component';
import { CollectionService } from './collections/collections.service';
import { VideoComponent } from './video/video.component';
import { VideoViewComponent } from './video/video-view/video-view.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoService } from './video/video.service';
import { AtestComponent } from './atest/atest.component';
import { AtestViewComponent } from './atest/atest-view/atest-view.component';
import { AtestListComponent } from './atest/atest-list/atest-list.component';
import { AtestService } from './atest/atest.service';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueViewComponent } from './catalogue/catalogue-view/catalogue-view.component';
import { CatalogueListComponent } from './catalogue/catalogue-list/catalogue-list.component';
import { CatalogueService } from './catalogue/catalogue.service';
import { ServiceComponent } from './service/service.component';
import { ServiceViewComponent } from './service/service-view/service-view.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ServiceService } from './service/service.service';
import { SalesComponent } from './sales/sales.component';
import { SalesViewComponent } from './sales/sales-view/sales-view.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesService } from './sales/sales.service';
import { ProductComponent } from './product/product.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './product/product.service';
import { UploadService } from '@app/shared/upload/upload.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    SimpleNotificationsModule.forRoot(),
    ImageCropperModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    BannerViewComponent,
    BannerListComponent,
    BannerComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryViewComponent,
    CollectionsComponent,
    CollectionListComponent,
    CollectionViewComponent,
    VideoComponent,
    VideoListComponent,
    VideoViewComponent,
    AtestComponent,
    AtestListComponent,
    AtestViewComponent,
    CatalogueComponent,
    CatalogueListComponent,
    CatalogueViewComponent,
    ServiceComponent,
    ServiceListComponent,
    ServiceViewComponent,
    SalesComponent,
    SalesListComponent,
    SalesViewComponent,
    ProductComponent,
    ProductListComponent,
    ProductViewComponent
  ],
  providers: [
    BannerService,
    CategoryService,
    CollectionService,
    VideoService,
    AtestService,
    CatalogueService,
    ServiceService,
    SalesService,
    ProductService,
    UploadService
  ]
})
export class AdminModule { }
