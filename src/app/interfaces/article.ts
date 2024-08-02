export interface Article {
  id?:number;
  title?:string;
  price_del?:number;
  price?:number;
  link:string;
  name_img?:string;
  nbr_img?:number;
  nbr_img_ary?: Array<number>;
  categorie?: string;
  percentage_redu? : number;
}
