import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor() { }

  isLangArb(){

    let lang = 'arb';//localStorage.getItem('lang');

    if(!lang || lang == "fr")
      return false;
    else
      return true;
  }
}
