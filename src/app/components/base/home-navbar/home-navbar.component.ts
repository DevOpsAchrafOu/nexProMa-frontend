import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/help/utils.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {


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

  let connectedUser = this.authServ.loadConnectedUser();

  if(connectedUser){
    if(connectedUser?.nom){
      this.currentUserName =connectedUser?.nom;//+" "+connectedUser?.preno

    }
    else if(connectedUser?.login){
      let login = connectedUser?.login;
      const index: number = login.toLowerCase().indexOf("@");
      this.currentUserName =index != -1 ?  login.substring(0,index):login;//+" "+connectedUser?.prenom
    }
  }



 }



  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

 //for show/hide sidebar
//  onSidebarCollapse(){
//   this.isActiveInChildNav = !this.dataMenu.menu;
//   //cahange data Shared
//   this.sharedData.changeDataMenu({ menu: this.isActiveInChildNav });
//  }


//  sendData(arg : any) {
//   this.sideBarActiveChild.emit(arg);
//   this.sideBarCloseChild.emit(false);

//   console.log("sideBarActive=> "+ arg);
//   console.log("sideBarClose=> "+false);

//  }

 onLogout(){
  this.authServ.onLogout();
 }

//  searchByNumDossier(){
//   if(this.searchNumDossier && this.searchNumDossier != ""){
//     this.router.navigate(["/historique-operation"],
//     {
//       queryParams: {
//         numDossier : this.searchNumDossier,
//        },
//       queryParamsHandling: 'merge', // remove to replace all query params by provided
//     });
//     this.searchNumDossier = "";
//   }
//  }

  onGoEditPassword(){
      this.router.navigate(["/edit-password"])
    }

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


