import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  // constructor(
  //   private translate : TranslateService
  // ) { }

  /**************************************************************************************************/
  /********************************************** Toastr ********************************************/
  /**************************************************************************************************/

  configToastr : any = { timeOut: 5000,progressBar : true,closeButton :true};
  configToastr10S : any = { timeOut: 10000,progressBar : true,closeButton :true};


  /**************************************************************************************************/
  /*********************************************** Swal *********************************************/
  /**************************************************************************************************/
  //Map message
  translateMapMsg = new Map<string,string>();


  showCancelButton = true;
  confirmButtonColorYes = '#1877F2';
  confirmButtonColorNon = '#F85057';
  cancelButtonColor = '#007bff';



  //init Message for step
  initMessage(){


    }

}
