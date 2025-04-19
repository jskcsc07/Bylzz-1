import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"invoice";
  private url3: string = environment.api+"getOrderRecordByDate";

  add(Invoice_: Invoice): Observable<Invoice> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Invoice>(this.url2, Invoice_);

  }
  getbyid(RecieptNumber: any) {
    return this.http.get(`${this.url2}/${RecieptNumber}`);
  }
  getbycreateAt2(startDate: any, createdAt: any) {
    return this.http.get(`${this.url2}/${createdAt}`);
  }
  getbycreateAt(createdAt: string): Observable<any> {
    // const params = new HttpParams().set('createdAt', createdAt);
    // return this.http.get<any>(`${this.url3}/${params}`);
    return this.http.get<any>(`${this.url3}/${createdAt}`);
  }
  getbystartenddate(startdate: string, enddate: string): Observable<any> {
    // const params = new HttpParams().set('createdAt', createdAt);
    // return this.http.get<any>(`${this.url3}/${params}`);
    return this.http.get<any>(`${this.url3}/${startdate}/${enddate}`);
  }
  getDataByDate(createdAt: string): Observable<any> {
    const params = new HttpParams().set('createdAt', createdAt);
    return this.http.get<any>(`${this.url3}/${params}`);
    // return this.http.get<any>(this.apiUrl, { params });
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  //   delete(_id:any){
  //     return this.http.delete(`${this.url2}/${_id}`);
  //   }                                
  update(invoice: Invoice) {
    return this.http.put(this.url2, { invoice });
  }
}