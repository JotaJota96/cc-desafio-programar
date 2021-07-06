import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { ChartService } from 'src/app/services/chart.service';

declare var Chart: any;

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, AfterViewInit, OnDestroy {

  empresas: EmpresasRubroDTO[] = [];

  @Input() num: any;
  myChart: any;

  constructor(private chartSvc: ChartService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.chartSvc.getEmpresasRubro().then((emp: any) => {
      this.empresas = emp['principal'];

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

      var ctx = document.getElementById('myChartDonut')
      this.myChart = new Chart(
        ctx,
        config
      );
    })
  }

  ngOnDestroy() {
    if (this.myChart != null) this.myChart.destroy();
  }
}