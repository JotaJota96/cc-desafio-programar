import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'private',
    loadChildren: () => import('./private/layout-private/layout-private.module').then(m => m.LayoutPrivateModule)
  },
  { 
    path: '',
    loadChildren: () => import('./public/layout-public/layout-public.module').then(m => m.LayoutPublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
