import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentLangService } from 'src/app/services/help/current-lang.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
/********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/


  dataUser : any;
  dataRole : any;
  today = new Date();


  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/

 constructor(
   private authServ: AuthService,
   private sharedData : SharedService,
 ) { }

 ngOnInit(): void {

    //extraire data Shared
    this.sharedData.currentDataCurrentUserName.subscribe(data => this.dataUser = data);
    //extraire data Shared
    this.sharedData.currentDataCurrentRole.subscribe(data => this.dataRole = data);
 }



  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/


 onLogout(){
  this.authServ.onLogout();
 }



}
