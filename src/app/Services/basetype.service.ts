import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basetype } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class BaseTypeService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"baseType";


  add(basetype: Basetype): Observable<Basetype> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Basetype>(this.url2, basetype);

  }
  getbyid(selectcategoryID: any) {
    return this.http.get(`${this.url2}/${selectcategoryID}`);
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }
  update(basetype: Basetype) {
    return this.http.put(this.url2, { basetype });
  }
}