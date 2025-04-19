import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../Services/category.service';
import { ProductCategory, Quantitytype } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { ProductService } from '../../../../Services/product.service';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../../../../notification/notification.module';
import { AgGridAngular } from 'ag-grid-angular';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';

@Component({
  selector: 'jsk-category',
  imports: [FivecommanModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  edit() {
    this.editag = true;
    this.loadcategory()
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
  categorynamedata2: any;
  categorynamedata: any;
  productrecord: any;
  productrecord2: any;
  procategorry: ProductCategory = {
    _id: '',
    name: '', categorydesc: '',
    createdAt: ''
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "categorydesc", flex: 2 },
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
  editag = false;
  constructor(private service: CategoryService, private router: Router, private formedit: FormBuilder, private productservice: ProductService) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      categorydesc: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      categorydesc: ['']
    });
  }
  ngOnInit(): void {
    this.loadcategory();
  }

  add(procategorry: ProductCategory): void {
    // this.procategorry.name = this.name;
    // this.procategorry.categorydesc = this.categorydesc;
    //alert(`Category added: ${JSON.stringify(procategorry)}`); // Better alert message
    // console.log(procategorry);

    this.service.add(procategorry).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Added Category..." + procategorry.name;
        // alert("Successfully Created Category...");
        this.loadcategory();

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

  loadcategory() {
    this.service.get().subscribe(data => {
      if (data) {
        this.categorynamedata2 = data;
        this.categorynamedata = this.categorynamedata2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  Update(productcategory: ProductCategory) {
    this.service.update(productcategory).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Updated Category..." + productcategory.name;
        // alert("Successfully Updated Category..."+name);
        this.loadcategory();

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
    this.productservice.getbycategoryid(id).subscribe(records => {
      this.productrecord2 = records;
      this.productrecord = this.productrecord2.allTasks;
      if (this.productrecord.length == 0) {
        this.service.delete(id).subscribe(data => {
          if (data) {
            this.loadcategory();
            this.display = "display:none;";
            this.args = " Record Deleted Successfully ";
            alert("Deleted.");
          }
        })
      }
      else if (this.productrecord.length > 0) {
        alert("Can't delete because there is product available.");
      }
    }
    )

  }
}
