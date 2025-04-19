import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../Services/quantitytype.service';
import { Router, RouterLink } from '@angular/router';
import { IDine } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../userend/crud/deletebutton/deletbasetypebutton';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { DineService } from '../../Services/dine.service';
import { FloorService } from '../../Services/floor.service';
import { DeleteComponent } from '../../notification/delete/delete.component';
import { EditComponent } from '../../notification/edit/edit.component';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';
import { faL } from '@fortawesome/free-solid-svg-icons';
// import { ShowbuttonComponent } from '../../showbutton/showbutton.component';

@Component({
  selector: 'jsk-dine',
  imports: [FivecommanModule],
  templateUrl: './dine.component.html',
  styleUrl: './dine.component.css'
})
@Injectable({ providedIn: 'root' })
export class DineComponent implements OnInit, ICellRendererAngularComp {
edit() {
  this.loaddine();
  this.editag=true;
}
editag=false;
  args: any = null;
  myEditForm: FormGroup;
  qid: any;
  id: any; basedata: any;
  popdata2: any;
  popdataId: any;
  popdataBasetypedesc: any;
  popdataBasetypeName: any;
  popdataQuntityId: any;
  src: any;
  alt: any;
  content: any;
  classname: any;
  style: any;
  modal: any;
  display: any;
  id01: any;
  valueid: any;
  tablename: any;
  isCheckedStatus: any = true;
  myAddForm: FormGroup;
  qrData: any;
  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  dinerow: IDine[] = [];
  pagination = true;
  paginationPageSize = 200;
  paginationPageSizeSelector = [200, 500, 1000];


  colDefs: ColDef[] = [
    { field: "name" },
    { field: "description", flex: 2 },
    //{ field: "QR code",cellRenderer:ShowbuttonComponent},
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: ''
  }
  Floordata2: any;
  Floordata: any
  dinenamedata: any;
  dinenamedata2: any
  dinedata2: any;
  dinedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  showQr = false;
  constructor(private service: DineService, private QuantitytypeService_: QuantitytypeService, private router: Router, private formedit: FormBuilder, private floorservice: FloorService) {
    this.loadfloor(); this.loaddine2();
    this.display = "display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true, [Validators.required]],
      floor_id: ['']
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      description: [''],
      status: [true, [Validators.required]],
      floor_id: ['']
    });
    //  this.loadbasetype();
   
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  loadfloor() {
    //alert(selectcategoryID);
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.allTasks

      }
    })
  }
  loaddine() {
    //alert(selectcategoryID);
    this.service.getbyid(this.myAddForm.value._id).subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.allTasks

      }
    })
  }
  loaddine2() {
    //alert(selectcategoryID);
    this.service.get().subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.allTasks
        console.log(this.dinedata);
      }
    })
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'QR code') {
      this.showQr = true;
      this.qrData = event.data._id + " " + event.data.name;
    }
    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "dine";
      // alert(this.valueid);
      //    if(PopupmodelComponent.delete==true)
      //    {
      // this.service.delete(event.data._id).subscribe(res => {
      //   alert("Successfully Delete BaseType...");
      //     // this.args="Successfully Deleted "+event.data.Basetypename;
      //    })
      //    }


    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description, [Validators.required]],
        status: [event.data.status, [Validators.required]],
        floor_id: [event.data.floor_id, [Validators.required]]
      });

    }
    this.loaddine2();
  }

  ngOnInit(): void {
    
    this.classname = "";
    this.loaddine2();
  }


  add(dine: IDine): void {

    this.service.add(dine).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.args = "Record Added succefully..." + dine.name;
        // alert("Basetype inserted succefully.");
        // this.loadbasetype()
        this.loaddine2();
      }
    })

  }



  Update(dine: IDine) {
    //alert(basetype._id);
    this.service.update(dine).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + dine.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        this.loaddine2();
      }
    })
  }
  cDelete(_id: any) {
    //this.loadbasetype();
    this.loaddine2();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      this.Update(this.myEditForm.value);
    }
  }


  //show addbasetype
  show: any = false;
  showEdit: any = false;
  shows() {
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
    this.loadfloor();
    
  }
  close() {
    //alert(arg0)showQr
    if (this.showQr == true) {
      this.showQr = false;
    }
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }

  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(id: any) {
    this.service.delete(id).subscribe(res => {
      if (res) {
        this.display = "display:none;";
        this.loaddine2();
        this.args = " Record Deleted Successfully ";
      }
    })
  }




}