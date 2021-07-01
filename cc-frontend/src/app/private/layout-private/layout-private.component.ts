import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss']
})
export class LayoutPrivateComponent {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer | null = null;

  innerWidth:number = 1280;
  constructor() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1280 && this.drawer) this.drawer.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (this.drawer)
    if ( this.innerWidth > 1280 && event.target.innerWidth <= 1280 ) this.drawer.close();
    else if ( this.innerWidth < 1280 && event.target.innerWidth >= 1280 ) this.drawer.open();
    
    this.innerWidth = event.target.innerWidth;
  }
}
