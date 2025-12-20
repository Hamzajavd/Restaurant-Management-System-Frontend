import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from "jwt-decode";
import { globalConstraint } from '../../shared/globalConstrain';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarService:SnackbarService
  ) {}

  canActivate(route:ActivatedRouteSnapshot):boolean {
    console.log("Route guard triggered ✅");
    interface MyJwtPayload {
      id: string;
      email: string;
       role: string;
      exp: number;
      iat?: number;
    }

    let expectedRoleArray = route.data['expectedRole'] as string[];
    const token = localStorage.getItem('token');  

    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const tokenpayload = jwtDecode<MyJwtPayload>(token);
      const userRole = tokenpayload.role || localStorage.getItem('role');

      if (this.auth.isauthenticated() && expectedRoleArray.includes(userRole!)) {
        return true;
      }
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
    

    
    this.snackbarService.openSnackBar(globalConstraint.unauthroized, globalConstraint.error);
   this.router.navigate(['/']);
    return false;
  }
}

