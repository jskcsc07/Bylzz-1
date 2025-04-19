import { NgModule } from '@angular/core';
import { InventoryfoodComponent } from './inventoryfood/inventoryfood.component';
import { InventoryfoodquntitytypeComponent } from './inventoryfoodquntitytype/inventoryfoodquntitytype.component';
import { InventorymainfoodComponent } from './inventorymainfood/inventorymainfood.component';
import { RouterModule } from '@angular/router';
import { InventoryRoutes } from './inventory.routes';




@NgModule({
  declarations: [],
  imports: [InventoryfoodComponent,
    InventoryfoodquntitytypeComponent,
    InventorymainfoodComponent, RouterModule.forChild(InventoryRoutes)
  ],
})


export class MangageinventoryModule { }
