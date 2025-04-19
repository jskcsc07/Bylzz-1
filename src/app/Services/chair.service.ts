import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChair } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ChairService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"chair";
  private url3: string = environment.api+"chairsGetByTableId";
  add(chair: IChair): Observable<IChair> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<IChair>(this.url2, chair);

  }
  getbyid(_id: any) {
    return this.http.get(`${this.url2}/${_id}`);
  }
  getbytable_id(table_id: any) {
    return this.http.get(`${this.url3}/${table_id}`);
  }
  updatechairstatus(_id: any, chairorderstatus: any) {
    return this.http.put(this.url3, { _id, chairorderstatus });
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }
  update(chair: IChair) {
    return this.http.put(this.url2, { chair });
  }
  update2(chair: IChair): Observable<IChair> {
    return this.http.put<IChair>(this.url2, { chair });
  }
}