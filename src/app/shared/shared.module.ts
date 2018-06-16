import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DeleteModalComponent } from './delete-modal/delete-modal';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    DeleteModalComponent
  ],
  exports: [
    LoaderComponent,
    DeleteModalComponent
  ]
})
export class SharedModule { }
