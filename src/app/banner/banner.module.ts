import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { QuoteService } from './quote.service';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerViewComponent } from './banner-view/banner-view.component';
import { BannerService } from './banner.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    BannerRoutingModule,
    HttpClientModule
  ],
  declarations: [
    BannerComponent,
    BannerListComponent,
    BannerViewComponent
  ],
  providers: [
    QuoteService,
    BannerService
  ]
})
export class BannerModule { }
