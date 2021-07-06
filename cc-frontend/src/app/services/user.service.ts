import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../classes/user-dto';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO> {

  constructor(http:HttpClient) {
    super(http, 'user');
  }

}
