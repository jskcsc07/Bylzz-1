import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../Services/product.service';
import { BaseTypeService } from '../../../../Services/basetype.service';
import { CategoryService } from '../../../../Services/category.service';
import { QuantitytypeService } from '../../../../Services/quantitytype.service';
import { Router } from '@angular/router';
import { Products } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { NotificationModule } from '../../../../notification/notification.module';
import { CommonModule } from '@angular/common';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';
@Component({
  selector: 'jsk-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [FivecommanModule],

})
@Injectable({ providedIn: 'root' })
export class ProductComponent implements OnInit {
edit() {
  this.editag=true;
  this.loadProducts();
}
editag=false;
  isChecked = false;
  args: any = null;
  myEditForm: FormGroup;

  @ViewChild('f')
  productsViewchild!: NgForm;

  categorynamedata: any;
  categorynamedata2: any
  basetypedata2: any;
  basetypedata: any;
  Qtypenamedata: any;
  Qtypenamedata2: any
  Productnamedata: any;
  Productnamedata2: any;
  products: Products = {
    _id: '',
    Productname: '',
    Productdesc: '',
    selectcategoryID: '',
    selectQtypeID: '',
    selectBaseTypeID: '',
    availablity: true,
    veg_nonveg: false,
    Status: true
  }
  Productname: any;
  Productdesc: any;
  selectcategoryID: any;
  selectQtypeID: any;
  selectBaseTypeID: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  myAddForm: FormGroup;
  isCheckedveg_nonveg: any = false;
  isCheckedavailablity: any = true;
  isCheckedStatus: any = true;
  constructor(private service: ProductService, private QuantitytypeService_: QuantitytypeService, private CategoryService_: CategoryService, private basetypeservice: BaseTypeService, private router: Router, private formedit: FormBuilder) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      Productname: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectBaseTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true]
    });
    this.myAddForm = this.formedit.group({
      Productname: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectBaseTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true]
    });
  }
  ngOnInit(): void {
    this.loadcategory()
    this.loadQtype()
    this.loadProducts();
  }
  loadcategory() {
    this.CategoryService_.get().subscribe(data => {
      if (data) {
        this.categorynamedata2 = data;
        this.categorynamedata = this.categorynamedata2.allTasks
        //  console.log(data);
        //  //this.search(id);

      }
    })
  }

  loadbasetype() {
    //alert(selectcategoryID);
    this.basetypeservice.getbyid(this.myAddForm.value.selectQtypeID).subscribe(data => {
      if (data) {
        this.basetypedata2 = data;
        this.basetypedata = this.basetypedata2.allTasks

      }
    })
  }
  loadbasetype2() {


    this.basetypeservice.getbyid(this.myEditForm.value.selectQtypeID).subscribe(data => {
      if (data) {

        this.basetypedata2 = data;
        this.basetypedata = this.basetypedata2.allTasks

      }
    })
  }

  loadQtype() {
    this.QuantitytypeService_.get().subscribe(data => {
      if (data) {
        this.Qtypenamedata2 = data;
        this.Qtypenamedata = this.Qtypenamedata2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  loadProducts() {
    this.service.get().subscribe(data => {
      if (data) {
        this.Productnamedata2 = data;
        this.Productnamedata = this.Productnamedata2.allTasks
        // console.log(data);
        //this.search(id);

      }
    })
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
    console.log(this.myAddForm.value);
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      this.Update(this.myEditForm.value);
    }
    //console.log(this.myEditForm.value);
  }
  add(products: Products): void {
    console.log(products);
    console.log(products.Productname);
    this.service.getbyname(products.Productname).subscribe(data => {
      this.Productnamedata2 = data;
      this.Productnamedata = this.Productnamedata2.allTasks
      if (this.Productnamedata.length == 0) {
        this.service.post(products).subscribe(data2 => {
          if (data2) {
            this.args = "Product Added successfully..." + products.Productname;
            this.loadProducts();
          }
        })

      }
      else if (this.Productnamedata.length > 0) {
        this.args = "Item already exist and add another Item " + products.Productname;
      }
    })

  }
  Update(product: Products) {
    this.service.update(product).subscribe(res => {
      if (res) {
        //this.search(id);
        // alert("Successfully Updated Product...");
        this.args = null;
        this.args = "Product Updated successfully..." + product.Productname;
        this.loadProducts();

      }
    })
  }
  cDelete(_id: any) {

  }

  colDefs: ColDef[] = [
    { field: "Productname" },
    { field: "Productdesc", flex: 2 },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  pagination = true;
  paginationPageSize = 200;
  paginationPageSizeSelector = [200, 500, 1000];
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      alert("working body");
      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "prod";

      // this.service.delete(event.data._id).subscribe(res => {
      //   if (res) {
      //     //this.search(id);
      //     alert("Successfully Delete Category...");
      //     this.loadProducts();
      //   }
      // })

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.args = null;

      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        Productname: [event.data.Productname, Validators.required],
        Productdesc: [event.data.Productdesc],
        selectcategoryID: [event.data.selectcategoryID, [Validators.required]],
        selectQtypeID: [event.data.selectQtypeID, [Validators.required]],
        selectBaseTypeID: [event.data.selectBaseTypeID, [Validators.required]],
        availablity: [event.data.availablity],
        veg_nonveg: [event.data.veg_nonveg],
        Status: [event.data.Status]
      });
      this.loadbasetype()

      this.showEdit = true;
      this.show = false;
    }

  }
  show: any = false;
  showEdit: any = false;
  shows() {
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

    this.service.delete(id).subscribe(data => {
      if (data) {
        this.loadProducts();
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
      }
    })
  }
}
