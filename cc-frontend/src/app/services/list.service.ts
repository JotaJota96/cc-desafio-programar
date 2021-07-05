import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getEmpresasPorRubro(data:any = {}){
    return this.http.get(environment.apiURL + '/dashboard/rubro/' + data['data'], {params:data, headers: this.getTocken()}).toPromise();
  }

  getEmpresasAltasBajas(data:any){
    return this.http.get(environment.apiURL + '/dashboard/movimintos?month=' + data['month'] + '&year' + data['year'], {params:data, headers: this.getTocken()}).toPromise();
  }

  getEmpresasAniversario(data:any){
    return this.http.get(environment.apiURL + '/dashboard/aniversario/' + data['month'],  {params:data, headers: this.getTocken()}).toPromise();
  }


  private getTocken(): HttpHeaders {
    const tocken_cc = localStorage.getItem("tocken_cc");
    let header:any = {};
    if (tocken_cc != null) header['Authorization']  = 'Bearer ' + tocken_cc;
    return new HttpHeaders(header);
  }
}
