
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paybymanage } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { PaybyService } from '../../../../Services/paybymanage.service';
import { NotificationModule } from '../../../../notification/notification.module';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';

@Component({
  selector: 'jsk-paybymanage',
  templateUrl: './paybymanage.component.html',
  styleUrl: './paybymanage.component.css',
  imports: [FivecommanModule],
})


@Injectable({ providedIn: 'root' })
export class PaybymanageComponent implements OnInit {
  editag = false;
  edit() {
    this.editag = true;
    this.loadpayby();
  }
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
  Paybydata2: any;
  Paybydata: any;
  productrecord: any;
  productrecord2: any;
  pyabymanage: Paybymanage = {
    Paybyname: 'undefined',
    desc: 'undefined'
  };
  colDefs: ColDef[] = [
    { field: "Paybyname" },
    { field: "desc", flex: 2 },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  categorydesc: any;
  name: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  myAddForm: FormGroup;
  constructor(private service: PaybyService, private router: Router, private formedit: FormBuilder) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({

      Paybyname: ['', Validators.required],
      desc: ['']
    });
    this.myAddForm = this.formedit.group({
      Paybyname: ['', Validators.required],
      desc: ['']
    });
  }
  ngOnInit(): void {
    this.loadpayby();
  }

  add(paybymanage: Paybymanage): void {
    // this.procategorry.name = this.name;
    // this.procategorry.categorydesc = this.categorydesc;
    //alert(`Category added: ${JSON.stringify(procategorry)}`); // Better alert message
    // console.log(procategorry);

    this.service.add(paybymanage).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Added ..." + paybymanage.Paybyname;
        // alert("Successfully Created Category...");
        this.loadpayby();

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
        Paybyname: [event.data.Paybyname, Validators.required],
        desc: [event.data.desc]

      });
    }
    // this.loadpayby();
  }

  loadpayby() {
    this.service.get().subscribe(data => {
      if (data) {
        this.Paybydata2 = data;
        this.Paybydata = this.Paybydata2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  Update(paybymanage: Paybymanage) {
    this.service.update(paybymanage).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Updated ..." + paybymanage.Paybyname;
        // alert("Successfully Updated Category..."+name);
        this.loadpayby();

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
        this.loadpayby();
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
        alert("Deleted.");
      }
    })
  }
}

