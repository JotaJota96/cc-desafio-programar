import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/classes/user-dto';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss']
})
export class LayoutPrivateComponent {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer | null = null;
  mantenimiento:boolean = false;
  graficas = false;
  listas = false;
  user?:UserDTO = new UserDTO();
  innerWidth: number = 1280;

  constructor(private accessService: AccessService, private router: Router) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1280 && this.drawer) this.drawer.close();
    this.user = this.accessService.getLoggedUser();
    if (this.user == undefined) this.router.navigate(['/']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
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

  mostrar(){
    if(this.graficas) this.graficas = false
    else this.graficas = true
  }

  mostrarLista(){
    if(this.listas) this.listas = false
    else this.listas = true
  }

  cont:number = 0;
  start() {
    if (this.cont > 8) {
      alert("No jodas mas");
    } else if (this.cont == 8) {
      alert(this.easterEgg(prompt("Jugemos por tu insistencia, eleji 👊, 🖐️, ✌️")));
    } else {
      this.cont++;
    }
  }
  easterEgg(_jugadorChoice: any) {
    const choices = ["🖐️", "👊", "✌️"];
    let jugadorChoice = null;
    switch (_jugadorChoice) {
      case "🖐️":case 1:case "papel":
        jugadorChoice = "🖐️";
        break;
      case "👊":case 0:case "piedra":
        jugadorChoice = "👊";
        break;
      case "✌️":case 2:case "tijera":
        jugadorChoice = "✌️";
        break;
      default:
        jugadorChoice =  null;
        break;
    } 
    const Choice = choices[Math.floor(Math.random() * 3)];
    return " Nosotros elejimos " + Choice + ", asi que GANAMOS !!!... Te hicimos perder el timpo en estra pabada"
  }
}
