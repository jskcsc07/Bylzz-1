import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryFoodwithProduct, InventoryFoodwithProductforEdit } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class InventoryMainFoodwithProductService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"invetoryFoodMainProduct";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }




  add(_InventoryFoodwithProduct: InventoryFoodwithProduct): Observable<InventoryFoodwithProduct> {
    return this.http.post<InventoryFoodwithProduct>(this.url2, _InventoryFoodwithProduct);
  }
  update(_InventoryFoodwithProduct: InventoryFoodwithProductforEdit) {
    return this.http.put(this.url2, { _InventoryFoodwithProduct });
  }
  get() {
    return this.http.get(this.url2);
  }
  getbyid(ProductId: any, Basetypeid: any) {
    return this.http.get(`${this.url2}/${ProductId}/${Basetypeid}`);
  }

}
