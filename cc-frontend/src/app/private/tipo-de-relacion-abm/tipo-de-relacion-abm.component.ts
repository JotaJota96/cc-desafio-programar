import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRelacionDTO } from 'src/app/classes/tipo-relacion-dto';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { TipoRelacionService } from 'src/app/services/tipo-relacion.service';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tipo-de-relacion-abm',
  templateUrl: './tipo-de-relacion-abm.component.html',
  styleUrls: ['./tipo-de-relacion-abm.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class TipoDeRelacionABMComponent implements OnInit {
  tableColumns: string[] = ['id', 'nombre', 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<TipoRelacionDTO> = new PaginacionDTO<TipoRelacionDTO>(); // Lista de elementos
  
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: TipoRelacionDTO = new TipoRelacionDTO();

  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected tipoRelacionService: TipoRelacionService
  ) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
    this.cargarLista();
  }

  cargarLista(pageElement:any = null) {
    if (this.reqListado != null) return;
    this.reqListado = this.tipoRelacionService.getAll(this.preparaParametrosPaginacion(pageElement))
    this.reqListado.then((data: any) => {
      this.listaElementos = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado", 'Undo');
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

  seleccionarParaEditar(elemento: TipoRelacionDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: TipoRelacionDTO) {
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

  resetearFormulario(elemento?: TipoRelacionDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    });
    this.elementoSeleccionado = new TipoRelacionDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['nombre'].setValue(elemento.nombre);
    }
  }

  eliminar() {
    if (!this.elementoSeleccionado.id) {
      this.dialog.openDialog({ title: "No se ha seleccionado ningun", type: DialogType.ERROR, useDefault: true })
      return;
    }
    this.tipoRelacionService.delete(this.elementoSeleccionado.id)
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
    if (!this.modoEdicion) this.elementoSeleccionado = new TipoRelacionDTO();
    this.elementoSeleccionado.nombre = this.formulario.controls['nombre'].value;
    this.reqGuardar = this.elementoSeleccionado.id ? this.tipoRelacionService.update(this.elementoSeleccionado.id, this.elementoSeleccionado) : this.tipoRelacionService.create(this.elementoSeleccionado);
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
