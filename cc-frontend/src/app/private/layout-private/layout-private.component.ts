import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss']
})
export class LayoutPrivateComponent {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer | null = null;

  mantenimiento:boolean = false;


  innerWidth:number = 1280;
  constructor(private accessService: AccessService, private router: Router) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1280 && this.drawer) this.drawer.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (this.drawer)
    if ( this.innerWidth >= 1280 && event.target.innerWidth < 1280 ) this.drawer.close();
    else if ( this.innerWidth < 1280 && event.target.innerWidth >= 1280 ) this.drawer.open();
    
    this.innerWidth = event.target.innerWidth;
  }

  cerrarSesion(){
    this.accessService.deleteLoginData();
    this.router.navigate(['/']);
  }

  expandirMantenimiento(){
    if(this.mantenimiento) this.mantenimiento = false
    else this.mantenimiento = true
  }

}
