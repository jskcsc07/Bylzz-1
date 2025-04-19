import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tax } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { TaxService } from '../../../../Services/tax.service';
import { NotificationModule } from '../../../../notification/notification.module';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';
@Component({
  selector: 'jsk-tax',
  standalone: true,
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.css',
  imports: [FivecommanModule]
})
export class TaxComponent implements OnInit {
edit() {
  this.loadTax();
  this.editag=true;
}
editag=false;
  args: any = null;
  myEditForm: FormGroup;
  popdata2: any;
  display: any;
  tablename: any = "qtyp";
  valueid: any;
  modal: any;
  taxnamedata: any;
  taxnamedata2: any;
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  @ViewChild('f')
  quantitytypeViewchild!: NgForm;
  categorynamedata: any;
  categorynamedata2: any;

  Tax: Tax = {
    _id: '',
    name: '',
    Description: '',
    perscentRate: 0,
    Status: true

  }
  name: any;
  Desc: any;
  onFormUpdateSubmit() {
    this.Update(this.myEditForm.value);
  }
  Update(Tax: Tax) {
    this.service.update(Tax).subscribe(res => {
      if (res) {
        // alert("Successfully Updated Category...");
        this.args = "Successfully Updated quantity types..." + Tax.name;
        this.loadTax();

      }
    })

  }
  cDelete(_id: any) {


  }
  myAddForm: FormGroup;
  constructor(private service: TaxService, private router: Router, private formedit: FormBuilder) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      Description: [''],
      perscentRate: [0, Validators.required],
      Status: [true, Validators.required]
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      Description: [''],
      perscentRate: [0, Validators.required],
      Status: [true, Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadTax();
  }
  add(Tax: Tax): void {

    this.service.add(Tax).subscribe(res => {
      if (res) {
        this.args = "Successfully Added quantity types..." + Tax.name;
        //alert("Successfully Created quantity types...");
        this.loadTax();
      }
    })
  }

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "Description" },
    { field: "perscentRate" },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  pagination = true;
  paginationPageSize = 200;
  paginationPageSizeSelector = [200, 500, 1000];
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "qtyp";
      // this.service.delete(event.data._id).subscribe(res => {
      //   if (res) {
      //     alert("Successfully Delete Category...");
      //     this.loadQtype();

      //   }
      // })

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        Description: [event.data.Description],
        perscentRate: [event.data.perscentRate, Validators.required],
        Status: [event.data.Status, Validators.required]
      });

    }

  }

  loadTax() {
    this.service.get().subscribe(taxdata => {
      if (taxdata) {
        this.taxnamedata2 = taxdata;
        this.taxnamedata = this.taxnamedata2.allTasks


      }
    })
  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
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
        this.loadTax();
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
      }
    })
  }
}

