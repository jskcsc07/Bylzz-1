import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryFoodwithProduct, Goodscollection, InventoryFoodwithProduct2, GoodscollectionMergename, InventoryFoodwithProductforEdit } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { InventoryMainFoodwithProductService } from '../../Services/inventorymainfoodwithproduct';
import { InventoryMFoodQuantityTypeService } from '../../Services/inventoryfqt.service';
import { ProductPriceService } from '../../Services/productprice.service';
import { ProductService } from '../../Services/product.service';
import { BaseTypeService } from '../../Services/basetype.service';
import { InventoryMainFoodService } from '../../Services/inventoryfm.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
// import { BasetypEditButtun } from '../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../userend/crud/deletebutton/deletbasetypebutton';
import { NotificationModule } from '../../notification/notification.module';
import { DeleteComponent } from '../../notification/delete/delete.component';
import { EditComponent } from '../../notification/edit/edit.component';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'jsk-inventoryfood',
  templateUrl: './inventoryfood.component.html',
  styleUrl: './inventoryfood.component.css',
  imports: [FivecommanModule]
})
export class InventoryfoodComponent implements OnInit {
edit() {
  this.loadinventoerymainfood();
  this.editag=true;
}
editag=false;
  deleterawitems(arg0: String) {
    const index = this._GoodscollectionMergename_List.findIndex(item => item.IventoryFoodMainId === arg0);
    this._GoodscollectionMergename_List.splice(index, 1);
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
  fooddata2: any;
  fooddata: any;
  Inventoryfoodquntitytype2: any;
  Inventoryfoodquntitytype: any;
  productrecord: any;
  productrecord2: any;
  productprice_basetypevice_data: any;
  productprice_basetypevice_data2: any;
  quantitytypename: string = "";
  getinventoryfoodmain_id: any = "";
  _Goodscollection_List: Goodscollection[] = [];
  _GoodscollectionMergename_List: GoodscollectionMergename[] = [];
  _Goodscollection: Goodscollection = {
    IventoryFoodMainId: "",
    quantiyval: 0
  }
  _GoodscollectionMergename: GoodscollectionMergename = {
    IventoryFoodMainId: "",
    Name: "",
    quantiyval: 0
  }
  _InventoryFoodwithProduct2List: InventoryFoodwithProduct2[] = [];
  _InventoryFoodwithProduct2: InventoryFoodwithProduct2 = {
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    Basetypeid: "",
    Basetypename: ""
  };
  _InventoryFoodwithProduct: InventoryFoodwithProduct = {
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    Basetypeid: "",
    Basetypename: "",
    goodscollections: this._GoodscollectionMergename_List
  };
  _InventoryFoodwithProductforEdit: InventoryFoodwithProductforEdit = {
    _id: "",
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    Basetypeid: "",
    Basetypename: "",
    goodscollections: this._GoodscollectionMergename_List
  };
  colDefs: ColDef[] = [
    { field: "ProductName" },
    { field: "Basetypename" },
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
  ppdata2: any;
  ppdata: any;
  inventoryfoodmaindata: any;
  inventoryfoodmaindata2: any;
  productdata: any;
  productdata2: any;
  basetypedata: any;
  basetypedata2: any;
  showubelements: boolean = false;
  myAddForm: FormGroup;
  constructor(private service: InventoryMainFoodwithProductService, private router: Router, private formedit: FormBuilder, private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService, private ppservice: ProductPriceService, private productservice: ProductService, private basetypeservice: BaseTypeService, private inventoryfoodmainservice: InventoryMainFoodService) {
    // this.getinventoryfoodmain_id="";
    this.display = "display:none;"
    this.showubelements = false;
    this.myEditForm = this.formedit.group({
      _id: [''],
      quantitytypevalue: [''],
      ProductId: [''],
      ProductPrcieId: [''],
      ProductName: [''],
      Basetypeid: [''],
      Basetypename: ['', Validators.required],
      goodscollections: ['']

    });
    this.myAddForm = this.formedit.group({

      Basetypeid: [''],
      inventoryfoodmain_id: [''],
      ProductId: [''],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: ['']
    });
  }
  ngOnInit(): void {
    this.getAllInventoryFoodMain();
    this.getbasetypetable();
    this.getproductpricetable();
    this.getproducttable();
    this.initializenameinproductpricetable();
    this.loadinventoerymainfood();
  }
  getAllInventoryFoodMain() {
    this.inventoryfoodmainservice.get().subscribe(data => {
      if (data) {
        this.inventoryfoodmaindata2 = data;
        this.inventoryfoodmaindata = this.inventoryfoodmaindata2.allTasks;
      }
    });
  }
  getppandbasetypedetail() {
    //alert(this.myAddForm.value.ProductId);
    this.ppservice.getbyproductid(this.myAddForm.value.ProductId).subscribe(data => {
      if (data) {
        console.log(data);
        this.productprice_basetypevice_data2 = data;
        this.productprice_basetypevice_data = this.productprice_basetypevice_data2.allTasks;
        this._InventoryFoodwithProduct2List = [];

        const productindex = this.productdata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.ProductId);
        // alert(productindex);
        for (var ii = 0; ii < this.productprice_basetypevice_data.length; ii++) {
          const basetypeindex = this.basetypedata.findIndex((item: { _id: any; }) => item._id === this.productprice_basetypevice_data[ii].selectBaseTypeID);
          //alert(basetypeindex);
          this._InventoryFoodwithProduct2List.push({
            ProductId: this.myAddForm.value.ProductId,
            ProductPrcieId: this.productprice_basetypevice_data[ii]._id,
            ProductName: this.productdata[productindex].Productname,
            Basetypeid: this.productprice_basetypevice_data[ii].selectBaseTypeID,
            Basetypename: this.basetypedata[basetypeindex].Basetypename
          });
        }
        console.log(this._InventoryFoodwithProduct2List)
      }

    })
  }
  getbasetypeforedit(ProductId: any) {
    this.ppservice.getbyproductid(ProductId).subscribe(data => {
      if (data) {
        console.log(data);
        this.productprice_basetypevice_data2 = data;
        this.productprice_basetypevice_data = this.productprice_basetypevice_data2.allTasks;
        this._InventoryFoodwithProduct2List = [];

        const productindex = this.productdata.findIndex((item: { _id: any; }) => item._id === ProductId);
        // alert(productindex);
        for (var ii = 0; ii < this.productprice_basetypevice_data.length; ii++) {
          const basetypeindex = this.basetypedata.findIndex((item: { _id: any; }) => item._id === this.productprice_basetypevice_data[ii].selectBaseTypeID);
          //alert(basetypeindex);
          this._InventoryFoodwithProduct2List.push({
            ProductId: ProductId,
            ProductPrcieId: this.productprice_basetypevice_data[ii]._id,
            ProductName: this.productdata[productindex].Productname,
            Basetypeid: this.productprice_basetypevice_data[ii].selectBaseTypeID,
            Basetypename: this.basetypedata[basetypeindex].Basetypename
          });
        }
        console.log(this._InventoryFoodwithProduct2List)
      }

    })
  }
  initializenameinproductpricetable() {
    // for () {

    // }
  }
  getbasetypetable() {
    this.basetypeservice.get().subscribe(data => {
      if (data) {
        this.basetypedata2 = data;
        this.basetypedata = this.basetypedata2.allTasks;
      }
    }
    )
  }
  getproducttable() {
    this.productservice.get().subscribe(data => {
      if (data) {
        this.productdata2 = data;
        this.productdata = this.productdata2.allTasks;
      }
    }
    )
  }
  getproductpricetable() {
    this.ppservice.get().subscribe(data => {
      if (data) {
        this.ppdata2 = data;
        this.ppdata = this.ppdata2.allTasks;
      }
    }
    )
  }
  addMaterialforEdit() {
    const indexP = this.inventoryfoodmaindata.findIndex((item: { _id: any; name: any }) => item._id === this.myEditForm.value.inventoryfoodmain_id);
    alert(this.inventoryfoodmaindata[indexP].quantitytypevalue);
    alert(this.myEditForm.value.quantitytypevalue);
    if (this.myEditForm.value.quantitytypevalue > 0 && this.inventoryfoodmaindata[indexP].quantitytypevalue > this.myEditForm.value.quantitytypevalue) {
      this.args = "";
      if (this._GoodscollectionMergename_List.length == 0) {

        alert("first: ");
        //   this._Goodscollection_List.push({
        //     IventoryFoodMainId:this.inventoryfoodmaindata[indexP]._id,
        //     quantiyval: this.myAddForm.value.quantitytypevalue
        //  });
        this._GoodscollectionMergename_List.push({
          IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
          Name: this.inventoryfoodmaindata[indexP].name,
          quantiyval: this.myEditForm.value.quantitytypevalue
        });
        this.args = "Material Added  Successfully";
      }
      else if (this._GoodscollectionMergename_List.length > 0) {
        let indexgoodcollection2 = 0;
        for (var ii = 0; ii < this._GoodscollectionMergename_List.length; ii++) {
          this.getinventoryfoodmain_id = this._GoodscollectionMergename_List[ii].IventoryFoodMainId;
          // alert(this._GoodscollectionMergename_List);
          // alert(this._Goodscollection_List[ii].IventoryFoodMainId);
          if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {
            indexgoodcollection2 = ii;
            // alert(this.getinventoryfoodmain_id);
            break;
          }
          //findIndex(item=>item.IventoryFoodMainId===this.inventoryfoodmaindata[indexP]._id);
        }

        //   alert(this.getinventoryfoodmain_id + "==" + this.inventoryfoodmaindata[indexP]._id);
        if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {

          //   alert("in indexgoodcollection: " + this.getinventoryfoodmain_id);
          this._GoodscollectionMergename_List[indexgoodcollection2].IventoryFoodMainId = this.inventoryfoodmaindata[indexP]._id;
          this._GoodscollectionMergename_List[indexgoodcollection2].Name = this.inventoryfoodmaindata[indexP].name;
          this._GoodscollectionMergename_List[indexgoodcollection2].quantiyval = this.myEditForm.value.quantitytypevalue;
          this.args = "Material Updated  Successfully";
        }
        else {
          this._GoodscollectionMergename_List.push({
            IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
            Name: this.inventoryfoodmaindata[indexP].name,
            quantiyval: this.myEditForm.value.quantitytypevalue
          });
          this.args = "Material Added Successfully";
        }
      }
    }
    else {
      this.args = "Quantity value can not greater than Inventory stored product and can't be negative";
    }
    console.log(this._GoodscollectionMergename_List);
    //this.quantitytypename = this.inventoryfoodmaindata[indexP]._id ;
    //   alert(this.inventoryfoodmaindata[indexP]._id );
  }
  addMaterial() {
    const indexP = this.inventoryfoodmaindata.findIndex((item: { _id: any; name: any }) => item._id === this.myAddForm.value.inventoryfoodmain_id);
    alert(this.inventoryfoodmaindata[indexP].quantitytypevalue);
    if (this.myAddForm.value.quantitytypevalue > 0 && this.inventoryfoodmaindata[indexP].quantitytypevalue > this.myAddForm.value.quantitytypevalue) {
      this.args = "";
      if (this._GoodscollectionMergename_List.length == 0) {

        alert("first: ");
        //   this._Goodscollection_List.push({
        //     IventoryFoodMainId:this.inventoryfoodmaindata[indexP]._id,
        //     quantiyval: this.myAddForm.value.quantitytypevalue
        //  });
        this._GoodscollectionMergename_List.push({
          IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
          Name: this.inventoryfoodmaindata[indexP].name,
          quantiyval: this.myAddForm.value.quantitytypevalue
        });
        this.args = "Material Added  Successfully";
      }
      else if (this._GoodscollectionMergename_List.length > 0) {
        let indexgoodcollection2 = 0;
        for (var ii = 0; ii < this._GoodscollectionMergename_List.length; ii++) {
          this.getinventoryfoodmain_id = this._GoodscollectionMergename_List[ii].IventoryFoodMainId;
          // alert(this._GoodscollectionMergename_List);
          // alert(this._Goodscollection_List[ii].IventoryFoodMainId);
          if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {
            indexgoodcollection2 = ii;
            // alert(this.getinventoryfoodmain_id);
            break;
          }
          //findIndex(item=>item.IventoryFoodMainId===this.inventoryfoodmaindata[indexP]._id);
        }

        //   alert(this.getinventoryfoodmain_id + "==" + this.inventoryfoodmaindata[indexP]._id);
        if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {

          //   alert("in indexgoodcollection: " + this.getinventoryfoodmain_id);
          this._GoodscollectionMergename_List[indexgoodcollection2].IventoryFoodMainId = this.inventoryfoodmaindata[indexP]._id;
          this._GoodscollectionMergename_List[indexgoodcollection2].Name = this.inventoryfoodmaindata[indexP].name;
          this._GoodscollectionMergename_List[indexgoodcollection2].quantiyval = this.myAddForm.value.quantitytypevalue;
          this.args = "Material Updated  Successfully";
        }
        else {
          this._GoodscollectionMergename_List.push({
            IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
            Name: this.inventoryfoodmaindata[indexP].name,
            quantiyval: this.myAddForm.value.quantitytypevalue
          });
          this.args = "Material Added Successfully";
        }
      }
    }
    else {
      this.args = "Quantity value can not greater than Inventory stored product and can't be negative";
    }
    console.log(this._GoodscollectionMergename_List);
    //this.quantitytypename = this.inventoryfoodmaindata[indexP]._id ;
    //   alert(this.inventoryfoodmaindata[indexP]._id );
  }
  getqtname() {
    //  alert(this.myAddForm.value.inventoryfoodmain_id);
    //this.quantitytypename = this.Inventoryfoodquntitytype.find((item: { basetype: any; }) => item.basetype === selectedValue);
    const indexP = this.inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.inventoryfoodmain_id);
    // const index = this.Inventoryfoodquntitytype
    console.log(indexP);
    console.log(this.inventoryfoodmaindata);
    this.quantitytypename = this.inventoryfoodmaindata[indexP].quantitytypename;
    // alert(this.quantitytypename);
  }
  getqtnameforedit() {
    this.getAllInventoryFoodMain();
    //  alert(this.myAddForm.value.inventoryfoodmain_id);
    //this.quantitytypename = this.Inventoryfoodquntitytype.find((item: { basetype: any; }) => item.basetype === selectedValue);
    const indexP = this.inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === this.myEditForm.value.inventoryfoodmain_id);
    // const index = this.Inventoryfoodquntitytype
    console.log(indexP);
    console.log(this.inventoryfoodmaindata);
    this.quantitytypename = this.inventoryfoodmaindata[indexP].quantitytypename;
    // alert(this.quantitytypename);
  }
  showubelement() {
    this.showubelements = true;
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
  add(_InventoryFoodwithProduct: InventoryFoodwithProduct): void {
    // this.procategorry.name = this.name;
    // this.procategorry.categorydesc = this.categorydesc;
    //alert(`Category added: ${JSON.stringify(procategorry)}`); // Better alert message
    // console.log(procategorry);
    console.log(_InventoryFoodwithProduct);
    this.service.add(_InventoryFoodwithProduct).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Added Category..." + _InventoryFoodwithProduct.ProductName;
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
      this.getproducttable();
      this.getbasetypeforedit(event.data.ProductId);
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      console.log(this.inventoryfoodmaindata);
      for (var ii = 0; ii < event.data.goodscollections.length; ii++) {

        const index = this.inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === event.data.goodscollections[ii].IventoryFoodMainId);
        alert(index);
        this.inventoryfoodmaindata.splice(index, 1);
      }
      console.log(this.inventoryfoodmaindata);
      this._GoodscollectionMergename_List = [];
      this._GoodscollectionMergename_List = event.data.goodscollections;
      console.log(event.data.goodscollections);
      console.log(this.popdata2);
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        ProductId: [event.data.ProductId],
        ProductPrcieId: [event.data.ProductPrcieId],
        ProductName: [event.data.ProductName],
        Basetypeid: [event.data.Basetypeid],
        Basetypename: [event.data.Basetypename],
        goodscollections: [event.data.goodscollections],
        inventoryfoodmain_id: [event.data.inventoryfoodmain_id],
        quantitytypevalue: [event.data.quantitytypevalue]
      });
    }
    // this.loadcategory();
  }

  loadinventoerymainfood() {
    this.service.get().subscribe(data => {
      if (data) {
        console.log(data);
        this.fooddata2 = data;
        this.fooddata = this.fooddata2.allTasks
        console.log(this.fooddata);
        //this.search(id);

      }
    })
  }
  Update(_InventoryFoodwithProduct: InventoryFoodwithProductforEdit) {
    this.service.update(_InventoryFoodwithProduct).subscribe(res => {
      if (res) {
        //this.search(id);
        this.args = "Successfully Updated Category..." + _InventoryFoodwithProduct.ProductName;
        // alert("Successfully Updated Category..."+name);
        this.loadinventoerymainfood();

      }
    })
  }
  cDelete(_id: any) {

  }
  onFormSubmit() {

    // console.log(this.myAddForm.value);
    // console.log(this.myAddForm.value.Basetypeid);
    // console.log(this._GoodscollectionMergename_List);
    //console.log(this._InventoryFoodwithProduct2List);
    const indexbasetype = this._InventoryFoodwithProduct2List.findIndex(item => item.Basetypeid === this.myAddForm.value.Basetypeid);
    this._InventoryFoodwithProduct = {
      ProductId: this._InventoryFoodwithProduct2List[indexbasetype].ProductId,
      ProductPrcieId: this._InventoryFoodwithProduct2List[indexbasetype].ProductPrcieId,
      ProductName: this._InventoryFoodwithProduct2List[indexbasetype].ProductName,
      Basetypeid: this._InventoryFoodwithProduct2List[indexbasetype].Basetypeid,
      Basetypename: this._InventoryFoodwithProduct2List[indexbasetype].Basetypename,
      goodscollections: this._GoodscollectionMergename_List
    };

    //console.log( this._InventoryFoodwithProduct);
    this.add(this._InventoryFoodwithProduct);
    // if (this.myAddForm.valid) {
    //   //this.add(this.myAddForm.value); this._GoodscollectionMergename_List
    // //  console.log(this.myAddForm.value);
    // }

  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.getproducttable();
    this.loadinventoeryfoodquantitytype();
    this.show = true;
    this.showEdit = false;
    this.args = null;
    this._GoodscollectionMergename_List = [];
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      const indexbasetype = this._InventoryFoodwithProduct2List.findIndex(item => item.Basetypeid === this.myEditForm.value.Basetypeid);
      this._InventoryFoodwithProductforEdit = {
        _id: this.myEditForm.value._id,
        ProductId: this._InventoryFoodwithProduct2List[indexbasetype].ProductId,
        ProductPrcieId: this._InventoryFoodwithProduct2List[indexbasetype].ProductPrcieId,
        ProductName: this._InventoryFoodwithProduct2List[indexbasetype].ProductName,
        Basetypeid: this._InventoryFoodwithProduct2List[indexbasetype].Basetypeid,
        Basetypename: this._InventoryFoodwithProduct2List[indexbasetype].Basetypename,
        goodscollections: this._GoodscollectionMergename_List
      };
      console.log(this._InventoryFoodwithProductforEdit);
      this.Update(this._InventoryFoodwithProductforEdit);
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
        //  alert("Deleted.");
      }
    })



  }
}
