import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenratedItems } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"itm";

  add(Items: GenratedItems[]): Observable<GenratedItems> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<GenratedItems>(this.url2, Items);

  }
  getbyid(Invoiceid: any) {
    return this.http.get(`${this.url2}/${Invoiceid}`);
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  //   delete(_id:any){
  //     return this.http.delete(`${this.url2}/${_id}`);
  //   }                                
  update(items: GenratedItems[]) {
    return this.http.put(this.url2, { items });
  }
  delete(Invoiceid: any, Productid: any) {
    return this.http.delete(`${this.url2}/${Invoiceid}/${Productid}`);
  }
}