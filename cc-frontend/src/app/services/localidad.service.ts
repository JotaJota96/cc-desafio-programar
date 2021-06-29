import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalidadDTO } from '../classes/localidad-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService extends AbstractService<LocalidadDTO {

  constructor(http:HttpClient) {
    super(http, 'localidad');
  }

}
