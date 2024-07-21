import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/parametrages/offer';
import { Article } from 'src/app/interfaces/article';


@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.css'],
})
export class BestProductComponent implements OnInit {

  articles: Article[] = [];

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
          "title": "جهاز قياس ضغط الدم الذكي للذراع الاوتوماتيكي ✨ Tensiomètre Microlife📈🛍️🛒",
          "price": 169,
          "link": "https://www.facebook.com/marketplace/item/486208130997878/",
          "name_img": "جهاز_قياس_ضغط_الدم_الذكي_للذراع_Tensiomètre_الأوتوماتيكي",
          "nbr_img": 7,
          "categorie": "إلكترونيات"
      },
      {
          "id": 2,
          "title": "المقبس الذكي للتحكم في أي جهاز كهربائي🏘️، مثل التلفزيون أو المصباح أو مكيف الهواء.. عن بعد Wifi👌✨",
          "price": 119,
          "link": "https://www.facebook.com/marketplace/item/1182203986555595/",
          "name_img": "المقياس_الذكي_للتحكم_في_أي_جهاز_كهربائي",
          "nbr_img": 9,
          "categorie": "إلكترونيات"
      },
      {
          "id": 3,
          "title": "قفازات رياضية (Taille M, L) musculation, fitness, gym, sport",
          "price_del": 80,
          "price": 69,
          "link": "https://www.facebook.com/marketplace/item/374119532337246/",
          "name_img": "قفازات_رياضية_musculation_fitness_gym_sport_noire",
          "nbr_img": 7,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 4,
          "title": "Montre de romok/camion pour Homme et Femme, Collier, Pendentif, Cadeau ساعة شاحنات قلادة، هدية",
          "price_del": 80,
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/1783001275560876/",
          "name_img": "Montre_de_remokcamion_pour_Homme_et_Femme_Collier",
          "nbr_img": 4,
          "categorie": "إكسسوارات شخصية"
      }
    ];

    for (let index = 0; index < 4; index++) {
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

  viewAllProduct() {
    this.route.navigate(["/all-product"]);
  }

  onSendMsgFb(){
    alert("onSendMsgFb =>")
  }

  onShowDetails(){
    alert("onShowDetails =>")  }
}

