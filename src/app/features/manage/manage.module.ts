import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangageinventoryModule } from '../../mangageinventory/mangageinventory.module';
import { BasetypeComponent } from './childcomponents/basetype';
import { CategoryComponent } from './childcomponents/category';
import { PaybymanageComponent } from './childcomponents/paybymanage/paybymanage.component';
import { ProductComponent } from './childcomponents/product/product.component';
import { ProductpriceformComponent } from './childcomponents/productpriceform';
import { CategorytypeformComponent } from './childcomponents/quantitytype';
import { TaxComponent } from './childcomponents/tax';
import { ManageRoutes } from './manage.routes';
import { RouterModule } from '@angular/router';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasetypeComponent,
    CategoryComponent,
    PaybymanageComponent,
    ProductComponent,
    ProductpriceformComponent,
    CategorytypeformComponent, FivecommanModule,
    TaxComponent, RouterModule.forChild(ManageRoutes),
  ]
})
export class ManageModule { }
