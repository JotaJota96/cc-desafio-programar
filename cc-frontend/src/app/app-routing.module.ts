import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './private/home/home.component';
import { LocalidadABMComponent } from './private/localidad-abm/localidad-abm.component';
import { RubroABMComponent } from './private/rubro-abm/rubro-abm.component';
import { TipoDeRelacionABMComponent } from './private/tipo-de-relacion-abm/tipo-de-relacion-abm.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'private/abm-rubro', component: RubroABMComponent },
  { path: 'private/abm-tipo-de-relacion', component: TipoDeRelacionABMComponent },
  { path: 'private/abm-localidad', component: LocalidadABMComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
