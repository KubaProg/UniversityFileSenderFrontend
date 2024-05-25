import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;

    const isAuth = !!user;
    if (isAuth) {
      const roles = route.data['roles'] as Array<string>;
      if (roles && roles.indexOf(user.role!) === -1) {
        return this.router.createUrlTree(['/start']);
      }
      return true;
    }
    return this.router.createUrlTree(['/start']);
  }
}
