import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaPersonaDTO } from '../classes/empresa-persona-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaPersonaService extends AbstractService<EmpresaPersonaDTO> {

  constructor(http:HttpClient) {
    super(http, 'empresa_persona');
  }

}
