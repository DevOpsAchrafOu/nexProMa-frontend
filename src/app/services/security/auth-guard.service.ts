import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /********************************************************************************************/

  constructor(private authServ: AuthService,private router:Router) { }

  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.authServ.isConnected()) {
        return resolve(true);
      }
      else {
        this.router.navigate(["/login"]);
        return resolve(false);
      }
    }
    );
  }
}
