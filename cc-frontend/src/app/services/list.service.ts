import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getEmpresasPorRubro(id: number){
    this.http.get(environment.apiURL + '/dashboard/rubro/' + id);
  }
}
