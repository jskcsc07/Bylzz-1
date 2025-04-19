

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basetype, ProductCategory, ProductPrice, Products, Quantitytype } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"productPrice";
  private pprouterbybasetype: string = environment.api+"productPriceByBaseType";
  private pprouterbyqtype: string = environment.api+"productPriceByQuantityType";
  private pprouterbyproductid: string = environment.api+"productPriceByProductId";
  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);

  }

  update(productprice: ProductPrice) {
    return this.http.put(this.url2, { productprice });
  }
  //,selectcategoryID:any,selectQtypeID:any
  getbyid(SelectProductId: any, selectBaseTypeID: any, selectQtypeID: any, selectcategoryID: any) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.url2}/${SelectProductId}/${selectBaseTypeID}/${selectQtypeID}/${selectcategoryID}`);
  }
  getbybasetypeid(selectBaseTypeID: any) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.pprouterbybasetype}/${selectBaseTypeID}`);
  }
  getbyidQtypid(selectQtypeID: any) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.pprouterbyqtype}/${selectQtypeID}`);
  }
  getbyproductid(SelectProductId: any) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.pprouterbyproductid}/${SelectProductId}`);
  }
  get() {
    return this.http.get(this.url2);
  }
  post(productprices: ProductPrice): Observable<ProductPrice> {
    return this.http.post<ProductPrice>(this.url2, productprices);
  }
}