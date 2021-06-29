import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaDTO } from '../classes/empresa-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends AbstractService<EmpresaDTO {

  constructor(http:HttpClient) {
    super(http, 'empresa');
  }

}
