import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DineRoutes } from './dine.routes';
import { RouterModule } from '@angular/router';
import { ChairComponent } from './chair/chair.component';
import { DineComponent } from './dine/dine.component';
import { FloorComponent } from './floor/floor.component';



@NgModule({
  declarations: [],
  imports: [ChairComponent, DineComponent, FloorComponent,
    CommonModule, RouterModule.forChild(DineRoutes)
  ]
})
export class ManagedineModule { }
