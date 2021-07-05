import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { ListService } from 'src/app/services/list.service';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-aniversario-empresa',
  templateUrl: './aniversario-empresa.component.html',
  styleUrls: ['./aniversario-empresa.component.scss'],
  animations: [
    inCardAnimation, inInfoAnimation, inTitleAnimation
  ]
})
export class AniversarioEmpresaComponent implements OnInit {

  meses: any[] = [
                [1,'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'],[5, 'Mayo'], [6, 'Junio'],
                [7, 'Julio'], [8, 'Agosto'], [9,'Setiembre'],[10,'Octubre'], [11,'Noviembre'], [12,'Diciembre']];

  tableColumns: string[] = [
    'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps', 'fecha_inicio']; // columnas de la tabla
  aniversario: EmpresaDTO[] = [];
  listaElementos: PaginacionDTO<EmpresaDTO> = new PaginacionDTO<EmpresaDTO>(); // Lista de elementos
  reqListado: Promise<any> | null = null;
  paramsPaginacion:any = {}

  fecha = new Date();
  mes = this.fecha.getMonth() + 1;
  mesSeleccionado: any;
    
  constructor(protected listSvc: ListService, protected _snackBar: MatSnackBar) { }
 
  ngOnInit(): void {
    this.preparaParametrosPaginacion();
    this.cargarLista();
  }

  cargarLista(){
    if (this.reqListado != null) return;
    this.reqListado = this.listSvc.getEmpresasAniversario(this.paramsPaginacion)
    this.reqListado.then((data: any) => {
      this.listaElementos = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado", 'Regresar');
    })
    .finally(() => {
      this.reqListado = null;
    });
  }

  obtenerMes(mesFiltro: any){
    this.mesSeleccionado = mesFiltro;
    this.paginado(mesFiltro);
  }

  paginado(pageElement:any) {
    this.preparaParametrosPaginacion(pageElement)
    this.cargarLista();
  }

  preparaParametrosPaginacion(params: any = {}) {
    this.paramsPaginacion = {month: this.mesSeleccionado || this.mes}
    if (params == null) return this.paramsPaginacion;
    if (params.pageIndex) this.paramsPaginacion.page = params.pageIndex + 1;
    if (params.pageSize) this.paramsPaginacion.limit = params.pageSize;
    return this.paramsPaginacion;
  }

}
