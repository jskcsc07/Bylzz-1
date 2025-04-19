import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDine } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class DineService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"dine";

  add(dine: IDine): Observable<IDine> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<IDine>(this.url2, dine);

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
  update(dine: IDine) {
    return this.http.put(this.url2, { dine });
  }
}