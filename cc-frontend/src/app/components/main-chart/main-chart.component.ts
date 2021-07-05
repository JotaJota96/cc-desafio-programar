import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { ChartService } from 'src/app/services/chart.service';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';


@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class MainChartComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];
  num: number = 1;

  tableColumns: string[] = ['nombre', 'cantidad']; // columnas de la tabla
  listaElementos: PaginacionDTO<EmpresasRubroDTO> = new PaginacionDTO<EmpresasRubroDTO>(); // Lista de elementos

  reqListado: Promise<any> | null = null;

  constructor(protected chartSvc: ChartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarLista()
  }

  ngAfterViewInit(): void {
    this.chartSvc.getEmpresasRubro().then((emp: any) => {
      this.empresas = emp['principal'];
    })
  }

  cargarLista(pageElement: any = null) {
    if (this.reqListado != null) return;
    this.reqListado = this.chartSvc.getEmpresasRubro(this.preparaParametrosPaginacion(pageElement))
    this.reqListado.then((data: any) => {
      this.listaElementos = data['principal'];
    })
      .catch((error) => {
        this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado",'', { duration: 500 });
      })
      .finally(() => {
        this.reqListado = null;
      });

  }

  preparaParametrosPaginacion(params: any) {
    let ret: any = {paginado: null};
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }

}
