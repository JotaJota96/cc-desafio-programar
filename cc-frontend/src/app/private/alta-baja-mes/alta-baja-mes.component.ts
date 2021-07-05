import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { ListService } from 'src/app/services/list.service';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';

@Component({
  selector: 'app-alta-baja-mes',
  templateUrl: './alta-baja-mes.component.html',
  styleUrls: ['./alta-baja-mes.component.scss'],
  animations: [
    inCardAnimation, inInfoAnimation, inTitleAnimation
  ]
})
export class AltaBajaMesComponent implements OnInit {

  meses: any[] = [
    [1,'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'],[5, 'Mayo'], [6, 'Junio'],
    [7, 'Julio'], [8, 'Agosto'], [9,'Setiembre'],[10,'Octubre'], [11,'Noviembre'], [12,'Diciembre']];

  anios: any[] = [];

tableColumns: string[] = [
'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps', 'fecha_inicio']; // columnas de la tabla

tableColumnsBajas: string[] = [
  'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps', 'deleted_at'];
listaElementosAltas: PaginacionDTO<EmpresaDTO> = new PaginacionDTO<EmpresaDTO>(); // Lista de elementos
listaElementosBajas: PaginacionDTO<EmpresaDTO> = new PaginacionDTO<EmpresaDTO>(); // Lista de elementos
reqListado: Promise<any> | null = null;
paramsPaginacion:any = {}

fecha = new Date();
mes = this.fecha.getMonth() + 1;
anio = this.fecha.getFullYear();
mesSeleccionado: any;
anioSeleccionado: any;

anioF: any;
anioFor: any;

constructor(protected listSvc: ListService, protected _snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.anioF = new Date();
  this.anioFor = this.anioF.getFullYear();
  for(let i=0; i<10; i++){
    this.anios[i] = this.anioFor
    this.anioFor = this.anioFor - 1
  }

  console.log(this.anios)
this.preparaParametrosPaginacion();
this.cargarLista();
}

cargarLista(){
if (this.reqListado != null) return;
this.reqListado = this.listSvc.getEmpresasAltasBajas(this.paramsPaginacion)
this.reqListado.then((data: any) => {
this.listaElementosAltas = data['altas'];
this.listaElementosBajas = data['bajas'];
console.log(this.listaElementosBajas)
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
this.paginado(mesFiltro)
}

obtenerAnio(anioFiltro: any){
  this.anioSeleccionado = anioFiltro;
  this.paginado(anioFiltro)
  }

paginado(pageElement:any) {
this.preparaParametrosPaginacion(pageElement)
this.cargarLista();
}

preparaParametrosPaginacion(params: any = {}) {
this.paramsPaginacion = {month: this.mesSeleccionado || this.mes , year: this.anioSeleccionado || this.anio}
if (params == null) return this.paramsPaginacion;
if (params.pageIndex) this.paramsPaginacion.page = params.pageIndex + 1;
if (params.pageSize) this.paramsPaginacion.limit = params.pageSize;
return this.paramsPaginacion;
}

}
