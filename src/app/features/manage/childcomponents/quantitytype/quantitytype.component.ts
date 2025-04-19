import { Component, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../../../Services/quantitytype.service';
import { Router } from '@angular/router';
import { Quantitytype } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { ProductService } from '../../../../Services/product.service';
import { ProductPriceService } from '../../../../Services/productprice.service';
import { NotificationModule } from '../../../../notification/notification.module';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';
@Component({
  selector: 'jsk-categorytypeform',
  templateUrl: './quantitytype.component.html',
  styleUrl: './quantitytype.component.css',
  imports: [FivecommanModule]
})
export class CategorytypeformComponent implements OnInit {
  edit() {
    this.editag = true;
    this.loadQtype();
  }
  args: any = null;
  myEditForm: FormGroup;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  productrecord: any;
  productrecord2: any
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  @ViewChild('f')
  quantitytypeViewchild!: NgForm;
  categorynamedata: any;
  categorynamedata2: any;

  quantitytypes: Quantitytype = {
    _id: '',
    name: '',
    Desc: ''
  }
  name: any;
  Desc: any;
  onFormUpdateSubmit() {
    this.Update(this.myEditForm.value);
  }
  Update(quantitytype: Quantitytype) {
    this.service.update(quantitytype).subscribe(res => {
      if (res) {
        // alert("Successfully Updated Category...");
        this.args = "Successfully Updated quantity types..." + quantitytype.name;
        this.loadQtype();

      }
    })

  }
  cDelete(_id: any) {


  }
  myAddForm: FormGroup;
  constructor(private service: QuantitytypeService, private router: Router, private formedit: FormBuilder, private productPriceservice: ProductPriceService) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      Desc: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      Desc: ['']
    });
  }
  ngOnInit(): void {
   
  }
  add(quantitytypes: Quantitytype): void {

    this.service.add(quantitytypes).subscribe(res => {
      if (res) {
        this.args = "Successfully Added quantity types..." + quantitytypes.name;
        //alert("Successfully Created quantity types...");
        this.loadQtype();
      }
    })
  }
  editag=false;
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "Desc", flex: 2 },
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
        Desc: [event.data.Desc]
      });

    }

  }

  loadQtype() {
    this.service.get().subscribe(data => {
      if (data) {
        this.categorynamedata2 = data;
        this.categorynamedata = this.categorynamedata2.allTasks


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

    this.productPriceservice.getbyidQtypid(id).subscribe(records => {
      this.productrecord2 = records;
      this.productrecord = this.productrecord2.allTasks;
      console.log(this.productrecord.length);
      console.log(records);
      if (this.productrecord.length == 0) {

        this.service.delete(id).subscribe(data => {
          if (data) {
            this.loadQtype();
            this.display = "display:none;";
            this.args = " Record Deleted Successfully ";
          }
        })
      }
      else if (this.productrecord.length > 0) {
        alert("Can't delete because there is product available.");
      }
    })


  }
}
