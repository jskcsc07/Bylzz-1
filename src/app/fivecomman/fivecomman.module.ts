import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notification/notification.module';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);


@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, AgGridAngular, AgGridModule,
    FormsModule, NotificationModule
  ],
  exports: [CommonModule, ReactiveFormsModule, AgGridAngular, AgGridModule,
    FormsModule, NotificationModule]
})
export class FivecommanModule { }
