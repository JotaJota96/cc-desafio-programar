import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacionDTO } from '../classes/paginacion-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {

  protected apiURL: string;

  constructor(protected http:HttpClient, private actionUrl: String) {
    this.apiURL = environment.apiURL + '/' + actionUrl;
  }
  
  getAll(param:any = {}): Promise<T[] | T | PaginacionDTO<T>> {
    return this.http.get<T[]>(this.apiURL, { params: param, headers: this.getTocken() }).toPromise();
  }

  get(id: number | string, param:any = {}): Promise<T> {
    return this.http.get<T>(this.apiURL + '/' + id, { params: param, headers: this.getTocken() }).toPromise();
  }

  create(data: T): Promise<T> {
    return this.http.post<T>(this.apiURL, data, { headers: this.getTocken() }).toPromise();
  }

  update(id: number | string, data: T): Promise<T> {
    return this.http.put<T>(this.apiURL + '/' + id, data, { headers: this.getTocken() }).toPromise();
  }

  delete(id: number | string): Promise<T> {
    return this.http.delete<T>(this.apiURL + '/' + id, { headers: this.getTocken() }).toPromise()
  }

  private getTocken(): HttpHeaders {
    const tocken_cc = localStorage.getItem("tocken_cc");
    let header:any = {};
    if (tocken_cc != null) header['Authorization']  = 'Bearer ' + tocken_cc;
    return new HttpHeaders(header);
  }
}
