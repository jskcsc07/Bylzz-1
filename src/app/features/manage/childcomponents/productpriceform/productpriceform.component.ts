import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPriceService } from '../../../../Services/productprice.service';
import { BaseTypeService } from '../../../../Services/basetype.service';
import { CategoryService } from '../../../../Services/category.service';
import { QuantitytypeService } from '../../../../Services/quantitytype.service';
import { ProductService } from '../../../../Services/product.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ProductPrice, ProductPriceAllName, ProductPriceDetails, Products } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { NotificationModule } from '../../../../notification/notification.module';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';
@Component({
  selector: 'jsk-productpriceform',
  templateUrl: './productpriceform.component.html',
  styleUrl: './productpriceform.component.css',
  imports: [FivecommanModule]
})
export class ProductpriceformComponent implements OnInit {
edit() {
  
  this.refresh();
  this.editag=true;
}
editag=false;
  args: any = null;
  myEditForm: FormGroup;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  basetypedataName2: any;
  basetypedataName: any;

  @ViewChild('f')
  ProductPriceViewchild!: NgForm;
  categorynamedata: any;
  categorynamedata2: any
  basetypedata2: any;
  basetypedata: any;
  _basetypedata2: any;
  _basetypedata: any;
  Qtypenamedata: any;
  Qtypenamedata2: any
  Productnamedata: any;
  Productnamedata2: any;
  ProductPricedata: any;
  ProductPricedata2: any;
  ppdata: any;
  ppdata2: any;
  productprices: ProductPrice =
    {
      _id: '',
      ProductPrice: 100,
      SelectProductId: '',
      selectcategoryID: '',
      selectQtypeID: '',
      selectBaseTypeID: ''
    }
  SelectProductId: any;
  selectcategoryID: any;
  selectQtypeID: any;
  selectBaseTypeID: any;
  ProductPrice: any;
  colDefs: ColDef[] = [
    { field: "ProductPrice" },
    { field: "ProductName" },
    { field: "categoryName" },
    { field: "QtypeName" },
    { field: "Basetypename" },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  myAddForm: FormGroup;
  productpriceallname: ProductPriceDetails[] = [];
  constructor(private service: ProductPriceService, private ProductService_: ProductService, private QuantitytypeService_: QuantitytypeService, private CategoryService_: CategoryService, private BaseTypeService_: BaseTypeService, private router: Router, private formedit: FormBuilder) {
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      ProductPrice: ['', Validators.required],
      SelectProductId: ['', [Validators.required]],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectBaseTypeID: ['', [Validators.required]]
    });
    this.myAddForm = this.formedit.group({
      ProductPrice: ['', Validators.required],
      SelectProductId: ['', [Validators.required]],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectBaseTypeID: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.refresh();
   
  }
  refresh() {
    this.loadbasetypeName();
    this.loadcategory();
    this.loadQtype();
    this.loadProducts();
    this.loadpp();
  }
  prodata: any;
  Productname2: any;
  Productname: any;
  loadProducts2() {
    //alert(this.myAddForm.value.SelectProductId);
    this.ProductService_.getbyid(this.myAddForm.value.SelectProductId).subscribe(data => {
      if (data) {
        this.Productname2 = "";
        this.Productname = "";
        this.Productname2 = data;
        this.Productname = this.Productname2.allTasks
        this.prodata = this.Productname;
        this.loadbasetype(this.prodata[0].selectQtypeID);
        this.myAddForm = this.formedit.group({
          ProductPrice: [0, Validators.required],
          SelectProductId: [this.prodata[0]._id, [Validators.required]],
          selectcategoryID: [this.prodata[0].selectcategoryID, [Validators.required]],
          selectQtypeID: [this.prodata[0].selectQtypeID, [Validators.required]],
          selectBaseTypeID: [this.prodata[0].selectBaseTypeID, [Validators.required]]
        });
        alert(this.prodata[0].Productname);
        console.log(this.prodata);
        //this.search(id);

      }
    })
  }
  loadProducts() {
    this.ProductService_.get().subscribe(data => {
      if (data) {
        this.Productnamedata2 = data;
        this.Productnamedata = this.Productnamedata2.allTasks
        // console.log(data);
        //this.search(id);
      }
    })
  }
  loadcategory() {
    this.CategoryService_.get().subscribe(data => {
      if (data) {
        this.categorynamedata2 = data;
        this.categorynamedata = this.categorynamedata2.allTasks
      }
    })
  }
  loadbasetype(selectcategoryID: any) {

    this.BaseTypeService_.getbyid(selectcategoryID).subscribe(data => {
      // alert(selectcategoryID)
      if (data) {
        this._basetypedata2 = data;
        this._basetypedata = this._basetypedata2.allTasks

      }
    })
  }
  loadbasetype2() {
    this.BaseTypeService_.getbyid(this.myEditForm.value.selectQtypeID).subscribe(data => {
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
      }
    })
  }
  loadbasetypeName() {
    this.BaseTypeService_.get().subscribe(data => {
      if (data) {
        this.basetypedata2 = data;
        this.basetypedata = this.basetypedata2.allTasks
      }
    })

  }
  ppname: any[] = [];
  loadpp() {
    this.service.get().subscribe(data => {
      if (data) {
        this.ppdata2 = data;
        this.ppdata = this.ppdata2.allTasks;
        this.loadproductpricename();
      }
    })
  }
  loadproductpricename() {

    for (var ii = 0; ii < this.ppdata.length; ii++) {
      this.productpriceallname.push({
        _id: this.ppdata[ii]._id,
        ProductPrice: this.ppdata[ii].ProductPrice,
        ProductName: this.getproductname(this.ppdata[ii].SelectProductId),
        categoryName: this.getcategoryname(this.ppdata[ii].selectcategoryID),
        QtypeName: this.getqtypnamename(this.ppdata[ii].selectQtypeID),
        Basetypename: this.getbasetypename(this.ppdata[ii].selectBaseTypeID),
        SelectProductId: this.ppdata[ii].SelectProductId,
        selectcategoryID: this.ppdata[ii].selectcategoryID,
        selectQtypeID: this.ppdata[ii].selectQtypeID,
        selectBaseTypeID: this.ppdata[ii].selectBaseTypeID,
        quntityvalue: 0
      })
    }
    this.ppname = this.productpriceallname;

  }
  getproductname(id: string) {
    const itemP = this.Productnamedata.find((item: { _id: string; }) => item._id === id);
    const indexP = this.Productnamedata.findIndex((item: { _id: string; }) => item._id === id);

    if (itemP._id) {
      return this.Productnamedata[indexP].Productname;

    }

  }
  getqtypnamename(id: string) {
    const itemP = this.Qtypenamedata.find((item: { _id: string; }) => item._id === id);
    const indexP = this.Qtypenamedata.findIndex((item: { _id: string; }) => item._id === id);

    if (itemP._id) {
      return this.Qtypenamedata[indexP].name;
    }

  }
  getcategoryname(id: string) {
    const itemP = this.categorynamedata.find((item: { _id: string; }) => item._id === id);
    const indexP = this.categorynamedata.findIndex((item: { _id: string; }) => item._id === id);

    if (itemP._id) {
      return this.categorynamedata[indexP].name;
    }

  }
  basname: any;
  basname2: any;

