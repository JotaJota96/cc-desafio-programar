import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];

  tableColumns: string[] = ['nombre', 'cantidad']; // columnas de la tabla
  listaElementos: PaginacionDTO<EmpresasRubroDTO> = new PaginacionDTO<EmpresasRubroDTO>(); // Lista de elementos

  reqListado: Promise<any> | null = null;

  constructor(private chartSvc: ChartService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.chartSvc.getEmpresasRubro().subscribe((emp: any) => {
      this.empresas = emp['principal'];
    })
  }

  // cargarLista(pageElement: any = null) {
  //   if (this.reqListado != null) return;
  //   this.reqListado = this.chartSvc.getEmpresasRubro(this.preparaParametrosPaginacion(pageElement))
  //   this.reqListado.then((data: any) => {
  //     this.listaElementos = data;
  //   })
  //     .catch((error) => {
  //       this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado", 'Undo');
  //     })
  //     .finally(() => {
  //       this.reqListado = null;
  //     });
  // }

  // preparaParametrosPaginacion(params: any) {
  //   if (params == null) return null;
  //   let ret: any = {};
  //   if (params.pageIndex) ret.page = params.pageIndex + 1;
  //   if (params.pageSize) ret.limit = params.pageSize;
  //   return ret;
  // }

}
