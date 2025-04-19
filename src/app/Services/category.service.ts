import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basetype, ProductCategory, ProductPrice, Products, Quantitytype } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+'categoryType';//"category";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }




  add(category: ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.url2, category);
  }
  update(productcategory: ProductCategory) {
    return this.http.put(this.url2, { productcategory });
  }
  get() {
    return this.http.get(this.url2);
  }


}
