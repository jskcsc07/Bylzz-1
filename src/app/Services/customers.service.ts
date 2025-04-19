import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomresService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"customers";

  add(customer: Customers): Observable<Customers> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Customers>(this.url2, customer);

  }
  getbyid(_id: any) {
    return this.http.get(`${this.url2}/${_id}`);
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }
  update(cutomer: Customers) {
    return this.http.put(this.url2, { cutomer });
  }
}                                                                                                                              