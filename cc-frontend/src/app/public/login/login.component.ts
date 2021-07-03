import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'src/app/classes/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginDTO = new LoginDTO();
  public formulario: FormGroup = new FormGroup({});

  constructor() {
    this.resetearFormulario();
  }

  ngOnInit(): void {
  }

  ingresar() {
    
  }


  resetearFormulario() {
    // vaciar formulario
    this.formulario = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginData = new LoginDTO();
  }
}
