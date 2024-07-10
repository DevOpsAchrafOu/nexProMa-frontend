import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/parametrages/offer';

interface article{
    id?:number;
    title?:string;
    price_del?:number;
    price?:number;
    link:string;
    name_img?:string;
    nbr_img?:number;
    nbr_img_ary?: Array<number>;
}

@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.css'],
})
export class BestProductComponent implements OnInit {

  articles: article[] = [];

  offers: Offer[] = [];

  itemProducts: any[] = [];//list for Desktop/tablet

  constructor(
    private route:Router
  ) {


    //init array for each product
    this.initArray(8);
  }

  ngOnInit(): void {

    this.articles =
    [
      {
          "id": 1,
          "title": "قفازات رياضية (Taille M, L) musculation, fitness, gym, sport",
          "price_del": 80,
          "price": 69,
          "link":"https://www.facebook.com/share/WhJtX2asozfHLhzi/",
          "name_img": "قفازات_رياضية_ musculation_fitness_gym_sport",
          "nbr_img": 8
      },
      {
          "id": 2,
          "title": "Montre de remok/camion pour Homme et Femme Collier",
          "price_del": 80,
          "price": 59,
          "link":"https://www.facebook.com/marketplace/item/1783001275560876/",
          "name_img": "Montre_de_remokcamion_pour_Homme_et_Femme_Collier",
          "nbr_img": 5
      },
      {
          "id": 3,
          "title": "منظف الأذن البصري الكهربائي الذكي مع نقطة الذقن وإزالة شمع الأذن",
          "price_del": 150,
          "price": 119,
          "link":"https://www.facebook.com/marketplace/item/442526575309775/",
          "name_img": "منظف_الأذن_البصري_الكهربائي_الذكي_مع_نقطة_الذقن_وإزالة_شمع_الأذن",
          "nbr_img": 10
      },
      {
          "id": 4,
          "title": "ساعة (One-Piece) تتخطى الزمن",
          "price_del": 80,
          "price": 59,
          "link":"https://www.facebook.com/marketplace/item/815513777194815/",
          "name_img": "ساعة_One_Piece_تتخطى_الزمن",
          "nbr_img": 5
      }

    ];

    for (let index = 0; index < this.articles.length; index++) {
      const article = this.articles[index];
      if(article.nbr_img && article.nbr_img!=null && article.nbr_img!=undefined){
        console.log("bofer get nbr_img_ary =>")
        article.nbr_img_ary=this.initArray(article.nbr_img);
      }
    }
    console.log("after get nbr_img_ary =>")
    console.log(this.articles)

  }

  initArray(nbrCas : number){
    let itemArticles: any[] = [];
    for (let index = 0; index < nbrCas; index++) {
      this.itemProducts.push(index+1);
      itemArticles.push(index+1);

    }
    return itemArticles;
  }

  goOfferDetails(reference: string) {
    // this.route.navigate(['view-offre-public', reference]);
  }

  viewAllOffer() {
    // this.route.navigate(["/mes-offres"]);
  }

  onSendMsgFb(){
    alert("onSendMsgFb =>")
  }

  onShowDetails(){
    alert("onShowDetails =>")  }
}

