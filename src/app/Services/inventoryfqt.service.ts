import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryFoodQuantityType } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class InventoryMFoodQuantityTypeService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"inventoryFoodQuantitType";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }

  add(_InventoryFoodQuantityType: InventoryFoodQuantityType): Observable<InventoryFoodQuantityType> {
    return this.http.post<InventoryFoodQuantityType>(this.url2, _InventoryFoodQuantityType);
  }
  update(_InventoryFoodQuantityType: InventoryFoodQuantityType) {
    return this.http.put(this.url2, { _InventoryFoodQuantityType });
  }
  get() {
    return this.http.get(this.url2);
  }


}
