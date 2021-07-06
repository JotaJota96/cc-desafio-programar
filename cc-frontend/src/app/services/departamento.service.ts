import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartamentoDTO } from '../classes/departamento-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends AbstractService<DepartamentoDTO> {
  
  constructor(http:HttpClient) {
    super(http, 'departamento');
  }

}
