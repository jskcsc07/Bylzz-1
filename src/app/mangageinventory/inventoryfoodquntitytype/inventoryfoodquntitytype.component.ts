import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryFoodQuantityType } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../userend/crud/deletebutton/deletbasetypebutton';
import { InventoryMFoodQuantityTypeService } from '../../Services/inventoryfqt.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { NotificationModule } from '../../notification/notification.module';
import { DeleteComponent } from '../../notification/delete/delete.component';
import { EditComponent } from '../../notification/edit/edit.component';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';
import { faL } from '@fortawesome/free-solid-svg-icons';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'jsk-inventoryfoodquntitytype',
  templateUrl: './inventoryfoodquntitytype.component.html',
  styleUrl: './inventoryfoodquntitytype.component.css',
  imports: [FivecommanModule]
})
export class InventoryfoodquntitytypeComponent implements OnInit {
edit() {
  this.loadinventoeryfoodquantitytype();
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
  productrecord: any;
  productrecord2: any;
  _InventoryFoodQuantityType: InventoryFoodQuantityType = {
    name: "",
    discription: ""
  };
  colDefs: ColDef[] = [
    { field: "name" },
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
  constructor(private service: InventoryMFoodQuantityTypeService, private router: Router, private formedit: FormBuilder) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      discription: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      discription: ['']
    });
  }
  ngOnInit(): void {
    this.loadinventoeryfoodquantitytype();
  }

  add(_InventoryFoodQuantityType: InventoryFoodQuantityType): void {
    // this.procategorry.name = this.name;
    // this.procategorry.categorydesc = this.categorydesc;
    //alert(`Category added: ${JSON.stringify(procategorry)}`); // Better alert message
    // console.log(procategorry);

    this.service.add(_InventoryFoodQuantityType).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Added Category..." + _InventoryFoodQuantityType.name;
        // alert("Successfully Created Category...");
        this.loadinventoeryfoodquantitytype();

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
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        categorydesc: [event.data.categorydesc]

      });
    }
    // this.loadcategory();
  }

  loadinventoeryfoodquantitytype() {
    this.service.get().subscribe(data => {
      if (data) {
        this.data2 = data;
        this.data = this.data2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  Update(_InventoryFoodQuantityType: InventoryFoodQuantityType) {
    this.service.update(_InventoryFoodQuantityType).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Updated Category..." + _InventoryFoodQuantityType.name;
        // alert("Successfully Updated Category..."+name);
        this.loadinventoeryfoodquantitytype();

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
        this.loadinventoeryfoodquantitytype();
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
        alert("Deleted.");
      }
    })



  }
}
