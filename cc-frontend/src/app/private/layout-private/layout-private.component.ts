import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ChartService } from 'src/app/services/chart.service';
@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss']
})
export class LayoutPrivateComponent {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer | null = null;

  graficas = false;
  listas = false;
  showComponent: number = 0;

  innerWidth: number = 1280;
  constructor(private chartSvc: ChartService) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1280 && this.drawer) this.drawer.close();

    console.log(this.showComponent)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.drawer)
      if (this.innerWidth > 1280 && event.target.innerWidth <= 1280) this.drawer.close();
      else if (this.innerWidth < 1280 && event.target.innerWidth >= 1280) this.drawer.open();

    this.innerWidth = event.target.innerWidth;
  }

  mostrar(){
    if(this.graficas) this.graficas = false
    else this.graficas = true
  }

  mostrarLista(){
    if(this.listas) this.listas = false
    else this.listas = true
  }

  mostrarComponent(num: number){
    this.showComponent = num

    this.chartSvc.setData(num)
  }
}
