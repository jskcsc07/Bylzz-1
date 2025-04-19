import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tax } from '../core/model/crud.model';
import { environment } from '../../../src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class TaxService {


  constructor(private http: HttpClient) { }

  private url2: string = environment.api+"tax";

  delete(_id: any) {
    return this.http.delete(`${this.url2}/${_id}`);
  }




  add(Tax: Tax): Observable<Tax> {
    return this.http.post<Tax>(this.url2, Tax);
  }
  update(Tax: Tax) {
    return this.http.put(this.url2, { Tax });
  }
  get() {
    return this.http.get(this.url2);
  }


}
