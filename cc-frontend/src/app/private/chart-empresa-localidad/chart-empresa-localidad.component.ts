import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { ChartService } from 'src/app/services/chart.service';

declare var Chart: any;

@Component({
  selector: 'app-chart-empresa-localidad',
  templateUrl: './chart-empresa-localidad.component.html',
  styleUrls: ['./chart-empresa-localidad.component.scss']
})
export class ChartEmpresaLocalidadComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];

  tableColumns: string[] = ['departamento', 'cantidad']; // columnas de la tabla

  constructor(private chartSvc: ChartService) {
    this.chartSvc.setData(2)
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.chartSvc.getEmpresasLocalidad().subscribe((emp: any) => {
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

}
