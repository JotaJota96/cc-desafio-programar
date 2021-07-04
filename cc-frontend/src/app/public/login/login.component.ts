import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'src/app/classes/login-dto';
import { AccessService } from 'src/app/services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginDTO = new LoginDTO();
  public formulario: FormGroup = new FormGroup({});
  
  loginFail: boolean = false;

  reqLogin:Promise<any> | null = null;

  constructor(protected service: AccessService, protected router:Router) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
  }

  ingresar() {
    this.loginData = new LoginDTO();
    this.loginData.email = this.formulario.controls['email'].value;
    this.loginData.password = this.formulario.controls['password'].value;

    this.reqLogin = this.service.login(this.loginData);
    
    this.reqLogin.then((data) => {
      this.service.saveLoginData(data);
      this.router.navigate(['/private']);
      this.loginFail = false;
    })
    .catch((error) => {
      this.loginFail = true;
    })
    .finally(() => {
      this.reqLogin = null;
    });
  }


  resetearFormulario() {
    // vaciar formulario
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    // el correo no lo borra
    if (this.loginData != undefined) {
      this.formulario.controls['email'].setValue(this.loginData.email);
    }
    this.loginData = new LoginDTO();
  }
}
