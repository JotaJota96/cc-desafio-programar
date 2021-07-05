import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { EmpresaComponent } from 'src/app/private/empresa/empresa.component';
import { LoginComponent } from '../login/login.component';
import { LayoutPublicComponent } from './layout-public.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
      { path: 'empresa/:id', component: EmpresaComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutPublicRoutingModule { }
