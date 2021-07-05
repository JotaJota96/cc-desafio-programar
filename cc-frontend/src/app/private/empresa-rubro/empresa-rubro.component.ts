import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { ListService } from 'src/app/services/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { RubroDTO } from 'src/app/classes/rubro-dto';
import { RubroService } from 'src/app/services/rubro.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresa-rubro',
  templateUrl: './empresa-rubro.component.html',
  styleUrls: ['./empresa-rubro.component.scss'],
  animations: [
    inCardAnimation, inInfoAnimation, inTitleAnimation
  ]
})
export class EmpresaRubroComponent implements OnInit {

  tableColumns: string[] = [
    'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps']; // columnas de la tabla

  rubros: EmpresaDTO[] = [];
  listaRubros: RubroDTO[] = [];
  paramsPaginacion:any = {}
  nameRubro: {[id:number]:string} = [];

  listaElementos: PaginacionDTO<EmpresaDTO> = new PaginacionDTO<EmpresaDTO>(); // Lista de elementos
  reqListado: Promise<any> | null = null;
  reqListadoRubro:Promise<any> | null = null;

  public formulario: FormGroup = new FormGroup({});
  
  constructor(protected listSvc: ListService, protected _snackBar: MatSnackBar, protected rubroSvc: RubroService) { }

  ngOnInit(): void {
    this.cargarListaRubros();
    this.cargarLista();
  }

  cargarListaRubros() {
    if (this.reqListadoRubro != null) return;
    this.reqListadoRubro = this.rubroSvc.getAll({ 'simple' : null })
    this.reqListadoRubro.then((data: any) => {
      this.listaRubros = data;
      data.map((rub:any) => { this.nameRubro[rub.id] = rub.nombre } );
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado", 'Regresar');
    })
    .finally(() => {
      this.reqListadoRubro = null;
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
    this.reqListado = this.listSvc.getEmpresasPorRubro(pageElement)
    this.reqListado.then((data: any) => {
      this.listaElementos = data['principal'];
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
    if (params.pageIndex) this.paramsPaginacion.page = params.pageIndex + 1;
    if (params.pageSize) this.paramsPaginacion.limit = params.pageSize;
    return this.paramsPaginacion;
  }
}
