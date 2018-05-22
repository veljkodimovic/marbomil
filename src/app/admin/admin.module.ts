import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BannerViewComponent } from './banner/banner-view/banner-view.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { BannerComponent } from './banner/banner.component';
import { BannerService } from './banner/banner.service';
import { AdminComponent } from './admin.component';
import { QuoteService } from './quote.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    BannerViewComponent,
    BannerListComponent,
    BannerComponent
  ],
  providers: [
    QuoteService,
    BannerService
  ]
})
export class AdminModule { }
