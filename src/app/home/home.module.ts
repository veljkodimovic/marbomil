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
    HomeComponent
  ],
  providers: [
    ServiceService,
    WarrantyService,
    QualityService,
    QuoteService
  ]
})
export class HomeModule { }
