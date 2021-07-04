import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from 'src/app/classes/user-dto';
import { MsgService } from 'src/app/services/msg.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  reqGuardar:Promise<any> | null = null;
  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private _snackBar: MatSnackBar,
    protected service: UserService,
    public dialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDTO
  ) { 
    this.resetearFormulario((data) ? data : new UserDTO());
  }

  ngOnInit(): void {
  }

  resetearFormulario(user: UserDTO = new UserDTO()) {
    this.formulario = new FormGroup({
      id: new FormControl( user.id, []),
      persona_id: new FormControl( user.persona_id, [Validators.required]),
      rol: new FormControl( user.rol, [Validators.required]),
      nickname: new FormControl( user.nickname, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      email: new FormControl( user.email, [Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      password: new FormControl( user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(200)]),
      repassword: new FormControl( user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(200)]),
    }, this.validarQueSeanIguales);
  }

  validarQueSeanIguales: ValidatorFn = (): ValidationErrors | null => {
    const password = this.formulario?.controls['password']?.value || ''
    const repassword = this.formulario?.controls['repassword']?.value || ''
    console.log(password == '', repassword == '' , password === repassword);
    return (password == '' && repassword == '') || password === repassword
      ? null
      : { noSonIguales: true }
  }

  guardar() {
    if (this.reqGuardar != null) return;
    this.reqGuardar = this.formulario.controls['id'].value ? this.service.update(this.formulario.controls['id'].value, this.formulario.value) : this.service.create(this.formulario.value);
    this.reqGuardar
    .then((data) => {
      this.dialogRef.close({ user : data });
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt("falla"), 'Undo');
    })
    .finally(() => {
      this.reqGuardar = null;
    });
  }

  salir() {
    this.dialogRef.close();
  }
}
