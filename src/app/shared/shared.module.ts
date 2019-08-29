import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DeleteModalComponent } from './delete-modal/delete-modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    TranslateModule
  ],
  declarations: [
    LoaderComponent,
    DeleteModalComponent
  ],
  exports: [
    LoaderComponent,
    DeleteModalComponent,
    NgxPermissionsModule
  ]
})
export class SharedModule { }
