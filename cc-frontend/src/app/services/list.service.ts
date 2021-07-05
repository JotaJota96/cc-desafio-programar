import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  fecha = new Date();
  mes = this.fecha.getMonth() + 1;

  constructor(private http: HttpClient) { }

  getEmpresasPorRubro(data:any = {}){
    return this.http.get(environment.apiURL + '/dashboard/rubro/' + data['data']).toPromise();
  }

  getEmpresasAltasBajas(data:any){
    return this.http.get(environment.apiURL + '/dashboard/rubro/' + data).toPromise();
  }

  getEmpresasAniversario(data:any){
    if(data == null || data == undefined || data == '') data = this.mes;

    return this.http.get(environment.apiURL + '/dashboard/aniversario/' + data).toPromise();
  }
}
