import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChair, Invoice } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ChairServiceService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"chairsRunningOrder";

  add(chairsrunningorder: any): Observable<IChair> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<IChair>(this.url2, chairsrunningorder);

  }
  getbyid(createdAt: any) {
    return this.http.get(`${this.url2}/${createdAt}`);
  }
  getbycreateAt2(startDate: any, createdAt: any) {
    return this.http.get(`${this.url2}/${createdAt}`);
  }
  getbycreateAt(endDateTime: string): Observable<any> {
    return this.http.get<any>(`${this.url2}/${endDateTime}`);
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  delete(createdAt: any) {
    return this.http.delete(`${this.url2}/${createdAt}`);
  }
  //   update(basetype:Basetype)
  //   {
  //     return this.http.put(this.url2 ,{basetype});
  //   }
}