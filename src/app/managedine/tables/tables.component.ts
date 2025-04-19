import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../Services/quantitytype.service';
import { Router, RouterLink } from '@angular/router';
import { IChair, IChairsrunningorder, IDine, Invoice, ReserveDine } from '../../core/model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from ' ../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../userend/crud/deletebutton/deletbasetypebutton';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
// import { PopupmodelComponent } from '../../popupmodel/popupmodel.component';
import { DineService } from '../../Services/dine.service';
import { FloorService } from '../../Services/floor.service';
import { ChairService } from '../../Services/chair.service';
import { ChairServiceService } from '../../Services/chairsrunningorders.serivce';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { InvoiceService } from '../../Services/invoice.service';
import { min } from 'rxjs';
import { CustomresService } from '../../Services/customers.service';
import { ReserveDineService } from '../../Services/reserveDine.service';
import { NotificationModule } from '../../notification/notification.module';
import { FivecommanModule } from '../../fivecomman/fivecomman.module';
@Component({
  selector: 'jsk-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
  providers: [DatePipe],
  imports: [FivecommanModule],
})
@Injectable({ providedIn: 'root' })

export class TablesComponent implements OnInit {
  // this.router.navigate(['\Home']);
  editshow = false;
  deleteshow = false;
  holdreservetableid = 0;
  tablename = "";
  datecurrent: Date = this.gettoday();
  myEditForm: FormGroup<{ TableId: FormControl<string | null>; DateTimeStart: FormControl<string | null>; DateTimeEnd: FormControl<string | null>; CustomerId: FormControl<string | null>; Name: FormControl<string | null>; MobileNo: FormControl<string | null>; Paymentstatus: FormControl<boolean | null>; Bookingstatus: FormControl<boolean | null>; BookingAmount: FormControl<string | null>; RecieptNumber: FormControl<any>; }>;
  date2: string = '';
  gettoday(): Date {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date2 = yesterday.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date2, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date2, 'yyyy-MM-dd');

    const createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString() + "Z"

