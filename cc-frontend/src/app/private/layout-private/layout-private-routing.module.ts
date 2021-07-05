import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainChartComponent } from 'src/app/components/main-chart/main-chart.component';
import { PrivateLayoutGuard } from 'src/app/guards/private-layout.guard';
import { ChartEmpresaLocalidadComponent } from '../chart-empresa-localidad/chart-empresa-localidad.component';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaEditarComponent } from '../empresa-editar/empresa-editar.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { HomeComponent } from '../home/home.component';
import { LocalidadABMComponent } from '../localidad-abm/localidad-abm.component';
import { PersonaAbmComponent } from '../persona-abm/persona-abm.component';
import { RubroABMComponent } from '../rubro-abm/rubro-abm.component';
import { TipoDeRelacionABMComponent } from '../tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { UsuarioAbmComponent } from '../usuario-abm/usuario-abm.component';
import { LayoutPrivateComponent } from './layout-private.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      { path: 'home',                           canActivate: [PrivateLayoutGuard], data: { roles: [ 0, 1 ] },   component: HomeComponent },
      { path: 'abm-rubro',                      canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: RubroABMComponent },
      { path: 'abm-tipo-de-relacion',           canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: TipoDeRelacionABMComponent },
      { path: 'abm-departamento',               canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: DepartamentoAbmComponent },
      { path: 'abm-localidad',                  canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: LocalidadABMComponent },
      { path: 'empresa',                        canActivate: [PrivateLayoutGuard], data: { roles: [ 0, 1 ] }, component: EmpresaListadoComponent },
      { path: 'empresa/crear',                  canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: EmpresaEditarComponent },
      { path: 'empresa/:id',                    canActivate: [PrivateLayoutGuard], data: { roles: [ 0, 1 ] }, component: EmpresaComponent },
      { path: 'empresa/:id/edit',               canActivate: [PrivateLayoutGuard], data: { roles: [ 0, 1 ] }, component: EmpresaEditarComponent },
      { path: 'persona',                        canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: PersonaAbmComponent },
      { path: 'user',                           canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: UsuarioAbmComponent },
      { path: 'chart',                          canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: MainChartComponent },
      { path: 'grafico-empresas-rubro',         canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: MainChartComponent },
      { path: 'grafico-empresas-localidad',     canActivate: [PrivateLayoutGuard], data: { roles: [ 0 ] },    component: ChartEmpresaLocalidadComponent },
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPrivateRoutingModule {}
