import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '@app/material.module';
import { MockRoutingModule } from './mock-routing.module';
import { MockComponent } from './mock.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    MockRoutingModule,
    NgbModule
  ],
  declarations: [MockComponent]
})
export class MockModule { }
