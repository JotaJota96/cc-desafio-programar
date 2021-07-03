import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access.service';

/**
 * Este guard controla el acceso a la parte privada de administración
 */

@Injectable({
  providedIn: 'root'
})
export class PrivateLayoutGuard implements CanActivate {

  constructor(private router: Router, private service: AccessService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Descomentar para activar el bloqueo de acceso
    // if (!this.service.isUserLogged() || !this.service.isUserInRole(1)) {
    //   return this.router.navigate(['/']).then(() => false);
    // }
    return true;
  }
  
}
