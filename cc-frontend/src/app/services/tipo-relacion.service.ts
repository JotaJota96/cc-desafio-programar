import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoRelacionDTO } from '../classes/tipo-relacion-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TipoRelacionService extends AbstractService<TipoRelacionDTO> {

  constructor(http:HttpClient) {
    super(http, 'tipo_relacion');
  }

}
