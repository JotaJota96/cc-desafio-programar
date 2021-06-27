import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RubroDTO } from '../classes/rubro-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RubroService extends AbstractService<RubroDTO {

  constructor(http:HttpClient) {
    super(http, 'rubro');
  }

}
