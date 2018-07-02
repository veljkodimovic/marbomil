import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carusel/carusel.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PromoComponent } from './promo/promo.component';
import { SectionsComponent } from './sections/sections.component';
import { ShopLogoComponent } from './shop-logo/shop-logo.component';

import { CarouselService } from './carusel/carusel.service';
import { EquipmentService } from './equipment/equipment.service';
import { SectionsService } from './sections/sections.service';
import { QuoteService } from './quote.service';
import { ServiceComponent } from './service/service.component';
import { ServiceService } from './service/service.service';
import { WarrantyComponent } from '@app/home/warranty/warranty.component';
import { WarrantyService } from '@app/home/warranty/warranty.service';
import { QualityComponent } from '@app/home/quality/quality.component';
import { QualityService } from '@app/home/quality/quality.service';
import { ContactComponent } from '@app/home/contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    NgbModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    ServiceComponent,
    WarrantyComponent,
    QualityComponent,
    ContactComponent,
    CarouselComponent,
    EquipmentComponent,
    PromoComponent,
    SectionsComponent,
    ShopLogoComponent,
    HomeComponent
  ],
  providers: [
    ServiceService,
    CarouselService,
    SectionsService,
    EquipmentService,
    WarrantyService,
    QualityService,
    QuoteService
  ]
})
export class HomeModule { }
