import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { ShopRoutingModule } from './shop-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from '@app/shop/categories/categories.service';
import { CategoryViewComponent } from '@app/shop/categories/category-view/category-view.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionService} from '@app/shop/collections/collections.service';
import { ProductComponent } from '@app/shop/product/product.component';
import { ProductViewComponent } from '@app/shop/product/product-view/product-view.component';
import { ProductService } from '@app/shop/product/product.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ShopRoutingModule
  ],
  declarations: [
    CategoriesComponent,
    CategoryViewComponent,
    CollectionsComponent,
    ProductComponent,
    ProductViewComponent,
    ShoppingCartComponent
  ],
  providers: [
    CategoryService,
    CollectionService,
    ProductService
  ]
})
export class ShopModule { }
