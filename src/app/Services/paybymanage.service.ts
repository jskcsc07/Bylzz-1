import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paybymanage } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class PaybyService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"payByManage";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }




  add(paybymanage: Paybymanage): Observable<Paybymanage> {
    return this.http.post<Paybymanage>(this.url2, paybymanage);
  }
  update(paybymanage: Paybymanage) {
    return this.http.put(this.url2, { paybymanage });
  }
  get() {
    return this.http.get(this.url2);
  }


}
