

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quantitytype } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class QuantitytypeService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+'quantityType'; //"quntitytype";


  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);

  }
  update(quantitytype: Quantitytype) {
    return this.http.put(this.url2, { quantitytype });
  }
  add(quantitytypes: Quantitytype): Observable<Quantitytype> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Quantitytype>(this.url2, quantitytypes);

  }
  get() {
    return this.http.get(this.url2);
  }
  getbyid(_id: any) {
    return this.http.get(`${this.url2}/${_id}`);
  }
}