  getbasetypename(id: string) {
    const itemP = this.basetypedata.find((item: { _id: string; }) => item._id === id);
    const indexP = this.basetypedata.findIndex((item: { _id: string; }) => item._id === id);

    if (itemP._id) {
      return this.basetypedata[indexP].Basetypename;
    }

  }
  add(productprices: ProductPrice) {
    //productprices.selectcategoryID,productprices.selectQtypeID,
    // this.service.getbyid(productprices.SelectProductId,productprices.selectBaseTypeID,productprices.selectQtypeID,productprices.selectcategoryID).subscribe(data => {
    //   // alert(selectcategoryID)
    //    if (data) {
    //     alert("there is alredy exist data.");     
    //    }
    //    else
    //    {

    //    }
    //  })
    this.service.post(productprices).subscribe(data => {
      if (data) {
        this.args = "Product Price Added successfully..." + productprices.ProductPrice;
        this.productpriceallname = [];
        this.ppname = [];
        this.refresh();
      }
    })

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }

  }
  onFormUpdateSubmit() {
    this.Update(this.myEditForm.value);
  }
  Update(productprice: ProductPrice) {
    this.service.update(productprice).subscribe(data => {
      if (data) {
        this.args = null;
        this.args = "Product Price Update successfully..." + productprice.ProductPrice;
        this.productpriceallname = [];
        this.ppname = [];
        this.refresh();
      }
    })

  }
  pagination = true;
  paginationPageSize = 200;
  paginationPageSizeSelector = [200, 500, 1000];
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;";
      this.valueid = event.data._id;
      this.tablename = "prodpric";

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.loadbasetype(event.data.selectQtypeID);
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        ProductPrice: [event.data.ProductPrice, Validators.required],
        SelectProductId: [event.data.SelectProductId, [Validators.required]],
        selectcategoryID: [event.data.selectcategoryID, [Validators.required]],
        selectQtypeID: [event.data.selectQtypeID, [Validators.required]],
        selectBaseTypeID: [event.data.selectBaseTypeID, [Validators.required]]

      });

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
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
        this.productpriceallname = [];
        this.ppname = [];
        this.refresh();
      }
    })
  }
}
