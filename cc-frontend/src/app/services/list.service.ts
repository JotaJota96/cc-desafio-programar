import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getEmpresasPorRubro(data:any = {}){
    return this.http.get(environment.apiURL + '/dashboard/rubro/' + data['data'], {params:data}).toPromise();
  }

  getEmpresasAltasBajas(data:any){
    return this.http.get(environment.apiURL + '/dashboard/rubro/' + data).toPromise();
  }

  getEmpresasAniversario(data:any){
    return this.http.get(environment.apiURL + '/dashboard/aniversario/' + data['month'],  {params:data}).toPromise();
  }
}
