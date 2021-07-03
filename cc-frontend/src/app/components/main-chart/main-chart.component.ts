import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EmpresasRubroDTO } from 'src/app/classes/empresas-rubro-dto';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit, OnDestroy {

  empresas: EmpresasRubroDTO[] = [];
  num: number = 1;
  su: any;

  tableColumns: string[] = ['nombre', 'cantidad']; // columnas de la tabla

  constructor(private chartSvc: ChartService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.su = this.chartSvc.getEmpresasRubro().subscribe((emp: any) => {
      this.empresas = emp['principal'];
    })
  }

  ngOnDestroy() {
    this.su.unsubscribe();
  }

}
