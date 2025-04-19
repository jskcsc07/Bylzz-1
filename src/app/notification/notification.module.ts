import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { PopupComponent } from './popup/popup.component';
import { ConfirmedeleteComponent } from './confirmedelete/confirmedelete.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,DeleteComponent,EditComponent,PopupComponent,ConfirmedeleteComponent
  ],
  exports:[CommonModule,DeleteComponent,EditComponent,PopupComponent,ConfirmedeleteComponent]
})
export class NotificationModule { }
