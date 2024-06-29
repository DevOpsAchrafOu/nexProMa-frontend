import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/help/utils.service';

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
   private router : Router,
 ) { }

 ngOnInit(): void {

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


}


