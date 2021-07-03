import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../classes/login-dto';
import { LoginResponseDTO } from '../classes/login-response-dto';
import { UserDTO } from '../classes/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  protected apiURL: string;

  constructor(protected http:HttpClient) {
    this.apiURL = environment.apiURL + '/access';
  }
  
  login(data: LoginDTO): Promise<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.apiURL + '/login', data, { headers: this.getTocken() }).toPromise();
  }

  private getTocken(): HttpHeaders {
    const tocken_cc = localStorage.getItem("tocken_cc");
    let header:any = {};
    if (tocken_cc != null) header['Authorization']  = 'Bearer ' + tocken_cc;
    return new HttpHeaders(header);
  }

  public saveLoginData(data: LoginResponseDTO) {
    let token: string = data.token ? data.token : '';
    let user: UserDTO = data.user ? data.user : new UserDTO();
    localStorage.setItem("tocken_cc", token);
    localStorage.setItem("user_cc", JSON.stringify(user));
  }
}
