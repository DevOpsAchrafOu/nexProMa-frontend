import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
   private router : Router,
 ) { }

 ngOnInit(): void {


 }



  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/


  opportunites(){
    this.router.navigate(["/"]);
  }
}



