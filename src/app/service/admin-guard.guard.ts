import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  
  constructor(private router: Router,private _snackBar: MatSnackBar
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(sessionStorage.getItem('roleId'),"session");
      
    if(sessionStorage.getItem('roleId')!="3" ){
      return true;
    }else{
      this.router.navigate(['']);
      
      this._snackBar.open("Admin rights Required to access the Page","X");
      
      return false;
      
    }
  }
  
}
