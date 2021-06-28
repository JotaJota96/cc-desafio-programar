import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChartComponent } from './components/main-chart/main-chart.component';

const routes: Routes = [
  {
    path: 'chart',
    component: MainChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
