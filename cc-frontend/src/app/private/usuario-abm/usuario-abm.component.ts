import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { PersonaDTO } from 'src/app/classes/persona-dto';
import { UserDTO } from 'src/app/classes/user-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { MsgService } from 'src/app/services/msg.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UserService } from 'src/app/services/user.service';
import { ModalPersonaComponent } from '../dialogs/modal-persona/modal-persona.component';

@Component({
  selector: 'app-usuario-abm',
  templateUrl: './usuario-abm.component.html',
  styleUrls: ['./usuario-abm.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class UsuarioAbmComponent implements OnInit {
  tableColumns: string[] = ['id', 'nickname', 'rol', 'email', 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<UserDTO> = new PaginacionDTO<UserDTO>(); // Lista de elementos
  
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: UserDTO = new UserDTO();

  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;
  reqFilterPersona:Promise<any> | null = null;

  timeGuardar:any = null;
  search:string = '';

  error:string = ""
  filtradoPersona: Observable<PersonaDTO[]> = this.PreparefilterPersona();

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private modal: MatDialog,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected servicePersona: PersonaService,
    protected service: UserService,
  ) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
    this.cargarLista();
  }

  buscar() {
    if (this.timeGuardar != null) clearTimeout(this.timeGuardar);
    this.timeGuardar = setTimeout(() => {
      this.cargarLista();
      this.timeGuardar = null;
    }, 100);
  }

  cargarLista(pageElement:any = null) {
    if (this.reqListado != null) return;
    this.reqListado = this.service.getAll(this.preparaParametrosPaginacion(pageElement))
    this.reqListado.then((data: any) => {
      this.listaElementos = data;
    })
    .catch((error) => {
      this.error = error['error']['error'] ? error['error']['error'].join(", ") : this.msg.txt("falla");
    })
    .finally(() => {
      this.reqListado = null;
    });

  }

  preparaParametrosPaginacion(params: any) {
    let ret:any = { full : null};
    if (this.search) ret.q = this.search.trim();
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }

  seleccionarParaEditar(elemento: UserDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: UserDTO) {
    this.elementoSeleccionado = elemento;
    this.dialog.openDialog({
      type: DialogType.CONFIRM_DELETE,
      useDefault: true,
    }).afterClosed().subscribe((result: DialogActionResult) => {
      if (result == DialogActionResult.CONFIRM) {
        this.eliminar();
      } else {
        this.resetearFormulario();
      }
    });
  }

  resetearFormulario(elemento?: UserDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      rol: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(200)]),
      repassword: new FormControl('', [Validators.minLength(8), Validators.maxLength(200)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      persona: new FormControl('', []),
      persona_id: new FormControl('', [Validators.required])
    }, this.validarQueSeanIguales);
    this.filtradoPersona = this.PreparefilterPersona();
    this.elementoSeleccionado = new UserDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['rol'].setValue(elemento.rol);
      this.formulario.controls['password'].setValue(elemento.password);
      this.formulario.controls['nickname'].setValue(elemento.nickname);
      this.formulario.controls['email'].setValue(elemento.email);
      this.formulario.controls['persona_id'].setValue(elemento.persona_id);
      const nombre = elemento.persona?.nombre_1 + " " + elemento.persona?.apellide_1;
      this.formulario.controls['persona'].setValue(nombre);
      this.oldPersona = nombre
      
    }
  }

  validarQueSeanIguales: ValidatorFn = (): ValidationErrors | null => {
    const password = this.formulario?.controls['password']?.value || ''
    const repassword = this.formulario?.controls['repassword']?.value || ''
    console.log(password == '', repassword == '' , password === repassword);
    
    return (password == '' && repassword == '') || password === repassword
      ? null
      : { noSonIguales: true }
  }

  eliminar() {
    if (!this.elementoSeleccionado.id) {
      this.dialog.openDialog({ title: this.msg.txt("noSeleccionoDelete"), type: DialogType.ERROR, useDefault: true })
      return;
    }
    this.service.delete(this.elementoSeleccionado.id)
    .then((data) => {
      this.cargarLista();
    })
    .catch((error) => {
      this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.resetearFormulario();
    });
  }

  guardar() {
    if (this.reqGuardar != null) return;
    if (!this.modoEdicion) this.elementoSeleccionado = new UserDTO();
    
    this.elementoSeleccionado.rol = this.formulario.controls['rol'].value;
    this.elementoSeleccionado.password = this.formulario.controls['password'].value;
    this.elementoSeleccionado.repassword = this.formulario.controls['repassword'].value;
    this.elementoSeleccionado.nickname = this.formulario.controls['nickname'].value;
    this.elementoSeleccionado.email = this.formulario.controls['email'].value;
    this.reqGuardar = this.elementoSeleccionado.id ? this.service.update(this.elementoSeleccionado.id, this.elementoSeleccionado) : this.service.create(this.elementoSeleccionado);
    this.reqGuardar
    .then((data) => {
      this.cargarLista();
      this.resetearFormulario();
    })
    .catch((error) => {
      if (error['error'])
      this.dialog.openDialog({ message: Object.values(error['error'])?.join(", ") , type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.reqGuardar = null;
    });
  }

  PreparefilterPersona(): Observable<PersonaDTO[]> {
    if (!this.formulario || !this.formulario.controls || !this.formulario.controls['persona']) 
      return new Observable<PersonaDTO[]>();
    console.log(this.formulario.controls['persona']);
    return this.formulario.controls['persona'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.filterPersona(value))
    );
  }
  oldPersona:string | null = null;
  filterPersona(value: string): Promise<PersonaDTO[]> {
    console.log("dsds");
    
    return new Promise((res, error) => {
      if (value == null || value == '') res([]);
      if (this.formulario.controls['persona'].value != this.oldPersona && this.oldPersona != null) {
        this.formulario.controls['persona_id'].setValue('');
        this.oldPersona = null;
        this._snackBar.open(this.msg.txt('desSeleccionoPersona'), 'Undo');
      }
      const filterValue = value.toLowerCase();
      this.reqFilterPersona = this.servicePersona.getAll({ simple: null, q : filterValue, limit : 10}) as Promise<PersonaDTO[]>;
      this.reqFilterPersona
        .then((data) => res(data))
        .catch((data) => {
          this._snackBar.open(this.msg.txt('errorListadoPersona'), 'Undo');
        })
        .finally(() => this.reqFilterPersona = null);
    });
  }
  filterPersonaSelect(id: number | undefined): void {
    if (id == null) return;
    this.oldPersona = this.formulario.controls['persona'].value;
    this.formulario.controls['persona_id'].setValue(id);
    this._snackBar.open(this.msg.txt('seleccionoPersona'), 'Undo');
  }

  creaPersona(elemento: PersonaDTO = new PersonaDTO()) {
    const dialogRef = this.modal.open( ModalPersonaComponent, {
      data: elemento
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.persona) {
        this.cargarLista();
        this._snackBar.open(this.msg.txt('siRecivioPersona'), 'Undo');
      } else {
        this._snackBar.open(this.msg.txt('noRecivioPersona'), 'Undo');
      }
    });
  }
}
