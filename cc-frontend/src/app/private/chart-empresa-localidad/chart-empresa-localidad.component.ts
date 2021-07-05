import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { ChartService } from 'src/app/services/chart.service';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';

declare var Chart: any;

@Component({
  selector: 'app-chart-empresa-localidad',
  templateUrl: './chart-empresa-localidad.component.html',
  styleUrls: ['./chart-empresa-localidad.component.scss'],
  animations: [
    inCardAnimation, inInfoAnimation, inTitleAnimation
  ]
})
export class ChartEmpresaLocalidadComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];

  listaElementos: PaginacionDTO<EmpresasRubroDTO> = new PaginacionDTO<EmpresasRubroDTO>(); // Lista de elementos
  reqListado: Promise<any> | null = null;

  tableColumns: string[] = ['departamento', 'cantidad']; // columnas de la tabla
  num: number = 2;

  constructor(private chartSvc: ChartService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.cargarLista();
  }

  ngAfterViewInit() {
    this.chartSvc.getEmpresasLocalidad().then((emp: any) => {
      this.empresas = emp['departamento'];

      let labels: any[] = [];

      let datos: any[] = [];

      let color: any[] = this.chartSvc.color;

      this.empresas.forEach(element => {
        labels.push(element.nombre)
        datos.push(element.count)
      });

      const data = {
        labels: labels,
        datasets: [{
          label: 'Cantidad',
          backgroundColor: color,
          borderColor: 'rgb(255,255,255)',
          data: datos
        }]
      };

      const config = {
        type: 'doughnut',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };

      var myChart = new Chart(
        document.getElementById('myChartLocalidadDonut'),
        config
      );

      const configPie = {
        type: 'pie',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };

      var myChartLocalidad = new Chart(
        document.getElementById('myChartLocalidadPie'),
        configPie
      );
    })
  }

  cargarLista(pageElement: any = null) {
    if (this.reqListado != null) return;
    this.reqListado = this.chartSvc.getEmpresasLocalidad(this.preparaParametrosPaginacion(pageElement))
    this.reqListado.then((data: any) => {
      this.listaElementos = data['departamento'];
    })
      .catch((error) => {
        this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado",'', { duration: 500 });
      })
      .finally(() => {
        this.reqListado = null;
      });

  }

  preparaParametrosPaginacion(params: any) {
    let ret: any = { paginado: null };
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }
}
