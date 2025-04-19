import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { BaseTypeService } from '../../../../Services/basetype.service';
import { QuantitytypeService } from '../../../../Services/quantitytype.service';
import { Router, RouterLink } from '@angular/router';
import { Basetype, ProductCategory } from '../../../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from '../../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../../userend/crud/deletebutton/deletbasetypebutton';
import { basetyperowData } from './basetype.model'
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { ProductPriceService } from '../../../../Services/productprice.service';
import { NotificationModule } from '../../../../notification/notification.module';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from '../../../../notification/delete/delete.component';
import { EditComponent } from '../../../../notification/edit/edit.component';
import { ManageModule } from '../../manage.module';
import { FivecommanModule } from '../../../../fivecomman/fivecomman.module';
import { ConfirmedeleteComponent } from '../../../../notification/confirmedelete/confirmedelete.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'jsk-basetype',
  templateUrl: './basetype.component.html',
  styleUrl: './basetype.component.css',
  imports: [FivecommanModule]
})

@Injectable({ providedIn: 'root' })
export class BasetypeComponent implements OnInit, ICellRendererAngularComp {
  edit() {
    this.editag = true;
    this.loadbasetype2();
  }
  editag = false;
  args: any = null; message: any;
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
  tablename: any;
  myAddForm: FormGroup;

  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  lodbastype: basetyperowData[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 200, 500, 1000];

  productrecord: any;
  productrecord2: any;
  selectcategory: any;
  Basetypename: any;
  Basetypedesc: any;
  colDefs: ColDef[] = [
    { field: "Basetypename" },
    { field: "Basetypedesc", flex: 2 },
    { field: "Delete", cellRenderer: DeleteComponent },
    { field: "Edit", cellRenderer: EditComponent }

  ];
  basetype: Basetype = {
    _id: '',
    Basetypename: '', Basetypedesc: '',
    selectcategoryID: ''
  }
  selectcategoryID: any;

  categorynamedata: any;
  categorynamedata2: any
  basetypedata2: any;
  basetypedata: any;
  //basetypedata = this.loadbasetype2();
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private service: BaseTypeService, private QuantitytypeService_: QuantitytypeService, private router: Router, private formedit: FormBuilder, private productPriceservice: ProductPriceService) {
    this.display = "display:none;"
    this.loadqtype();
    this.loadbasetype();
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      Basetypename: ['', Validators.required],
      Basetypedesc: ['',],
      selectcategoryID: ['', [Validators.required]]
    });
    this.myAddForm = this.formedit.group({

      Basetypename: ['', Validators.required],
      Basetypedesc: ['',],
      selectcategoryID: ['', [Validators.required]]
    });


  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "base";
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
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        Basetypename: [event.data.Basetypename, Validators.required],
        Basetypedesc: [event.data.Basetypedesc],
        selectcategoryID: [event.data.selectcategoryID, [Validators.required]]
      });

    }
    //this.loadbasetype();
  }

  ngOnInit(): void {
    // this.loadbasetype();

    this.classname = "";
  }
  loadqtype() {
    this.QuantitytypeService_.get().subscribe(data => {
      if (data) {
        this.categorynamedata2 = data;
        this.categorynamedata = this.categorynamedata2.allTasks

        // console.log(data);
        //this.search(id);

      }
    })
  }

  add(basetype: Basetype): void {

    this.service.add(basetype).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.message = res;
        this.args = this.message.message;//"Record Added succefully..." + basetype.Basetypename;
        // alert("Basetype inserted succefully.");
        this.loadbasetype()
      }
    })

  }

  loadbasetype() {
    this.service.get().subscribe(subQuantityTypeData => {
      if (subQuantityTypeData) {
        this.basetypedata2 = subQuantityTypeData;

        this.basetypedata = this.basetypedata2.allTasks;
        console.log(this.basetypedata);
        // alert("Called");
      }
    })

  }
  loadbasetype2() {
    this.service.get().subscribe(subQuantityTypeData => {
      if (subQuantityTypeData) {
        this.basetypedata2 = subQuantityTypeData;

        this.basetypedata = this.basetypedata2.allTasks;
        return this.basetypedata;
        //console.log(this.basetypedata);
        // alert("Called");
      }
    })

  }
  Update(basetype: Basetype) {
    //alert(basetype._id);
    this.service.update(basetype).subscribe(res => {
      if (res) {
        this.loadbasetype();
        //this.search(id);
        console.log(res);
        // this.args=null;
        this.message = res;
        // alert(this.message.message);
        this.args = this.message.message;//"Successfully Updated..." + basetype.Basetypename;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);


      }
    })
  }
  cDelete(_id: any) {
    this.loadbasetype();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
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

    this.productPriceservice.getbybasetypeid(id).subscribe(records => {
      this.productrecord2 = records;
      this.productrecord = this.productrecord2.allTasks;
      console.log(this.productrecord.length);
      console.log(records);
      if (this.productrecord.length == 0) {

        this.service.delete(id).subscribe(res => {
          if (res) {
            this.display = "display:none;";
            this.loadbasetype();
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




