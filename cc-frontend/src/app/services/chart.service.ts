import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  numb: number = 1;

  constructor(private http: HttpClient) {
   }

  color = ['#f98866', '#ff420e', '#FFC947', '#0A1931', '#80bd9e', '#89da59', '#3EDBF0', '#04009A', '#F0EBCC', '#77ACF1'];

  getEmpresasRubro() {
    return this.http.get(environment.apiURL + '/dashboard/rubro');
  }

  getEmpresasLocalidad() {
    return this.http.get(environment.apiURL + '/dashboard/localidad');
  }

  getData() {
    return this.numb;
  }

  setData(num: number){
    this.numb = num
  }

}
