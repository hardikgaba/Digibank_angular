// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isUserLoggedIn()) {
      return true;
    } else {
      // If the user is not logged in, navigate to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isUserLoggedIn(): boolean {
    // Check your authentication logic here
    // For example, check if the user is present in session storage
    const user = sessionStorage.getItem('currentUser');
    return !!user; // Returns true if the user is logged in, false otherwise
  }
}
