import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
// import { QuantitytypeService } from '../../../../Services/quantitytype.service';
import { Router } from '@angular/router';
import { Floor } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
// import { PopupmodelComponent } from '../../popupmodel/popupmodel.component';
import { FloorService } from '../../Services/floor.service';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../../notification/notification.module';
import { DeleteComponent } from '../../notification/delete/delete.component';
import { EditComponent } from '../../notification/edit/edit.component';
import { ManagedineModule } from '../managedine.module';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';

@Component({
  selector: 'jsk-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css',
  imports: [FivecommanModule],
})
@Injectable({ providedIn: 'root' })
export class FloorComponent implements OnInit, ICellRendererAngularComp {
edit() {
  this.loadfloor();
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

  isCheckedStatus: any = true;
  myAddForm: FormGroup;


  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  floors: Floor[] = [];
  pagination = true;
  paginationPageSize = 50;
  paginationPageSizeSelector = [50, 500, 1000];


  colDefs: ColDef[] = [
    { field: "name" },
    { field: "description", flex: 2 },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  floor: Floor = {
    id: "",
    name: "",
    description: '',
    status: true

  }

  Floornamedata: any;
  Floornamedata2: any
  Floordata2: any;
  Floordata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private floorservice: FloorService, private router: Router, private formedit: FormBuilder) {

    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true]
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      description: [''],
      status: [true]
    });
    //  this.loadbasetype();
    this.loadfloor();
  }
  ngOnInit(): void {
    // this.loaddine2();
    this.classname = "";
    this.loadfloor();

  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }



  // loaddine2()
  // {
  // //alert(selectcategoryID);
  // this.floorservice.get().subscribe(data => {
  // if (data) {
  //  this.dinedata2=data;
  //  this.dinedata=this.dinedata2.allTasks

  // }
  // })
  // }
  loadfloor() {
    //alert(selectcategoryID);
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.allTasks

      }
    })
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;

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
      //  this.loaddine2();
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description],
        status: [event.data.status, [Validators.required]]
      });

    }
    this.loadfloor();
  }



  add(floor: Floor): void {

    this.floorservice.add(floor).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.args = "Record Added succefully..." + floor.name;
        // alert("Basetype inserted succefully.");
        // this.loadbasetype()
        this.loadfloor();
      }
    })

  }



  Update(floor: Floor) {
    alert("works.");
    this.floorservice.update(floor).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + floor.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        this.loadfloor();
      }
    })
  }
  cDelete(_id: any) {
    //this.loadbasetype();
    this.loadfloor();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    console.log(this.myEditForm.value);
    if (this.myEditForm.valid) {
      console.log(this.myEditForm.value);
      console.log(this.myEditForm.value);
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
  }
  close() {
    //alert(arg0)
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
    this.floorservice.delete(id).subscribe(res => {
      if (res) {
        this.display = "display:none;";
        this.loadfloor();
        this.args = " Record Deleted Successfully ";
      }
    })
  }




}