    return new Date(createdAt);
  }
  Confirmedelete() {
    //alert(this.holdreservetableid);
    if (this.holdreservetableid != 0) {
      this.reservedineservice.delete(this.holdreservetableid).subscribe(data => {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.allTasks;
        this.loaddinedata();
        this.deleteshow = false;
      })
    }

  }
  deletereservedine(_id: any) {
    this.args = "";
    this.deleteshow = true;
    this.holdreservetableid = _id;

  }
  editreservedinefata: any;
  editreservedinefata2: any;
  editreservedine(_id: any) {
    this.args = "";
    this.editshow = true;
    this.holdreservetableid = _id;
    this.reservedineservice.getbyid(_id).subscribe(data => {
      if (data) {
        this.editreservedinefata2 = data;
        this.editreservedinefata = this.editreservedinefata2.allTasks;
        this.myEditForm = this.formedit.group({
          TableId: [this.editreservedinefata.TableId,],
          DateTimeStart: [this.editreservedinefata.DateTimeStart,],
          DateTimeEnd: [this.editreservedinefata.DateTimeEnd,],
          CustomerId: [this.editreservedinefata.CustomerId,],
          Name: [this.editreservedinefata.Name,],
          MobileNo: [this.editreservedinefata.MobileNo,],
          Paymentstatus: [this.editreservedinefata.Paymentstatus,],
          Bookingstatus: [this.editreservedinefata.Bookingstatus,],
          BookingAmount: [this.editreservedinefata.BookingAmount,],
          RecieptNumber: [this.editreservedinefata.RecieptNumber,]
        });
        // alert(this.editreservedinefata[0]._id)
      }
    })
  }
  bindcustomer() {
    // this.myAddForm
    //  this.myAddForm = this.formedit.group({
    //   TableId: ['', Validators.required],
    //   DateTimeStart: ['', Validators.required],
    //   DateTimeEnd: ['',],
    //   CustomerId: ['',],
    //   Name: ['', Validators.required],
    //   MobileNo: ['', Validators.required],
    //   Paymentstatus: [false,],
    //   BookingAmount:['', Validators.required],
    //   RecieptNumber:[this.now,]
    // });

  } splittime: string = ";"
  serchbynamecustomer = "";
  searchCustomer() {

    this.myAddForm.value.CustomerId;
    const index = this.Customersnamedata.findIndex((item: { Name: any; }) => item.Name === this.myAddForm.value.CustomerId);
    console.log(this.Customersnamedata);
    console.log(index);
    if (index > 0) {
      this.serchbynamecustomer = this.Customersnamedata[index].Name;
      console.log(this.Customersnamedata[index].Name);
    }
  }
  // selecttime() {
  // throw new Error('Method not implemented.');
  // }

  isChecked = false;
  date: any; now: any = new Date('').getTime().toString();
  distanceday: any;
  currentdatetime = new Date();
  currentdate: any;
  isCheckedPaymentstatus: any = false;
  days: any;
  months: any;
  resevetable: ReserveDine = {
    TableId: "undefined",
    DateTimeStart: this.now,
    DateTimeEnd: "",
    CustomerId: "undefined",
    Name: "undefined",
    MobileNo: "undefined",
    BookingAmount: 0,
    Paymentstatus: false,
    RecieptNumber: "",
    Bookingstatus: true,
    TableName: "undefined"
  }
  checkdate() {
    this.days = this.currentdatetime.getDate();
    if (this.days < 10) {
      this.days = "0" + this.days
    }
    this.months = this.currentdatetime.getMonth();
    if (this.months < 10) {
      this.months = "0" + (+this.months + 1);
    }
    this.currentdate = this.currentdatetime.getFullYear() + "-" + this.months + "-" + this.days + "T" + this.currentdatetime.getHours() + ":" + this.currentdatetime.getMinutes();
    console.log(this.currentdate);
  }
  selectdateandtime() {
    this.date = new Date(this.myAddForm.value.DateTimeStart).getTime();
    // const x = setInterval(()=>{
    this.now = new Date();
    var distance = this.date - this.now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.distanceday = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    // console.log(this.distanceday);

    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww })
    console.log(this.distanceday);
    //const today = date.getTimezoneOffset()
    //console.log(today);
    //alert(event)
    console.log(this.myAddForm.value.DateTimeStart);
  }
  showreserveDine() {
    this.loaddine();
    this.show = true;
  }
  show: boolean = false;
  onFormEditSubmit() {

  }
  onFormSubmit() {
    // var hours = Math.floor((this.myAddForm.value.DateTimeStart+(1000*60*60*24))/(1000*60*60));
    let index = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.TableId);
    // alert(this.date[0])
    this.myAddForm.value.TableName = this.dinedata[index].name;

    this.date = new Date(this.myAddForm.value.DateTimeStart).toLocaleString().split(',');
    this.now = new Date();
    var distance = this.splittime.split('T');
    const date = this.date[0].split('/');

    const time = this.date[1].split(':');
    this.myAddForm.value.DateTimeStart = date[2] + "-" + date[0] + "-" + date[1] + "T" + time[0] + ":" + time[1] + ":" + time[2];
    this.myAddForm.value.DateTimeEnd = date[2] + "-" + date[0] + "-" + date[1] + "T" + (+time[0] + 1) + ":" + time[1] + ":" + time[2];

    this.myAddForm.value.RecieptNumber = time.toString();
    this.resevetable = this.myAddForm.value;
    // alert(this.myAddForm.value.DateTimeEnd);
    console.log(this.resevetable);
    this.reservedineservice.add(this.resevetable).subscribe(reservedine => {
      if (reservedine) {
        this.reservedinedata2 = reservedine;
        this.reservedinedata = this.reservedinedata2.allTasks;
        this.args = "Successfully Reserved";
      }
    }
    )


  }
  myAddForm: FormGroup;
  reservedinedata: any; reservedinedata2: any;
  loaddinedata() {
    //alert("I am here");
    this.reservedineservice.get().subscribe(data => {
      if (data) {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.allTasks;


      }
    })
  }
  close() {
    this.show = false;
    this.deleteshow = false;
    this.editshow = false;
  }
  // colDefs: ColDef[] = [
  //   { field: "name" },
  //   { field: "description",flex: 2 },
  //   { field: "Delete",cellRenderer:BasetypDeleteButtun},
  //   { field: "Edit",cellRenderer:BasetypEditButtun}
  // ];
  button: any;
  invoiceid: string = "";
  public invoiceid2 = "";
  args: any = null;
  tab: number = 0;
  isCheckedStatus: any = true;
  invoiceidforpickup: number = 0;
  // invoice interface
  invoice: Invoice = {
    Taxes: [],
    Chairs: [],
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: "",
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    RecieptNumber: 0,
    grandtotal: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: "New Order",
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    paybyId: 'undefined',
    OrderTypeName: "",
    createdAt: this.datecurrent,
    table_id: 'undefined',
    tablename: 'undefined',
    customer_id: 'undefined',
    employee_id: 'undefined'
  }
  invoicepickup: Invoice = {
    Taxes: [],
    Chairs: [],
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: "",
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    RecieptNumber: 0,
    grandtotal: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: "New Order",
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    paybyId: 'undefined',
    OrderTypeName: "",
    createdAt: this.datecurrent,
    table_id: 'undefined',
    tablename: 'undefined',
    customer_id: 'undefined',
    employee_id: 'undefined'
  }
  invoicedelete: Invoice = {
    Taxes: [],
    Chairs: [],
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: "",
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    RecieptNumber: 0,
    grandtotal: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: "Cancelled",
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    paybyId: 'undefined',
    OrderTypeName: "",
    createdAt: this.datecurrent,
    table_id: 'undefined',
    tablename: 'undefined',
    customer_id: 'undefined',
    employee_id: 'undefined'
  }
  // ];
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: ''
  }
  chairs: any;
  chairs2: any;
  chairsbytable_id: any;
  chairsbytable_id2: any;
  Floordata2: any;
  Floordata: any
  dinenamedata: any;
  dinenamedata2: any
  dinedata2: any;
  dinedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  tabactive0: any;
  tabactive1: any;
  tabactive2: any;
  tabactive3: any;
  Customersnamedata: any;
  Customersnamedata2: any
  loadcustomers() {
    this.customerservice.get().subscribe(data => {
      if (data) {
        this.Customersnamedata2 = data;
        this.Customersnamedata = this.Customersnamedata2.allTasks

      }
    })
  }
  constructor(private service: DineService, private QuantitytypeService_: QuantitytypeService, private router: Router, private fb: FormBuilder, private floorservice: FloorService, private chairservice: ChairService, private chairsrunningorderservice: ChairServiceService, private _InvoiceService: InvoiceService, private formedit: FormBuilder, private customerservice: CustomresService, private reservedineservice: ReserveDineService, private datePipe: DatePipe) {
    //alert("1");

    this.datecurrent = this.gettoday();
    this.args = null;
    this.tabactive0 = "table-tab active";
    this.tabactive1 = "table-tab ";
    this.tabactive2 = "table-tab ";
    this.tabactive3 = "table-tab ";
    //this.now=new Date().toString();
    //  this.loadbasetype();
    // this.loaddine2();
    this.loaddine();
    this.loadallchair();
    this.loadrunningorder();

    this.myEditForm = this.formedit.group({
      TableId: ['',],
      DateTimeStart: ['',],
      DateTimeEnd: ['',],
      CustomerId: ['',],
      Name: ['',],
      MobileNo: ['',],
      Paymentstatus: [false,],
      Bookingstatus: [true,],
      BookingAmount: ['',],
      RecieptNumber: [this.now,]
    });
    this.myAddForm = this.formedit.group({
      TableId: ['',],
      DateTimeStart: ['',],
      DateTimeEnd: ['',],
      CustomerId: ['',],
      Name: ['',],
      MobileNo: ['',],
      Paymentstatus: [false,],
      Bookingstatus: [true,],
      BookingAmount: ['',],
      RecieptNumber: [this.now,]
    });
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  getforinvoiceiddata2: any;
  getforinvoiceiddata: any;
  loaddine() {
    this.service.get().subscribe(
      data => {
        if (data) {
          this.dinedata2 = data;
          this.dinedata = this.dinedata2.allTasks;
        }
      }
    );
  }
  pickup() {
    // this.invoice = {

    //   Taxes: [],
    //   Chairs: [],
    //   taxpecentRate: 0,
    //   taxpercentValue: 0,
    //   DiscountId: "",
    //   Discountvalue: 0,
    //   Discountperstage: 0,
    //   AdditionaldiscountAmount: 0,
    //   Totalvaue: 0,
    //   RecieptNumber: +this.invoiceid,
    //   grandtotal: 0,
    //   OrderType: '',
    //   PendingAmount: 0,
    //   PaidAmount: 0,
    //   AmountPaidstatus: false,
    //   Orderstatus: "New Order",
    //   TotalTaxAmount: 0,
    //   TotalItemsAmount: 0,
    //   createdAt: "",
    //   OrderTypeName: ""
    // }
    // this._InvoiceService.add(this.invoice).subscribe(inv => {
    //   if (inv) {
    //     const d = new Date();
    //     this.invoiceid=(d.getDate()+d.getMonth()+d.getFullYear()+d.getTime()).toString();
    //   //  alert("done.");
    //     this.dine.status = false;
    //     this.dine._id = "001";
    //     this.dine.name = "pickup";
    //     this.dine.description = "pickup";
    //     this.dine.floor_id = "pickup";
    //     this.service.update(this.dine).subscribe(data => {
    //       if (data) {
    //         this.dinedata2 = data;
    //         this.dinedata = this.dinedata2.allTasks
    //         this.loadallchair();
    //        // this.loaddine();
    //     this.loadrunningorder();
    //   //  alert(this.invoiceid);
    //     this.notifyManage2.emit(this.invoiceid);
    //       }
    //     })


    //   }
    // });
    this.loadchairsrunningorderselected("pickup");
  }
  tabshow(tab: number) {
    this.tab = tab;

    if (tab == 0) {
      this.tabactive0 = "table-tab active";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab ";
    }
    if (tab == 1) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab active";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab ";
      this.loaddinedata();

    }
    if (tab == 2) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab active";
      this.tabactive3 = "table-tab ";

    }
    if (tab == 3) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab active";
    }
    this.loaddine();
    this.loadallchair();
    this.loadrunningorder();
  }
  cancel(arg0: any) {


    //////alert(arg0);
    this.chairsrunningorderservice.getbyid(arg0).subscribe(data => {

      if (data) {
        // ////alert(arg0);
        this.runningorder2_cancel_by_id = data;
        this.runningorder_cancel_by_id = this.runningorder2_cancel_by_id.allTasks;
        // alert(this.runningorder_cancel_by_id[0].Chairsrunningorder.length);
        if (this.runningorder_cancel_by_id[0].Chairsrunningorder.length == 0) {

        }
        else {
          //update table status start
          //alert("tableid : "+this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);
          const inde = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);

          this.dine.status = true;
          this.dine._id = this.dinedata[inde]._id;
          // alert(this.dinedata[inde]._id);
          this.dine.name = this.dinedata[inde].name;
          this.dine.description = this.dinedata[inde].description;
          this.dine.floor_id = this.dinedata[inde].floor_id;
          this.service.update(this.dine).subscribe(data => {
            if (data) {
              this.dinedata2 = data;
              this.dinedata = this.dinedata2.allTasks
              this.loadallchair();

              this.loadrunningorder();
            }
          })
        }
        //end

        // ////alert(this.runningorder_cancel_by_id[0].Chairsrunningorder.length);
        for (var ii = 0; ii < this.runningorder_cancel_by_id[0].Chairsrunningorder.length; ii++) {
          this.chair2._id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii]._id;
          this.chair2.name = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].name;
          this.chair2.description = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].description;
          this.chair2.status = true;
          this.chair2.table_id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].table_id;
          this.chair2.chairorderstatus = "1";
          this.chairservice.update(this.chair2).subscribe(data2 => {
            if (data2) {
              ////alert("updated");
              // this.loadallchair();

            }

          }
          )
        }



        ////alert(arg0);
        this.chairsrunningorderservice.delete(arg0).subscribe(data2 => {
          if (data2) {
            ////alert("deleted");
            //  this.loadrunningorder();
            this._InvoiceService.getbyid(arg0).subscribe(data => {
              if (data) {

                // alert("working");
                this.getforinvoiceiddata2 = data;
                this.getforinvoiceiddata = this.getforinvoiceiddata2.allTasks;
                console.log(this.getforinvoiceiddata);
                //  alert("length: "+this.getforinvoiceiddata.length);
                for (var ii = 0; ii < this.getforinvoiceiddata.length; ii++) {
                  //  alert(this.getforinvoiceiddata[ii].TotalTaxAmount);
                  this.invoicedelete = {

                    Taxes: this.getforinvoiceiddata[ii].Taxes,
                    Chairs: this.getforinvoiceiddata[ii].Chairs,
                    taxpecentRate: this.getforinvoiceiddata[ii].taxpecentRate,
                    taxpercentValue: this.getforinvoiceiddata[ii].taxpercentValue,
                    DiscountId: this.getforinvoiceiddata[ii].DiscountId,
                    Discountvalue: this.getforinvoiceiddata[ii].Discountvalue,
                    Discountperstage: this.getforinvoiceiddata[ii].Discountperstage,
                    AdditionaldiscountAmount: this.getforinvoiceiddata[ii].AdditionaldiscountAmount,
                    Totalvaue: this.getforinvoiceiddata[ii].Totalvaue,
                    grandtotal: this.getforinvoiceiddata[ii].grandtotal,
                    RecieptNumber: this.getforinvoiceiddata[ii].RecieptNumber, //this.totalamount + this.discountvalue + d.getDate() + d.getTime() + d.getSeconds(),
                    OrderType: this.getforinvoiceiddata[ii].OrderType,
                    AmountPaidstatus: this.getforinvoiceiddata[ii].AmountPaidstatus,
                    Orderstatus: "Cancelled",
                    PaidAmount: this.getforinvoiceiddata[ii].PaidAmount,
                    PendingAmount: this.getforinvoiceiddata[ii].PendingAmount,
                    TotalTaxAmount: this.getforinvoiceiddata[ii].TotalTaxAmount,
                    TotalItemsAmount: this.getforinvoiceiddata[ii].TotalItemsAmount,
                    OrderTypeName: this.getforinvoiceiddata[ii].OrderTypeName,
                    paybyId: this.getforinvoiceiddata[ii].paybyId,
                    table_id: this.getforinvoiceiddata[ii].table_id,
                    customer_id: this.getforinvoiceiddata[ii].customer_id,
                    employee_id: this.getforinvoiceiddata[ii].employee_id,
                    tablename: this.getforinvoiceiddata[ii].tablename,
                    createdAt: this.getforinvoiceiddata[ii].createdAt
                  }
                }
                console.log(this.invoicedelete);
                this._InvoiceService.update(this.invoicedelete).subscribe(updateddata => {
                  if (updateddata) {
                    //alert("Updated.");
                    //     this.loadallchair();
                    //     this.loaddine();
                    // this.loadrunningorder();
                  }
                })
                this.loadallchair();
                this.loaddine();
                this.loadrunningorder();
                //alert(this.getforinvoiceiddata[0]._id);
              }
            });


          }

        })
      }
    })

  }

  @Output() notifyManage3: EventEmitter<string> = new EventEmitter<string>();

  gotohome(arg0: any) {
    this.notifyManage2.emit(arg0);
    //////alert(arg0)
  }
  runningorder: any;
  runningorder2: any;
  runningorder_cancel_by_id: any;
  runningorder2_cancel_by_id: any;

  loadrunningorder() {
    this.chairsrunningorderservice.get().subscribe(data => {
      if (data) {
        this.runningorder2 = data;
        this.runningorder = this.runningorder2.allTasks;
        console.log(this.runningorder);
      }
    })

  }
  loadfloor() {
    ////alertselectcategoryID);
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.allTasks

      }
    })
  }
  checkbox: any
  chairstatus(e: any, name: string, description: string, table_id: string) {
    this.checkbox = document.getElementById(e)
    ////alert  this.checkbox.checked );
    if (!this.checkbox.checked) {
      ////alert"in false");
      this.chairstatusupdate(e, "2", true, name, description, table_id);
    }
    else if (this.checkbox.checked) {
      // //alert"in true");
      this.chairstatusupdate(e, "1", this.checkbox.checked, name, description, table_id);
    }
  }

  chairsrunningorderarr2: IChair[] = [];
  chairsrunningorderarr3: IChair[] = [];
  chair: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  chair2: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  chairsrunningorderarr: IChairsrunningorder = {
    Chairsrunningorder: [this.chair],
    tablename: ""
  };
  chairstatusupdate(id: any, chairorderstatusvalue: any, status: boolean, name: string, description: string, table_id: string) {
    this.chair._id = id;
    this.chair.name = name;
    this.chair.description = description;
    this.chair.status = status;
    this.chair.table_id = table_id;
    this.chair.chairorderstatus = chairorderstatusvalue;
    this.chairservice.update(this.chair).subscribe(res => {
      if (res) {
        //this.search(id);
        //  //alert"Done");
        // this.args=null;
        // this.args="Successfully Updated...";
        //  //alert"Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        // this.loadchair2();
      }
    })
  }
  loadallchair() {

    this.chairservice.get().subscribe(data => {
      if (data) {
        this.chairs2 = data;
        this.chairs = this.chairs2.allTasks;
      }
    })
  }
  loadchair(table_id: string) {


  }


  @Output() notifyManage2: EventEmitter<string> = new EventEmitter<string>();
  getchair(arg0: any) {
    //  this.loadchair(arg0);     
    //alert"this.invoiceid: "+this.invoiceid2);




    // this.notifyManage2.emit(this.invoiceid2);                                                                    
    // this.router.navigate(['\Home']);

  }
  booktable(tableid: any) {
    //alert(tableid);
    this.loadchairsrunningorderselected(tableid);
  }
  pickupinvoiceid: number = 0;
  loadchairsrunningorderselected(table_id: any) {
    //this.chairsrunningorderarr.Chairsrunningorder=[];
    if (table_id == "pickup") {
      const d = new Date();
      this.invoiceidforpickup = d.getFullYear() + d.getTime();


      // console.log("outer");
      // //alert"outer");
      // console.log(this.chairsrunningorderarr);
      //  console.log(this.chairsrunningorderarr2);
      this.chairsrunningorderarr = {
        Chairsrunningorder: [],
        tablename: "pickup" + this.invoiceidforpickup
      };
      this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
        if (res) {
          this.chairs2 = res;
          this.pickupinvoiceid = this.chairs2.createdTask.createdAt;
          console.log(this.invoiceid)
          this.invoicepickup = {

            Taxes: [],
            Chairs: [],
            taxpecentRate: 0,
            taxpercentValue: 0,
            DiscountId: "",
            Discountvalue: 0,
            Discountperstage: 0,
            AdditionaldiscountAmount: 0,
            Totalvaue: 0,
            RecieptNumber: this.pickupinvoiceid,
            grandtotal: 0,
            OrderType: '',
            PendingAmount: 0,
            PaidAmount: 0,
            AmountPaidstatus: false,
            Orderstatus: "New Order",
            TotalTaxAmount: 0,
            TotalItemsAmount: 0,
            paybyId: 'undefined',
            OrderTypeName: "",
            table_id: "",
            customer_id: "",
            employee_id: "",
            tablename: "",
            createdAt: this.datecurrent
          }

          this._InvoiceService.add(this.invoicepickup).subscribe(inv => {
            if (inv) {

              this.notifyManage2.emit(this.pickupinvoiceid.toString());

            }
          });
          //  alert(this.invoiceidforpickup);



        }
      });
      //alert("pickup");
    } else {
      this.chairservice.getbytable_id(table_id).subscribe(data => {
        if (data) {
          // console.log(data.valueOf());                                                                      
          this.chairsbytable_id = data;
          //  console.log(this.chairsbytable_id2.allTasks.length);   
          // this.chairsbytable_id=this.chairsbytable_id2.allTasks;
          console.log(this.chairsbytable_id.allTasks);

          console.log(this.chairsbytable_id);
          for (var ii = 0; ii < this.chairsbytable_id.allTasks.length; ii++) {
            if (this.chairsbytable_id.allTasks[ii].table_id == table_id && this.chairsbytable_id.allTasks[ii].chairorderstatus == "1") {
              // //alertthis.chairsbytable_id.allTasks[ii].table_id);                                                                                             
              this.chairsrunningorderarr2.push({
                _id: this.chairsbytable_id.allTasks[ii]._id,
                name: this.chairsbytable_id.allTasks[ii].name,
                description: this.chairsbytable_id.allTasks[ii].description,
                //in future status can be false
                status: true,
                table_id: this.chairsbytable_id.allTasks[ii].table_id,
                //in future it can be 0
                chairorderstatus: "1"
              }
              );
              this.chairsrunningorderarr3 = this.chairsrunningorderarr2;
              console.log(this.chairsrunningorderarr2);
              console.log(this.chairsrunningorderarr3);

            }

          }

        }
        const inde = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == table_id);
        this.tablename = this.dinedata[inde].name
        this.chairsrunningorderarr = {
          Chairsrunningorder: this.chairsrunningorderarr3,
          tablename: this.dinedata[inde].name
        };
        // console.log("outer");
        // //alert"outer");
        console.log(this.chairsrunningorderarr);
        //  console.log(this.chairsrunningorderarr2);
        this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
          if (res) {
            let jsk = 0;
            for (var ii = 0; ii < this.chairsbytable_id.allTasks.length; ii++) {

              if (this.chairsbytable_id.allTasks[ii].table_id == table_id && this.chairsbytable_id.allTasks[ii].chairorderstatus == "1") {
                this.chair._id = this.chairsbytable_id.allTasks[ii]._id;
                this.chair.name = this.chairsbytable_id.allTasks[ii].name;
                this.chair.description = this.chairsbytable_id.allTasks[ii].description;
                //in future status can be false
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.allTasks[ii].table_id;
                //in future it can be 0
                this.chair.chairorderstatus = "1";
                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    //alert"done");            
                    jsk++;
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    //alert"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);                
                    if (this.chairsbytable_id.allTasks.length == jsk) {
                      //alert"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                      //  this.notifyManage2.emit(this.invoiceid2);
                    }

                  }

                }
                )

              }
              else if ((this.chairsbytable_id.allTasks[ii].table_id == table_id) && (this.chairsbytable_id.allTasks[ii].chairorderstatus == "2")) {
                this.chair._id = this.chairsbytable_id.allTasks[ii]._id;
                this.chair.name = this.chairsbytable_id.allTasks[ii].name;
                this.chair.description = this.chairsbytable_id.allTasks[ii].description;
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.allTasks[ii].table_id;
                this.chair.chairorderstatus = "1";

                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    //alert"done");
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    jsk++;
                    //alert"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                    if (this.chairsbytable_id.allTasks.length == jsk) {
                      //alert"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                      //  this.notifyManage2.emit(this.invoiceid2);
                    }
                  }
                }
                )
              }
              else if (this.chairsbytable_id.allTasks[ii].table_id == table_id && this.chairsbytable_id.allTasks[ii].chairorderstatus == "0") {
                jsk++;
                this.loadallchair();
                this.loaddine();
                this.loadrunningorder();
                if (this.chairsbytable_id.allTasks.length == jsk) {

                  //alert"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                  // this.notifyManage2.emit(this.invoiceid2);
                }
              }
            }
            this.chairs2 = res;
            this.invoiceid = this.chairs2.createdTask.createdAt

            //adding invoice id in invoice table start
            this.invoice = {

              Taxes: [],
              Chairs: [],
              taxpecentRate: 0,
              taxpercentValue: 0,
              DiscountId: "",
              Discountvalue: 0,
              Discountperstage: 0,
              AdditionaldiscountAmount: 0,
              Totalvaue: 0,
              RecieptNumber: +this.invoiceid,
              grandtotal: 0,
              OrderType: '',
              PendingAmount: 0,
              PaidAmount: 0,
              AmountPaidstatus: false,
              Orderstatus: "New Order",
              TotalTaxAmount: 0,
              TotalItemsAmount: 0,
              paybyId: 'undefined',
              OrderTypeName: "",
              table_id: table_id,
              customer_id: "",
              employee_id: "",
              tablename: this.tablename,
              createdAt: this.datecurrent
            }
            this._InvoiceService.add(this.invoice).subscribe(inv => {
              if (inv) {
                //  alert("done.");
                this.dine.status = false;
                this.dine._id = table_id;
                this.dine.name = this.dinedata[inde].name;
                this.dine.description = this.dinedata[inde].description;
                this.dine.floor_id = this.dinedata[inde].floor_id;
                this.service.update(this.dine).subscribe(data => {
                  if (data) {
                    this.dinedata2 = data;
                    this.dinedata = this.dinedata2.allTasks
                    this.loadallchair();
                    // this.loaddine();
                    this.loadrunningorder();
                    //  alert(this.invoiceid);
                    this.notifyManage2.emit(this.invoiceid);
                  }
                })


              }
            });
            //adding invoice id in invoice table end

            this.invoiceid2 = this.invoiceid.toString();
            //alertthis.invoiceid2);
            console.log(this.invoiceid);
          }

        });

      })
    }

    // const indexP = this.chairs.findIndex(item => item._id === id);
  }

  //     loaddine()
  //     {
  //   ////alertselectcategoryID);           
  //   this.service.getbyid(this.myAddForm.value._id).subscribe(data => {
  //     if (data) {
  //      this.dinedata2=data;
  //      this.dinedata=this.dinedata2.allTasks

  //     }
  //   })
  // }

  ngOnInit(): void {
    //alert("2");
    this.loadcustomers();
    this.loadfloor()
    //this.classname="";
    this.loaddine();
    this.loadallchair();

    this.loadrunningorder();
  }
}
