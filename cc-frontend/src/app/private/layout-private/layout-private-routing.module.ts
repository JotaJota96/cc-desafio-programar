import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainChartComponent } from 'src/app/components/main-chart/main-chart.component';
import { AltaBajaMesComponent } from '../alta-baja-mes/alta-baja-mes.component';
import { AniversarioEmpresaComponent } from '../aniversario-empresa/aniversario-empresa.component';
import { ChartEmpresaLocalidadComponent } from '../chart-empresa-localidad/chart-empresa-localidad.component';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
import { EmpresaRubroComponent } from '../empresa-rubro/empresa-rubro.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { HomeComponent } from '../home/home.component';
import { LocalidadABMComponent } from '../localidad-abm/localidad-abm.component';
import { RubroABMComponent } from '../rubro-abm/rubro-abm.component';
import { TipoDeRelacionABMComponent } from '../tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { LayoutPrivateComponent } from './layout-private.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'abm-rubro', component: RubroABMComponent },
      { path: 'abm-tipo-de-relacion', component: TipoDeRelacionABMComponent },
      { path: 'abm-departamento', component: DepartamentoAbmComponent },
      { path: 'abm-localidad', component: LocalidadABMComponent },
      { path: 'empresa', component: EmpresaListadoComponent },
      { path: 'empresa/:id', component: EmpresaComponent },
      { path: 'grafico-empresas-rubro', component: MainChartComponent },
      { path: 'grafico-empresas-localidad', component: ChartEmpresaLocalidadComponent },
      { path: 'empresas-rubro', component: EmpresaRubroComponent },
      { path: 'altas-bajas-mes', component: AltaBajaMesComponent },
      { path: 'aniversario-empresa', component: AniversarioEmpresaComponent },
      { path: '**', redirectTo: 'abm-rubro' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPrivateRoutingModule {}
