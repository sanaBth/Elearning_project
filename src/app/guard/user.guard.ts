import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) { }
  public userconnected: User
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.userconnected = JSON.parse(localStorage.getItem('userconnected') || 'null');

    if (this.userconnected) {

      return true;
    }
    this.router.navigate(['/home'])
    return false;
  }
}
