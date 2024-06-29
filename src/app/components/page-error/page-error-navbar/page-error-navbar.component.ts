import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/help/utils.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-page-error-navbar',
  templateUrl: './page-error-navbar.component.html',
  styleUrls: ['./page-error-navbar.component.css']
})
export class PageErrorNavbarComponent implements OnInit {

  /********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/


  rtl: boolean = false; //par défaul Francais (false)


  currentUserName : string = "";
  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/

 constructor(
   private authServ: AuthService,
   private router : Router,
 ) { }

 ngOnInit(): void {


 }



  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/


  opportunites(){
    let role = this.authServ.loadRole();
    if(role && !UtilsService.isEmptyString(role)){
      if(role == "ROLE_NEXPROMA")
        this.router.navigate(["/offres"]);
      else if(role == "ROLE_RECRUTEUR")
        this.router.navigate(["/mes-offres"]);
    }
    else{
      this.router.navigate(["/login"]);
    }
  }
}



