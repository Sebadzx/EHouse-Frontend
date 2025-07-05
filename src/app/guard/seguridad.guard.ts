import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard: CanActivateFn = (route, state)=> {
  let loginService: LoginService = inject(LoginService);
  let router: Router = inject(Router);
  if(loginService.getToken())
    return true;
  else{
    router.navigate(['login']).then(r => console.log("Se controló el acceso"));
    return false;
  }
};
