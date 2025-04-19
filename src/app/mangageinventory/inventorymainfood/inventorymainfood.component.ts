import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryFoodMain } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../userend/crud/deletebutton/deletbasetypebutton';
import { InventoryMainFoodService } from '../../Services/inventoryfm.service';
import { InventoryMFoodQuantityTypeService } from '../../Services/inventoryfqt.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { NotificationModule } from '../../notification/notification.module';
import { EditComponent } from '../../notification/edit/edit.component';
import { DeleteComponent } from '../../notification/delete/delete.component';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';


@Injectable({ providedIn: 'root' })


@Component({
  selector: 'jsk-inventorymainfood',
  templateUrl: './inventorymainfood.component.html',
  styleUrl: './inventorymainfood.component.css',
  imports: [FivecommanModule]
})
export class InventorymainfoodComponent implements OnInit {
edit() {
  this.loadinventoerymainfood();
  this.editag=true;
}
editag=false;
  //lodProductCategory:ProductCategory[]=[];
  args: any = null;
  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 200;
  paginationPageSizeSelector = [200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  data2: any;
  data: any;
  Inventoryfoodquntitytype2: any;
  Inventoryfoodquntitytype: any;
  productrecord: any;
  productrecord2: any;
  quantitytypename: string = "";
  _InventoryFoodMain: InventoryFoodMain = {
    name: "",
    description: "",
    quantitytypeID: "",
    quantitytypename: "",
    quantitytypevalue: 0
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "quantitytypename" },
    { field: "quantitytypevalue" },
    { field: "discription", flex: 2 },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  discription: any;
  name: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  myAddForm: FormGroup;
  constructor(private service: InventoryMainFoodService, private router: Router, private formedit: FormBuilder, private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService) {
   
    this.loadinventoerymainfood();
     this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: ['']

    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: ['']
    });
  }
  ngOnInit(): void {

    this.loadinventoerymainfood();
  }
  getqtname() {
    //alert(this.myAddForm.value.quantitytypeID);
    //this.quantitytypename = this.Inventoryfoodquntitytype.find((item: { basetype: any; }) => item.basetype === selectedValue);
    const indexP = this.Inventoryfoodquntitytype.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.quantitytypeID);
    // const index = this.Inventoryfoodquntitytype
    this.quantitytypename = this.Inventoryfoodquntitytype[indexP].name;
  }
  loadinventoeryfoodquantitytype() {
    this._InventoryMFoodQuantityTypeService.get().subscribe(data => {
      if (data) {
        this.Inventoryfoodquntitytype2 = data;
        this.Inventoryfoodquntitytype = this.Inventoryfoodquntitytype2.allTasks
        console.log(data);
        //this.search(id);

      }
    })
  }
  add(_InventoryFoodMain: InventoryFoodMain): void {
    // this.procategorry.name = this.name;
    // this.procategorry.categorydesc = this.categorydesc;
    //alert(`Category added: ${JSON.stringify(procategorry)}`); // Better alert message
    // console.log(procategorry);

    this.service.add(_InventoryFoodMain).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Added Category..." + _InventoryFoodMain.name;
        // alert("Successfully Created Category...");
        this.loadinventoerymainfood();

      }
    })
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {

      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "cate";


    }
    if (event.colDef.field == 'Edit') {
      //alert('Cell clicked'+event.colDef.field);
      //console.log('Custom function triggered with event:', event);
      this.loadinventoeryfoodquantitytype()
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.quantitytypename = event.data.quantitytypename;

      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        discription: [event.data.description],
        quantitytypeID: [event.data.quantitytypeID, Validators.required],
        quantitytypename: [event.data.quantitytypename],
        quantitytypevalue: [event.data.quantitytypevalue]

      });
    }
    // this.loadcategory();
  }

  loadinventoerymainfood() {
    this.service.get().subscribe(data => {
      if (data) {
        this.data2 = data;
        this.data = this.data2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  Update(_InventoryFoodMain: InventoryFoodMain) {
    this.service.update(_InventoryFoodMain).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Updated Category..." + _InventoryFoodMain.name;
        // alert("Successfully Updated Category..."+name);
        this.loadinventoerymainfood();

      }
    })
  }
  cDelete(_id: any) {

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }

  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.loadinventoeryfoodquantitytype();
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      this.Update(this.myEditForm.value);
    }
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

    this.service.delete(id).subscribe(data => {
      if (data) {
        this.loadinventoerymainfood();
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
        alert("Deleted.");
      }
    })



  }
}
