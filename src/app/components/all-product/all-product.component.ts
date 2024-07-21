import { Categorie } from './../../interfaces/references/categorie';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  articlesOrg: Article[] = [];
  articles: Article[] = [];
  categories: string[] = [];

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
      },
      {
          "id": 5,
          "title": "(Taille S-M) قفازات تكتيكية رياضية 🔥 للتدريب، للتمرين، لركوب الدراجات ✅",
          "price_del": 80,
          "price": 50,
          "link": "https://www.facebook.com/marketplace/item/1167991804240825/",
          "name_img": "قفازات_قفازات_تكتيكية_رياضية_للتدريب_للتمرين_لركوب_الدراجات",
          "nbr_img": 5,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 6,
          "title": "جهاز التدليك وإزالة التشنجات و تخفيف آلام العضلات ✨",
          "price_del": 150,
          "price": 119,
          "link": "https://www.facebook.com/marketplace/item/1608004633132792/",
          "name_img": "جهاز_التدليك_إزالة_التشنجات_تخفيف_آلام_العضلات",
          "nbr_img": 10,
          "categorie": "المنزل والرفاهية"
      },
      {
          "id": 7,
          "title": "قفازات رياضية (Taille M, L) musculation, fitness, gym, sport",
          "price_del": 80,
          "price": 69,
          "link": "https://www.facebook.com/marketplace/item/3607467622898071/",
          "name_img": "قفازات_رياضية_musculation_fitness_gym_sport_vert",
          "nbr_img": 8,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 8,
          "title": "قفازات رياضية مع حماية المعصم أثناء مزاولة الرياضة(Taille S-M-L-XL) gants la salle sport",
          "price": 60,
          "link": "https://www.facebook.com/marketplace/item/991619612655025/",
          "name_img": "قفازات_رياضية_مع_حماية_للمعصم_أثناء_ممارسة_الرياضة_S_M_L_XL",
          "nbr_img": 9,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 9,
          "title": "منظف الأذن البصري الكهربائي الذكي مع أداة إزالة شمع الأذن 👌✨ Smart Visual Electric Ear Cleaner",
          "price": 119,
          "link": "https://www.facebook.com/marketplace/item/442526575309775/",
          "name_img": "منظف_الأذن_البصري_الكهربائي_الذكي_مع_نقطة_الذقن_وإزالة_شمع_الأذن",
          "nbr_img": 10,
          "categorie": "إلكترونيات"
      },
      {
          "id": 10,
          "title": "🪥🛍️🛒 Electric toothbrush- فرشاة أسنان كهربائية",
          "price": 79,
          "link": "https://www.facebook.com/marketplace/item/1231799168227839/",
          "name_img": "Electric_toothbrush_فرشاة_أسنان_كهربائية_مع_الشحن_مجانًا",
          "nbr_img": 4,
          "categorie": "إلكترونيات"
      },
      {
          "id": 11,
          "title": "هدية تتخطى الزمن: ساعة (One-Piece) بتصميم فريد لن ينساه أبدًا(ساعة أنيقة + توصيل مجاني Rabat Sale)",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/815513777194815/",
          "name_img": "ساعة_One_Piece_تتخطى_الزمن",
          "nbr_img": 4,
          "categorie": "إكسسوارات شخصية"
      },
      {
          "id": 12,
          "title": "Écouteur bluetooth Lenovo GM2 Pro - سماعات بلوتوث",
          "price": 89,
          "link": "https://www.facebook.com/marketplace/item/1546453326268385/",
          "name_img": "Écouteur_bluetooth_Lenovo_GM2_Pro_أبيض",
          "nbr_img": 1,
          "categorie": "إلكترونيات"
      },
      {
          "id": 13,
          "title": "أربطة معصم قابلة للتعديل للرجال والنساء ، تمنع التهاب المفاصل ، أسورة معصم مرنة (2 قطعة)",
          "price": 49,
          "link": "https://www.facebook.com/marketplace/item/2439880789556119/",
          "name_img": "أربطة_معصم_قابلة_للتعديل_للرجال_والنساء_تمنع_التهاب_المفاصل_أسود",
          "nbr_img": 1,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 14,
          "title": "Montre de Moteur pour Homme et Femme, Collier, Pendentif, Cadeau ساعة دراجة نارية قلادة، هدية",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/1470115906943774/",
          "name_img": "Montre_de_Moteur_pour_Homme_et_Femme_Collier_Pendentif_Cadeau",
          "nbr_img": 3,
          "categorie": "إكسسوارات شخصية"
      },
      {
          "id": 15,
          "title": "💻Support Pc Portable aluminium Livraison gratuite à (Salé et Rabat🚴🏻) حامل للحاسوب 👩‍💻🧑‍💻",
          "price": 99,
          "link": "https://www.facebook.com/marketplace/item/3385036455133117/",
          "name_img": "Support_Pc_Portable_aluminium_Livraison_gratuite",
          "nbr_img": 8,
          "categorie": "المنزل والرفاهية"
      },
      {
          "id": 16,
          "title": "جهاز لاسلكي للتحكم في المصباح عن بعد -😴✨- Télécommande de contrôle de lampe sans fil 15m 🚴🏻🤩",
          "price": 89,
          "link": "https://www.facebook.com/marketplace/item/1861561767604820/",
          "name_img": "جهاز_لاسلكي_للتحكم_في_المصباح_عن_بعد",
          "nbr_img": 7,
          "categorie": "المنزل والرفاهية"
      },
      {
          "id": 17,
          "title": "Écouteur bluetooth Lenovo GM2 Pro - سماعات بلوتوث",
          "price": 119,
          "link": "https://www.facebook.com/marketplace/item/1180186063433744/",
          "name_img": "Écouteur_bluetooth_Lenovo_GM2_Pro_أسود",
          "nbr_img": 6,
          "categorie": "إلكترونيات"
      },
      {
          "id": 18,
          "title": "Petit support PC portable en aluminium auto-adhésif neuf 👌محمول من الألومنيوم-صغير- ذاتي اللصق🛒",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/7724524354309189/",
          "name_img": "Petit_support_PC_portable_en_aluminium_auto_neuf",
          "nbr_img": 9,
          "categorie": "إلكترونيات"
      },
      {
          "id": 19,
          "title": "🏘️Répéteur et point d'accès wifi Augmente le signal يلتقط ويضخم و يعيد إطلاق اشارة الوايفاي 👌",
          "price": 109,
          "link": "https://www.facebook.com/marketplace/item/945522320649958/",
          "name_img": "Repeteur_et_point_acces_wifi",
          "nbr_img": 9,
          "categorie": "إلكترونيات"
      },
      {
          "id": 20,
          "title": "Montre de 3awd/Cheval pour Homme et Femme, Collier, Pendentif, Cadeau ساعة حصان/الخيول قلادة، هدية",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/499442862417027/",
          "name_img": "Montre_de_3awd_Cheval_pour_Homme_et_Femme_Collier_Pendentif_Cadeau",
          "nbr_img": 3,
          "categorie": "إكسسوارات شخصية"
      },
      {
          "id": 21,
          "title": "Montre de Moteur pour Homme et Femme, Collier, Pendentif, Cadeau ساعة دراجة نارية قلادة، هدية",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/1470115906943774/",
          "name_img": "Montre_de_Moteur_pour_Homme_et_Femme_Collier_Pendentif_Cadeau",
          "nbr_img": 1,
          "categorie": "إكسسوارات شخصية"
      },
      {
          "id": 22,
          "title": "حقيبة خصر خفيفة لحمل هاتفك📱, أثناء التمرين في القاعات الرياضية والجري",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/1499819943948444/",
          "name_img": "حقيبة_خصر_خفيفة_لحمل_هاتفك_أثناء_التمرين_أو_في_اللقاءات_الرياضية",
          "nbr_img": 1,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 23,
          "title": "⌚Smart watch Colmi P71 Original ✨ساعة جديدة للرجال والنساء ذات ساعة عالية 💯",
          "price": 169,
          "link": "https://www.facebook.com/marketplace/item/0123456789/",
          "name_img": "Smart_watch_Colmi_P71_original",
          "nbr_img": 6,
          "categorie": "إلكترونيات"
      },
      {
          "id": 24,
          "title": "حقيبة الصدر/الظهر المضادة للماء والمتعددة الاستخدامات ✨ Sac de poitrine-dos (Rabat, Sale) 🛍️🛒",
          "price": 109,
          "link": "https://www.facebook.com/marketplace/item/463205156399365/",
          "name_img": "حقيبة_الصدر_الظهر_المضادة_للماء",
          "nbr_img": 7,
          "categorie": "المنزل والرفاهية"
      },
      {
          "id": 25,
          "title": "هدية تتخطى الزمن: ساعة (One-Piece) بتصميم فريد لن ينساه أبدًا(ساعة أنيقة + توصيل مجاني Rabat Sale)",
          "price": 70,
          "link": "https://www.facebook.com/marketplace/item/831038982280235/",
          "name_img": "ساعة_One_Piece_تتخطى_الزمن_هدية_بتصميم_فريد_لن_تندم_على_شرائها",
          "nbr_img": 3,
          "categorie": "إكسسوارات شخصية"
      },
      {
          "id": 26,
          "title": "مشبك الأنف لمكافحة الشخير😴✨- Pince-nez contre les ronflements livraison Gratuit (Rabat, Sale)🛍️🛒",
          "price": 30,
          "link": "https://www.facebook.com/marketplace/item/838354468138367/",
          "name_img": "مشبك_الأن_لمكافح_الشخير_Pince_nez_contre_ronflements",
          "nbr_img": 10,
          "categorie": "المنزل والرفاهية"
      },
      {
          "id": 27,
          "title": "Compteur de vélo كونتور لقياس المسافات و السرعة للدراجات الهوائية",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/449695474341836/",
          "name_img": "Compteur_vélo_كونتور_لقياس_المسافات_السرعة_للدراجات_الهوائية",
          "nbr_img": 5,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 28,
          "title": "Thermomètre infrarouge sans contact ✨ ميزان الحرارة عن بعد 💯",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/1924617831289389/",
          "name_img": "Thermomètre_infrarouge_sans_contact_ميزان_الحرارة_عن_بعد",
          "nbr_img": 6,
          "categorie": "إلكترونيات"
      },
      {
          "id": 29,
          "title": "(Taille S-M-L-XL) قفازات حمل الاثقال🏋️‍♂️قفازات تكتيكية رياضية 🔥 للتدريب، للتمرين، لركوب الدراجات ✅",
          "price_del": 80,
          "price": 59,
          "link":"https://www.facebook.com/marketplace/item/1120380392399170/",
          "name_img": "قفازات_حمل_الاثقال_قفازات_تكتيكية_رياضية_للتدريب_للتمرين_لركوب_الدراجات",
          "nbr_img": 7,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 30,
          "title": "خوذة أمان للأطفال لحماية الرأس ومضادة للسقوط✨Casque de Sécurisée pour votre Bébé Antichoc 🛍️🛒",
          "price": 59,
          "link": "https://www.facebook.com/marketplace/item/2735837756576347/",
          "name_img": "خوذة_أمان_للأطفال_لحماية_الرأس_مضادة_للسقوط_casque_securisee_Bebe",
          "nbr_img": 5,
          "categorie": "رياضة ولياقة"
      },
      {
          "id": 31,
          "title": "بوق  لدراجة ✨Klaxon de vélo 🚴🏻 et trottinette Livraison Gratuite (Salé+Rabat) 💯",
          "price": 69,
          "link": "https://www.facebook.com/marketplace/item/1778235716003654/",
          "name_img": "بوق_إلكتروني_لدراجة_Klaxon_velo_trottinette",
          "nbr_img": 6,
          "categorie": "رياضة ولياقة"
      }
    ];
    this.articlesOrg = this.articles;

    this.categories = ["All","إلكترونيات","رياضة ولياقة","إكسسوارات شخصية","المنزل والرفاهية"]

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

  getArticleByCategorie(categorie : string){
    if(categorie == "All")
      this.articles =  this.articlesOrg;
    else
      this.articles =  this.articlesOrg.filter(article => article.categorie == categorie);
  }



 getIconByCategorie(categorie:string) {
  let categoriesIcons:any = {
    "All": "fas fa-list",
    "إلكترونيات": "fas fa-tv",
    "رياضة ولياقة": "fas fa-dumbbell",
    "إكسسوارات شخصية": "fas fa-user",
    "المنزل والرفاهية": "fas fa-home"
  };
    return categoriesIcons[categorie] || "fas fa-question"; // Icône par défaut si la catégorie n'existe pas
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

