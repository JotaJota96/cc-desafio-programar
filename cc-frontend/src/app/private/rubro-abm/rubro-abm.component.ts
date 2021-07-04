import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { RubroDTO } from 'src/app/classes/rubro-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { MsgService } from 'src/app/services/msg.service';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'app-rubro-abm',
  templateUrl: './rubro-abm.component.html',
  styleUrls: ['./rubro-abm.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class RubroABMComponent implements OnInit {
  tableColumns: string[] = ['id', 'nombre', 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<RubroDTO> = new PaginacionDTO<RubroDTO>(); // Lista de elementos
  
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: RubroDTO = new RubroDTO();

  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;
  error:string = ""

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected service: RubroService
  ) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
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

  preparaParametrosPaginacion(params: any) {
    if (params == null) return null;
    let ret:any = {};
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }

  seleccionarParaEditar(elemento: RubroDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: RubroDTO) {
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

  resetearFormulario(elemento?: RubroDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nombre: new FormControl({value:'', disabled: (this.error != '')}, [Validators.required, Validators.minLength(4), Validators.maxLength(200)])
    });
    this.elementoSeleccionado = new RubroDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['nombre'].setValue(elemento.nombre);
    }
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
    if (!this.modoEdicion) this.elementoSeleccionado = new RubroDTO();
    this.elementoSeleccionado.nombre = this.formulario.controls['nombre'].value;
    this.reqGuardar = this.elementoSeleccionado.id ? this.service.update(this.elementoSeleccionado.id, this.elementoSeleccionado) : this.service.create(this.elementoSeleccionado);
    this.reqGuardar
    .then((data) => {
      this.cargarLista();
      this.resetearFormulario();
    })
    .catch((error) => {
      this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.reqGuardar = null;
      this.resetearFormulario();
    });
  }
}
