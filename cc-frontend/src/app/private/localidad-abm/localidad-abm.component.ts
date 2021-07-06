import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { DepartamentoDTO } from 'src/app/classes/departamento-dto';
import { LocalidadDTO } from 'src/app/classes/localidad-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-localidad-abm',
  templateUrl: './localidad-abm.component.html',
  styleUrls: ['./localidad-abm.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class LocalidadABMComponent implements OnInit {
  tableColumns: string[] = ['id', 'nombre', 'departamento', 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<LocalidadDTO> = new PaginacionDTO<LocalidadDTO>(); // Lista de elementos
  listaDepartamento: DepartamentoDTO[] = [];
  nameDepartamento: {[id:number]:string} = [];


  paramsPaginacion:any = {}
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: LocalidadDTO = new LocalidadDTO();

  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;
  reqListadoDepartamento:Promise<any> | null = null;
  error:string = ""
  
  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected service: LocalidadService, 
    protected serviceDepartamento: DepartamentoService
  ) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
    this.cargarListaDepartamento();
    this.cargarLista();
  }

  cargarListaDepartamento() {
    if (this.reqListadoDepartamento != null) return;
    this.reqListadoDepartamento = this.serviceDepartamento.getAll({ 'simple' : null })
    this.reqListadoDepartamento.then((data: any) => {
      this.listaDepartamento = data;
      data.map((dep:any) => { this.nameDepartamento[dep.id] = dep.nombre });
    })
    .catch((error) => {
      this.error = error['error']['error'] ? error['error']['error'].join(", ") : this.msg.txt("falla");
    })
    .finally(() => {
      this.reqListadoDepartamento = null;
    });
  }

  filter(key:string, value:string | number | undefined) {
    this.paramsPaginacion[key] = value;
    this.cargarLista(this.paramsPaginacion);
  }

  paginado(pageElement:any) {
    this.cargarLista(this.preparaParametrosPaginacion(pageElement));
  }

  cargarLista(pageElement:any = null) {
    if (this.reqListado != null) return;
    this.reqListado = this.service.getAll(pageElement)
    this.reqListado.then((data: any) => {
      this.listaElementos = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt("falla"),'', { duration: 500 });
    })
    .finally(() => {
      this.reqListado = null;
    });
  }

  preparaParametrosPaginacion(params: any) {
    if (params == null) return null;
    if (params.pageIndex) this.paramsPaginacion.page = params.pageIndex + 1;
    if (params.pageSize) this.paramsPaginacion.limit = params.pageSize;
    return this.paramsPaginacion;
  }

  seleccionarParaEditar(elemento: LocalidadDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: LocalidadDTO) {
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

  resetearFormulario(elemento?: LocalidadDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      departamento_id: new FormControl('', [Validators.required])
    });
    this.elementoSeleccionado = new LocalidadDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['departamento_id'].setValue(elemento.departamento_id);
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
    if (!this.modoEdicion) this.elementoSeleccionado = new LocalidadDTO();
    this.elementoSeleccionado.nombre = this.formulario.controls['nombre'].value;
    this.elementoSeleccionado.departamento_id = this.formulario.controls['departamento_id'].value;
    this.reqGuardar = this.elementoSeleccionado.id ? this.service.update(this.elementoSeleccionado.id, this.elementoSeleccionado) : this.service.create(this.elementoSeleccionado);
    this.reqGuardar
    .then((data) => {
      this.cargarLista();
      this.resetearFormulario();
    })
    .catch((error) => {
      error = Object.values(error['error']).map((arr:any) => arr.join(", ") );
      this.dialog.openDialog({ message: error ? error.join(", ") : this.msg.txt("falla"), type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.reqGuardar = null;
      this.resetearFormulario();
    });
  }
}
