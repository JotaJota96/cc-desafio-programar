import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { LocalidadABMComponent } from '../localidad-abm/localidad-abm.component';
import { RubroABMComponent } from '../rubro-abm/rubro-abm.component';
import { TipoDeRelacionABMComponent } from '../tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { LayoutPrivateComponent } from './layout-private.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      { path: 'abm-rubro', component: RubroABMComponent },
      { path: 'abm-tipo-de-relacion', component: TipoDeRelacionABMComponent },
      { path: 'abm-departamento', component: DepartamentoAbmComponent },
      { path: 'abm-localidad', component: LocalidadABMComponent },
      { path: 'empresa', component: EmpresaListadoComponent },
      { path: 'empresa/:id', component: EmpresaComponent },
      { path: '**', redirectTo: 'abm-rubro' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPrivateRoutingModule {}
