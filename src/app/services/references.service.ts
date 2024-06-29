import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Qualification } from '../interfaces/references/qualification';
import { Region } from '../interfaces/references/region';
import { SecteurActivite } from '../interfaces/references/secteurActivite';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {



 /********************************************************************************************/
  /**************************************** The attributes  **********************************/
  /*******************************************************************************************/

  prefixe : string= "/references";


  /********************************************************************************************/
  /************************************* Initialization Referentiels  *************************/
  /********************************************************************************************/
  constructor(
    private httpClient : HttpClient
  ) { }




  /*-------------------- qualification ----------------------*/


  /* get qualification */
  getAllQualificationFromBack() : Observable<Qualification[]> {
    return this.httpClient.get<Qualification[]>(`${environment.api_nexProMa}`+this.prefixe+`/qualifications`);
  }


  /*-------------------- regions ----------------------*/

   /* get region */
   getAllRegionFromBack() : Observable<Region[]> {
    return this.httpClient.get<Region[]>(`${environment.api_nexProMa}`+this.prefixe+`/regions`);
  }

  /*-------------------- SecteurActivite ----------------------*/
    /* get secteurActivite */
    getAllSecteurActiviteFromBack() : Observable<SecteurActivite[]> {
      return this.httpClient.get<SecteurActivite[]>(`${environment.api_nexProMa}`+this.prefixe+`/secteurActivites`);
    }



}
