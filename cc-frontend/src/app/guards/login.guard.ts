import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private service: AccessService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Descomentar para activar el bloqueo de acceso
    // if (this.service.isUserLogged()) { // si el usuario ya está logueado no puede acceder al login
    //   if (this.service.isUserInRole(1)) { // rol administrador
    //     return this.router.navigate(['private']).then(() => false);
    //   } else if (this.service.isUserInRole(2)) { // rol de esos que modifican los datos de su empresa
    //     return this.router.navigate(['private']).then(() => false);
    //   }
    // }
    return true;
  }
  
}
