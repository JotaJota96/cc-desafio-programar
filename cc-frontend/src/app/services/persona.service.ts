import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaDTO } from '../classes/persona-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends AbstractService<PersonaDTO {

  constructor(http:HttpClient) {
    super(http, 'persona');
  }

}
