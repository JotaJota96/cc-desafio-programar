import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaDTO } from 'src/app/classes/persona-dto';
import { MsgService } from 'src/app/services/msg.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.scss']
})
export class ModalPersonaComponent implements OnInit {

  reqGuardar:Promise<any> | null = null;
  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private _snackBar: MatSnackBar,
    protected service: PersonaService,
    public dialogRef: MatDialogRef<ModalPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonaDTO
  ) { 
    this.resetearFormulario((data) ? data : new PersonaDTO());
  }

  ngOnInit(): void {
  }

  resetearFormulario(persona: PersonaDTO) {
    this.formulario = new FormGroup({
      id: new FormControl( persona.id, []),
      nombre_1: new FormControl( persona.nombre_1, [Validators.required]),
      nombre_2: new FormControl( persona.nombre_2, []),
      apellide_1: new FormControl( persona.apellide_1, [Validators.required]),
      apellide_2: new FormControl( persona.apellide_2, []),
      celular: new FormControl( persona.celular, []),
      email: new FormControl( persona.email, [ Validators.email ]),
    });
  }

  guardar() {
    if (this.reqGuardar != null) return;
    this.reqGuardar = this.formulario.controls['id'].value ? this.service.update(this.formulario.controls['id'].value, this.formulario.value) : this.service.create(this.formulario.value);
    this.reqGuardar
    .then((data) => {
      this.dialogRef.close({ persona : data });
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? this.msg.error(error['error']): this.msg.txt("falla"), 'Undo');
    })
    .finally(() => {
      this.reqGuardar = null;
    });
  }

  salir() {
    this.dialogRef.close();
  }
}
