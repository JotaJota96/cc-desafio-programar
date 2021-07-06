import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaPersonaDTO } from '../classes/empresa-persona-dto';
import { AccessService } from '../services/access.service';

export enum Role {
  ADMIN = 0,
  USUARIO = 1,
  INVITADO = 2,
  ADMIN_USUARIO = 3,
}

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
    let roles:number[] = route.data.roles;
    if (roles.length == 0) return true;
    if (!this.service.isUserLogged()) return this.router.navigate(['/']).then(() => false);
    if (roles.includes(Role.ADMIN) && this.service.isUserInRole(Role.ADMIN)) return true;
    return true;
    /*
    
    if (roles.includes(Role.USUARIO) && this.service.isUserInRole(Role.USUARIO)) {
      if (!route.params || !route.params.id) return false; 
      const id = route.params.id;
      const user = this.service.getLoggedUser();
      let idMisEmpresa:string[] = [];
      if (user == undefined || user.persona == undefined || user.persona.empresa_persona == undefined) return false;
      idMisEmpresa = [];
      user.persona.empresa_persona.forEach((empresa_persona:EmpresaPersonaDTO) => {
        idMisEmpresa.push(empresa_persona.empresa_id?.toString() || '');
      });
      console.log(idMisEmpresa.includes(id));
      if (idMisEmpresa.includes(id)) return true;
    }
    this.router.navigate(['/home']);
    return false;
    */
  }
  
}
