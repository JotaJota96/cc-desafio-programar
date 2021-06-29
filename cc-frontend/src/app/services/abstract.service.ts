import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {

  protected apiURL: string;

  constructor(protected http:HttpClient, private actionUrl: String) {
    this.apiURL = environment.apiURL + '/' + actionUrl;
  }
  
  getAll(): Observable<T[]> {
    return this.http.get(this.apiURL) as Observable<T[]>;;
  }

  get(id: number | undefined): Observable<T> {
    return this.http.get(this.apiURL + '/' + id) as Observable<T>;;
  }

  create(data: T): Observable<T> {
    return this.http.post(this.apiURL, data) as Observable<T>;;;
  }

  update(id: number | undefined, data: T): Observable<T> {
    return this.http.put(this.apiURL + '/' + id, data) as Observable<T>;;;
  }

  delete(id: number | undefined): Observable<T> {
    return this.http.delete(this.apiURL + '/' + id) as Observable<T>;;
  }

}
