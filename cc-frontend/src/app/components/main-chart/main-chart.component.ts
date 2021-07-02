import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit {

  empresas: EmpresasRubroDTO[] = [];
 
  tableColumns: string[] = ['nombre', 'cantidad']; // columnas de la tabla

  constructor(private chartSvc: ChartService) {
    this.chartSvc.setData(1)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chartSvc.getEmpresasRubro().subscribe((emp: any) => {
      this.empresas = emp['principal'];
    })

  }

}
