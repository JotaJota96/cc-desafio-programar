import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-empresa-listado',
  templateUrl: './empresa-listado.component.html',
  styleUrls: ['./empresa-listado.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class EmpresaListadoComponent implements OnInit {
  tableColumns: string[] = [
    'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps', 'acciones']; // columnas de la tabla
  listaElementos: PaginacionDTO<EmpresaDTO> = new PaginacionDTO<EmpresaDTO>(); // Lista de elementos
  search:string = '';
  
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: EmpresaDTO = new EmpresaDTO();

  timeGuardar:any = null;
  reqGuardar:Promise<any> | null = null;
  reqListado:Promise<any> | null = null;
  error:string = ""

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService, 
    protected service: EmpresaService
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

  buscar() {
    if (this.timeGuardar != null) clearTimeout(this.timeGuardar);
    this.timeGuardar = setTimeout(() => {
      this.cargarLista();
      this.timeGuardar = null;
    }, 100);
  }

  preparaParametrosPaginacion(params: any) {
    let ret:any = {};
    if (this.search) ret.q = this.search.trim();
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }

  seleccionarParaEditar(elemento: EmpresaDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: EmpresaDTO) {
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

  resetearFormulario(elemento?: EmpresaDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nro_bps: new FormControl('', [Validators.required])
    });
    this.elementoSeleccionado = new EmpresaDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['nro_bps'].setValue(elemento.nro_bps);
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
    if (!this.modoEdicion) this.elementoSeleccionado = new EmpresaDTO();
    this.elementoSeleccionado.nro_bps = this.formulario.controls['nro_bps'].value;
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
  logo(src:string) {
    return src ? src : "assets/images/no-logo.png";
  }
}
