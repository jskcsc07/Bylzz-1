import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"product";
  private productbyname: string = environment.api+"productByName";
  private productbycategory: string = environment.api+"productByCategory";
  getbycategoryid(selectcategoryID: any) {
    return this.http.get(`${this.productbycategory}/${selectcategoryID}`);
  }
  get() {
    return this.http.get(this.url2);
  }
  getbyid(_id: any) {
    return this.http.get(`${this.url2}/${_id}`);
  }
  getbyname(Productname: string) {
    return this.http.get(`${this.productbyname}/${Productname}`);
  }
  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }
  post(products: Products): Observable<Products> {
    
    return this.http.post<Products>(this.url2, products);
  }
  update(product: Products) {
    return this.http.put(this.url2, { product });
  }
}