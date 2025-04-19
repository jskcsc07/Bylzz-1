import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryFoodMain } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class InventoryMainFoodService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"inventoryFoodMain";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }




  add(_InventoryFoodMain: InventoryFoodMain): Observable<InventoryFoodMain> {
    return this.http.post<InventoryFoodMain>(this.url2, _InventoryFoodMain);
  }
  update(_InventoryFoodMain: InventoryFoodMain) {
    return this.http.put(this.url2, { _InventoryFoodMain });
  }
  get() {
    return this.http.get(this.url2);
  }
  getbyid(_id: any) {
    return this.http.get(`${this.url2}/${_id}`);
  }

}
