import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainChartComponent } from 'src/app/components/main-chart/main-chart.component';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
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
      { path: 'chart', component: MainChartComponent },
      { path: '**', redirectTo: 'abm-rubro' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPrivateRoutingModule {}
