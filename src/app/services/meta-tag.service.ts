import { Injectable } from '@angular/core';
import { UtilsService } from './help/utils.service';
import { Meta, Title } from '@angular/platform-browser';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
/********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/
  /* ---------- start metadat ------------- */
  listMetadatDelete : Array<string> = [];
  /* ----------- end metadat -------------- */

  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/
  constructor(private meta: Meta,
    private title: Title,
  ) {

    this.listMetadatDelete = [
      "title",
      "author",
      "og:title",
      "og:type",
      "og:image",
      "og:url",
      "og:description",
      "og:site_name",
      "og:locale",
      "geo.region",
      "geo.placename",
      "date",
      "og:type_contrat",
      "og:mode_travail",
      "Nombre-offres-publiees"];
  }


  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

  addTag(tag : Tag){
    console.log('addTag => ');
    let value : any = "";
    if(!UtilsService.isEmptyString(tag.key))
    {
      if(tag.key.trim() == "title"){
        this.title.setTitle(tag.value);
      }
      else{
        switch (tag.key.trim()) {
          //=============== key : other ==================
          case 'UTF-8':
            value =  {charset: tag.value.trim()};
            break;
          case 'X-UA-Compatible':
          case 'content-language':
            value =  {'http-Equiv': tag.key.trim(), 'content': tag.value.trim() };
            break;
          //=============== key : name ==================
          case 'viewport':
          case 'description':
          case 'keywords':
          case 'author':
          case 'robots':
          case 'google-site-verification':
          case 'generator':
          case 'twitter:card':
          case 'twitter:site':
          case 'twitter:image':
          case 'twitter:description':
            value =  {name: tag.key.trim(), content: tag.value.trim()};
            break;
          case 'date':
            value =  {name: 'date', content: tag.value.trim(), scheme: 'YYYY-MM-DD'};
            break;
          //=============== key : property ==================
          case 'og:type':
          case 'og:image':
          case 'og:title':
          case 'og:url':
          case 'og:description':
          case 'og:site_name':
          case 'og:locale':
          case 'article:modified_time':
          case 'article:publisher':

          case 'product:pretax_price:amount':
          case 'product:price:amount':
          case 'product:price:currency':
            value =  {property: tag.key.trim(), content: tag.value.trim()};
            break;
          default:
            value =  {name: tag.key.trim(), content: tag.value.trim()};
            break;
        }
        if(value){
          this.meta.addTag(value);
        }
      }
    }


  }

  getTag(key : string){
    console.log('getTag => '+key)
    let value : string = "";
    if(UtilsService.isEmptyString(key)){
      return null;

    }
    else{
      let metaEl: HTMLMetaElement | null = null;
      switch (key.trim()) {
        //=============== key : other ==================
        case 'UTF-8':
          metaEl =  this.meta.getTag(''+key.trim()+'');
          break;
        case 'X-UA-Compatible':
        case 'content-language':
          metaEl =  this.meta.getTag('http-Equiv = "'+key.trim()+'"');
          break;
        // case 'title':
        //   metaEl =  this.meta.getTag(''+key+'');
        //   break;
        //=============== key : name ==================
        case 'viewport':
        case 'description':
        case 'keywords':
        case 'author':
        case 'robots':
        case 'date':
        case 'google-site-verification':
        case 'generator':
        case 'twitter:card':
        case 'twitter:site':
        case 'twitter:image':
        case 'twitter:description':
          metaEl =  this.meta.getTag('name = "'+key.trim()+'"');
          break;
        //=============== key : property ==================
        case 'og:type':
        case 'og:image':
        case 'og:title':
        case 'og:url':
        case 'og:description':
        case 'og:site_name':
        case 'og:locale':
        case 'article:modified_time':
        case 'article:publisher':
        case 'product:pretax_price:amount':
        case 'product:price:amount':
        case 'product:price:currency':
          metaEl =  this.meta.getTag('property = "'+key.trim()+'"');
          break;
        default:
          break;
      }
      value = metaEl ? metaEl.content : "";
      console.log("metaEl => "+metaEl)
    }
    return !UtilsService.isEmptyString(value) ? value : null;
  }

  updateTag(tag : Tag){
    console.log('updateTag => ')
    let value : any = "";
    if(!UtilsService.isEmptyString(tag.key)){
      if(tag.key.trim() == "title"){
        this.title.setTitle(tag.value);
      }
      else
      {
        switch (tag.key.trim()) {
          //=============== key : other ==================
          case 'UTF-8':
            value =  {charset: tag.value.trim()};
            break;
          case 'X-UA-Compatible':
          case 'content-language':
            value =  {'http-Equiv': tag.key.trim(), 'content': tag.value.trim() };
            break;
          //=============== key : name ==================
          case 'viewport':
          case 'description':
          case 'keywords':
          case 'author':
          case 'robots':
          case 'google-site-verification':
          case 'generator':

          case 'twitter:card':
          case 'twitter:site':
          case 'twitter:image':
          case 'twitter:description':
            value =  {name: tag.key.trim(), content: tag.value.trim()};
            break;
          case 'date':
            value =  {name: 'date', content: tag.value.trim(), scheme: 'YYYY-MM-DD'};
            break;
          //=============== key : property ==================
          case 'og:type':
          case 'og:image':
          case 'og:title':
          case 'og:url':
          case 'og:description':
          case 'og:site_name':
          case 'og:locale':
          case 'article:modified_time':
          case 'article:publisher':

          case 'product:pretax_price:amount':
          case 'product:price:amount':
          case 'product:price:currency':
            value =  {property: tag.key.trim(), content: tag.value.trim()};
            break;
          default:
            break;
        }
        if(value){
          this.meta.updateTag(value);
        }
      }
    }


  }

  removeTag(key : string){
    console.log('removeTag => ')
    switch (key.trim()) {
      //=============== key : other ==================
      case 'UTF-8':
        this.meta.removeTag('"'+key+'"');
        break;
      case 'X-UA-Compatible':
      case 'content-language':
        this.meta.removeTag('http-Equiv = "'+key+'"');
        console.log('removeTag => other')
        break;
      //=============== key : name ==================
      case 'viewport':
      case 'description':
      case 'keywords':
      case 'author':
      case 'robots':
      case 'date':
      case 'google-site-verification':
      case 'generator':
      case 'twitter:card':
      case 'twitter:site':
      case 'twitter:image':
      case 'twitter:description':
        this.meta.removeTag('name = "'+key+'"');
        console.log('removeTag => name')
        break;
      //=============== key : property ==================
      case 'og:type':
      case 'og:image':
      case 'og:title':
      case 'og:url':
      case 'og:description':
      case 'og:site_name':
      case 'og:locale':
      case 'article:modified_time':
      case 'article:publisher':
      case 'product:pretax_price:amount':
      case 'product:price:amount':
      case 'product:price:currency':
       this.meta.removeTag('property = "'+key+'"');
       console.log('removeTag => property')
        break;
      default:
        this.meta.removeTag('name = "'+key+'"');
        break;
    }
  }


}
