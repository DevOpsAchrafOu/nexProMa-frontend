import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  /********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/


  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/

  constructor() { }

  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

  /**
  * check if a string is empty
  * @param s string.
  */
  public static isEmptyString(s : string ) : boolean {
    return (s == null || s == "" || s == undefined || s	== "null" ||  s.length == 0);
  }


  /**
  * check if a string array is empty
  * @param str string array.
  */
  public static isEmptyStringArray(str : string[]) : boolean  {
    let cnt : number = 1;

    if(str == null) return true;

    if(str != null && str.length == 0) return true;

    for (const s of str) {
      if(this.isEmptyString(s)) cnt++;
    }

    return cnt == str.length;
  }

  /**
  * check if a array is empty
  * @param ary any array.
  */
    public static isEmptyArray(ary : any[]) : boolean  {
      let cnt : number = 1;

      if(ary == null) return true;

      if(ary != null && ary.length == 0) return true;

      return false;
    }


  /**
  * check if a string array is empty
  * @param str string array and number array.
  */
  public static isEmpty(str : string[] ,ids : number[] ) : boolean {
    let cnt : number = 0;

    if(str == null) return true;

    if(str != null && str.length==0) return true;

    for (const id of ids) {
      if(this.isEmptyString(str[id])) {
        cnt++;
      }
    }
    return cnt==ids.length;
  }


  /**
  * check if a objet is empty
  * @param obj Object to test whether or not it is an array.
  */
  public static isEmptyObjet(obj : any ) : boolean {
    return (obj == null || obj == "" || obj == undefined || Object.keys(obj).length === 0 );
  }

}
