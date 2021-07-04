import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { PersonaDTO } from 'src/app/classes/persona-dto';
import { UserDTO } from 'src/app/classes/user-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MsgService } from 'src/app/services/msg.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ModalPersonaComponent } from '../dialogs/modal-persona/modal-persona.component';
import { ModalUserComponent } from '../dialogs/modal-user/modal-user.component';

@Component({
  selector: 'app-persona-abm',
  templateUrl: './persona-abm.component.html',
  styleUrls: ['./persona-abm.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class PersonaAbmComponent implements OnInit {
  tableColumns: string[] = ['id', "nombre", "celular","email", 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<PersonaDTO> = new PaginacionDTO<PersonaDTO>(); // Lista de elementos
  search:string = '';
  
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: PersonaDTO = new PersonaDTO();

  timeGuardar:any = null;
  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;
  error:string = ""

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private modal: MatDialog,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected service: PersonaService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
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

  buscar() {
    if (this.timeGuardar != null) clearTimeout(this.timeGuardar);
    this.timeGuardar = setTimeout(() => {
      this.cargarLista();
      this.timeGuardar = null;
    }, 100);
  }

  preparaParametrosPaginacion(params: any) {
    let ret:any = { full: null };
    if (this.search) ret.q = this.search.trim();
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }

  seleccionarParaEliminar(elemento: PersonaDTO) {
    this.elementoSeleccionado = elemento;
    this.dialog.openDialog({
      type: DialogType.CONFIRM_DELETE,
      useDefault: true,
    }).afterClosed().subscribe((result: DialogActionResult) => {
      if (result == DialogActionResult.CONFIRM) {
        this.eliminar();
      }
    });
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
  guardaAcceso(elemento: UserDTO = new UserDTO(), id:number|null = null) {
    if (elemento == null && id == null) {
      this._snackBar.open(this.msg.txt('errorRecogePersona'), 'Undo');
      return;
    }
    if (elemento == null) {
      elemento = new UserDTO();
      elemento.persona_id = id || 0;//Es por error de ts dado los ifs anteriro no llegara id = null
    }
    const dialogRef = this.modal.open( ModalUserComponent, {
      data: elemento
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.user) {
        this.cargarLista();
        this._snackBar.open(this.msg.txt('siRecivioUser'), 'Undo');
      } else {
        this._snackBar.open(this.msg.txt('noRecivioUser'), 'Undo');
      }
    });
  }

  eliminar() {
    if (!this.elementoSeleccionado.id) {
      this.dialog.openDialog({ title: this.msg.txt("noSeleccionoDelete"), type: DialogType.ERROR, useDefault: true })
      return;
    }
    this.service.delete(this.elementoSeleccionado.id)
    .then((data) => {
      this._snackBar.open(this.msg.txt("eliminacionCorrecta"), 'Undo');
      this.cargarLista();
    })
    .catch((error) => {
      this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
    });
  }

  guardar() {
  }
}
