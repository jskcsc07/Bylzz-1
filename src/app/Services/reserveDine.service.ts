


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReserveDine } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ReserveDineService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"reserveDine";

  add(ReserveDine_: ReserveDine): Observable<ReserveDine> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<ReserveDine>(this.url2, ReserveDine_);

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
  update(ReserveDine_: ReserveDine) {
    return this.http.put(this.url2, { ReserveDine_ });
  }
}                                                                                                                              