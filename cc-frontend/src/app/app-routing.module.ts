import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'private',
    loadChildren: () => import('./private/layout-private/layout-private.module').then(m => m.LayoutPrivateModule)
  },
  { path: '**', redirectTo: 'private' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
