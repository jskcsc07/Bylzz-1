
import { Component } from "@angular/core";
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from 'ag-grid-community';
import { __param } from "tslib";

@Component({
  selector: 'jsk-delete',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent implements ICellRendererAngularComp {

  id: any;
  modal: any;
  style: any;

  agInit(params: ICellRendererParams): void {
    // this.id= params.data._id;
    // BasetypDeleteButtun.deletecontext= params;
    //console.log(params);


  }
  constructor() {

  }

  refresh(params: ICellRendererParams) {
    // params.refreshCell;
    return true;
  }

  BaseTypeDelete() {

    //document.getElementById("demo").innerHTML = text;
  }

}



