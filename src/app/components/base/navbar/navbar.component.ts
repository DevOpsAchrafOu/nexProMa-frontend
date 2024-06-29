import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentLangService } from 'src/app/services/help/current-lang.service';
import { UtilsService } from 'src/app/services/help/utils.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  /********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/


  rtl: boolean = false; //par défaul Francais (false)

  isActiveInChildNav : boolean = false;
  @Output() sideBarActiveChild  = new EventEmitter<string>();
  @Output() sideBarCloseChild = new EventEmitter();
  @Input() isActiveInChild1: boolean = false;

  dataUser : any;
  dataMenu : any;
  dataAvatarLogo : any;
  today = new Date();
  searchNumDossier : string = "";
  role : string = "";
  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/

 constructor(
   private authServ: AuthService,
   private router : Router,
   private sharedData : SharedService,
   private currentLangService: CurrentLangService
 ) { }

 ngOnInit(): void {

  //extraire data Shared
  this.sharedData.currentDataCurrentUserName.subscribe(data => this.dataUser = data);
  this.sharedData.currentDataAvatarLogo.subscribe(data => this.dataAvatarLogo = data);
  this.sharedData.currentDataMenu.subscribe((data) => (this.dataMenu = data));


   //set CurrentUserName And AvatarLogo
   if(this.dataUser == "" || this.dataAvatarLogo){
    let connectedUser = this.authServ.loadConnectedUser();
    this.sharedData.setCurrentUserNameAndAvatarLogo(connectedUser);
   }

   let role = this.authServ.loadRole();
   if(role && !UtilsService.isEmptyString(role)){
      this.role =  role;
   }

    //get current lang
    this.rtl = this.currentLangService.isRTL();

 }



  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

 //for show/hide sidebar
 onSidebarCollapse(){
  console.log("onSidebarCollapse => "+this.isActiveInChildNav);
  this.isActiveInChildNav = !this.dataMenu.menu;
  //cahange data Shared
  this.sharedData.changeDataMenu({ menu: this.isActiveInChildNav });
 }


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


}

