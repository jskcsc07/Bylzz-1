export interface ProductCategory {
    _id:string;
    name: string;
    categorydesc: string;
    createdAt:string;
  }

  export interface Basetype{
    _id:string;
    Basetypename:string;
    Basetypedesc:string;
    selectcategoryID:string;
    
  }

  export interface ProductPrice{
    _id:string;
    ProductPrice: number;
    SelectProductId:string;
    selectcategoryID:string;
      selectQtypeID:string;
      selectBaseTypeID:string;
  }

    export interface  Products{
        _id:string;
        Productname: string;
        Productdesc:string;
        selectcategoryID: string;
          selectQtypeID: string;
          selectBaseTypeID: string;
          availablity: Boolean,
           veg_nonveg: Boolean,
           Status: Boolean
      }
      
      export interface Quantitytype{
        _id:string;
        name: string;
        Desc: string;
       
      }
      export interface ProductPriceDetails{
        _id:string;
        ProductPrice: string;
        SelectProductId:string;
        ProductName:string;
        selectcategoryID:string;
        categoryName:string;
          selectQtypeID:string;
          QtypeName:string;
          selectBaseTypeID: string;
          Basetypename:string;
          quntityvalue:number;
      }
      export interface ProductPriceAllName{
        _id:string;
        ProductPrice: string;
        ProductName:string;
        categoryName:string;
          QtypeName:string;
          Basetypename:string;
      }
      export interface Tax{
        _id:string;
        name:string;
Description:string;
perscentRate:Number;
Status:Boolean;
      }
      
      export interface Invoice
      {
      Chairs:IChair[],
          Taxes:  ITax[],
          taxpecentRate:Number,
          taxpercentValue:  Number, 
          DiscountId: String,
          Discountvalue: Number, 
          Discountperstage: Number,
          AdditionaldiscountAmount:Number,
          Totalvaue: Number,
          grandtotal: Number,
          RecieptNumber: Number,
          OrderType:string;
          PendingAmount:Number,
          PaidAmount:Number,
          AmountPaidstatus:Boolean,
          Orderstatus:String,
          TotalTaxAmount:Number,
          TotalItemsAmount:Number,
          OrderTypeName:String,
          paybyId:String,
          table_id:String,
          customer_id:String,
          employee_id:String,  
          tablename:String,
          createdAt:Date                          
      }
      export interface GenratedItems
      {
        Invoiceid:String,
        Productid:  String,
        Productname: String,
        basetypeid:String,
        basetypename: String,
        Qauntityid:String,
        Qauntityname:  String,
        Quantity:number,
        itemamount:number,
        totalquantityamount:number
      }
      export interface ITax{
        id:String,
        name:String,
        percentt:Number,
        amount:Number,
        productid:String,
        productname:String
      }
      export interface IDine{
        _id:String,
        name:String,
        description:string,
        status:Boolean,
        floor_id:String
      } 
      export interface Floor{
        id:String,
        name:String,
        description:string,
        status:Boolean,
        
      }
      export interface IChair{
        _id:String,
        name:String,
        description:string,
        status:Boolean,
        table_id:string,
        chairorderstatus:string
      }
      export interface IChairMergeDineName{
        _id:string,
        DineTable:String,
        table_id:String,
        name:String,
        description:string,
        status:boolean
      }
      export interface Customers
      {
         
      Name:String,
      MobileNo: String,
      DOB: String,
      type: String,
      tag:  String,
      DueAmount: Number,
      Anniversary: String,
      Paymentstatus:Number,
      RecieptNumber: Number,
      }
      export interface IChairsrunningorder
      {
        Chairsrunningorder:IChair[],
        tablename:any
      }

      export interface Goodscollection
      {
      IventoryFoodMainId:String,
      quantiyval: Number
      }
      export interface GoodscollectionMergename
      {
      IventoryFoodMainId:String,
      Name:string,
      quantiyval: Number
      }
      export interface InventoryFoodwithProduct2
      {
        ProductId:String,
        ProductPrcieId: String,
        ProductName: String,
        Basetypeid: String,
        Basetypename:String,
      }
      export interface  InventoryFoodwithProductforEdit
  {
    _id:String,
    ProductId:String,
    ProductPrcieId: String,
    ProductName: String,
    Basetypeid: String,
    Basetypename:String,
  goodscollections:GoodscollectionMergename[]
  }
      export interface InventoryFoodwithProduct
      {
        ProductId:String,
        ProductPrcieId: String,
        ProductName: String,
        Basetypeid: String,
        Basetypename:String,
      goodscollections:GoodscollectionMergename[]
      }

    
     export interface InventoryFoodMain{
        name:             String,
        description:      String,
        quantitytypeID:   String,
        quantitytypename: String,
        quantitytypevalue: Number
       
     }
     export interface InventoryFoodMain2{
      _id:String,
      name:             String,
      description:      String,
      quantitytypeID:   String,
      quantitytypename: String,
      quantitytypevalue: Number,
      createdAt:String
   }
     export interface InventoryFoodQuantityType{
      name: String,
      discription:String
    }
    
    export interface ReserveDine {

      TableId:  String,
        DateTimeStart:  String,
        DateTimeEnd:  String,
        CustomerId: String,
        Name: String,
        TableName:String,
         MobileNo: String,
        BookingAmount: Number,
        Bookingstatus:boolean,
        Paymentstatus: boolean,
          RecieptNumber:String
    }

export interface Paybymanage{
      Paybyname:String,
      desc: String
      }
    
    export interface Employee {
        name: String,
        role: String,
          type: String,
          status:  Boolean,
          managepermission: Boolean,
          title: String,
        desc:String,
        }
      export interface CompanyProfile{
          name: String,
          tilte: String,
           desc:  String,
           GSTNumber:String,
            turnover: String,
            address:  String,
            mobilenumber:  String,
            mobilenumber2: String,
            customercarenumber: String,
            maplocation1: String,
            maplocation2:  String,
            telephonenumber:  String,
            companyId:  String,
            companyphoto: String,
            websitelink:  String,
            logo: String
        }
