import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { ChartService } from 'src/app/services/chart.service';

declare var Chart: any;


@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];

  constructor(private chartSvc: ChartService) { 

  }

  ngOnInit(): void { 
    
  }

  ngAfterViewInit(): void {

    this.chartSvc.getEmpresasRubro().subscribe((emp: any) => {
      this.empresas = emp['principal'];

      let labels: any[] = [];

    let datos: any[] = [];

this.empresas.forEach(element => {
      labels.push(element.nombre)
      datos.push(element.count)
    });
    
     const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: datos
      }]
    };
    
     const config = {
      type: 'bar',
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
        document.getElementById('myChart'),
        config
      );
    })
  
  
  }

}
