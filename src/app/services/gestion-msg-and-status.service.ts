import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionMsgAndStatusService {




  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/
  constructor(
    private translate : TranslateService
  ) {

    // this.initStatus();

    // this.initMessage();


   }

  /********************************************************************************************/
  /******************************************* Messages  **************************************/
  /********************************************************************************************/


  //Map message
  translateMapMsg = new Map<string,string>();

  private mapMsg = new Map< string,any>();

  /* start title Toastr */
  titleToastrError : string = '';//'Error';
  titleToastrSuccess : string = '';// 'Success';
  titleToastrWarning : string = '';// 'Warning';

  bodyToastrAny = "Une erreur s'est produite ";

  titleAlertFileError = "Un des documents de format pdf incorrect";


  unauthorized = "Vous n'êtes pas autorisé à accéder à cette ressource";
  elementExists = "Élément existe déjà";
  connectionRefused =  "Veuillez réessayer plus tard";
  unknownUsernamePassword = "Identifiant inconnu ou mot de passe incorrect";
  mailNotExist = "votre Email n'existe pas";


  //alert
  confirmButtonTextYes = 'Oui';
  confirmButtonTextNon = 'Non';
  cancelButtonText = 'Non';
  confirmButtonTextReason = 'Valider';




  /*------------------------  Soumission ------------------------*/
  /* start body Toastr */
  bodyToastrSoumissionAdd : string = "Soumission a été bien enregistré ";
  bodyToastrSoumissionUpdate : string = "Soumission a été bien modifié ";
  bodyToastrSoumissionDelete : string = "Soumission a été bien supprimé ";

  bodyToastrSoumissionValid : string = "Soumission a été bien validé ";
  bodyToastrSoumissionReject : string = "Soumission a été bien Rejeté ";

  /*------------------------  RapportDepart ------------------------*/
  /* start body Toastr */
  bodyToastrRapportDepartAdd : string = "Rapport de départ a été bien enregistré ";
  bodyToastrRapportDepartUpdate : string = "Rapport de départ a été bien modifié ";
  bodyToastrRapportDepartDelete : string = "Rapport de départ a été bien supprimé ";

  bodyToastrRapportDepartValid : string = "Rapport de départ a été bien validé ";
  bodyToastrRapportDepartReject : string = "Rapport de départ a été bien rejeté ";



  /*------------------------  user ------------------------*/
  /* start body Toastr */
  bodyToastrUserAdd : string = "Compte utilisateur a été bien enregistré ";
  bodyToastrUserUpdate : string = "Compte utilisateur a été bien modifié ";
  bodyToastrUserDelete : string = "Compte utilisateur a été bien supprimé ";

  bodyToastrDemaInscripValid : string = "Demande d'inscription a été bien traité ";

  /*------------------------  produit ------------------------*/
  /* start body Toastr */
  bodyToastrProduitAdd : string = "Produit a été bien enregistré ";
  bodyToastrProduitUpdate : string = "Produit a été bien modifié ";
  bodyToastrProduitDelete : string = "Produit a été bien supprimé ";

  /*------------------------  Variant ------------------------*/
  /* start body Toastr */
  bodyToastrVariantAdd : string = "Variant a été bien enregistré ";
  bodyToastrVariantUpdate : string = "Variant a été bien modifié ";
  bodyToastrVariantDelete : string = "Variant a été bien supprimé ";

  /*------------------------  Role ------------------------*/
  /* start body Toastr */
  bodyToastrRoleAdd : string = "Rôle a été bien enregistré ";
  bodyToastrRoleUpdate : string = "Rôle a été bien modifié ";
  bodyToastrRoleDelete : string = "Rôle a été bien supprimé ";


  /*------------------------  Menu ------------------------*/
  /* start body Toastr */
  bodyToastrMenuAdd : string = "Menu a été bien enregistré ";
  bodyToastrMenuUpdate : string = "Menu a été bien modifié ";
  bodyToastrMenuDelete : string = "Menu a été bien supprimé ";

  /*------------------------  entite ------------------------*/
  /* start body Toastr */
  bodyToastrEntiteAdd : string = "Entite a été bien enregistré ";
  bodyToastrEntiteUpdate : string = "Entite a été bien modifié ";
  bodyToastrEntiteDelete : string = "Entite a été bien supprimé ";

  /*------------------------  loadRepartition ------------------------*/
  /* start body Toastr */
  bodyToastrLoadRepartitionUpdate : string = "Affectation Workflow/Région au collaborateur a été bien modifié ";

  /*------------------------  DocumentRequested ------------------------*/
  /* start body Toastr */
  bodyToastrDocumentRequestedAdd : string = "Document demander a été bien enregistré ";
  bodyToastrDocumentRequestedUpdate : string = "Document demander a été bien modifié ";
  bodyToastrDocumentRequestedDelete : string = "Document demander a été bien supprimé ";

  /*------------------------  Function ------------------------*/
  /* start body Toastr */
  bodyToastrFunctionAdd : string = "Fonction a été bien enregistré ";
  bodyToastrFunctionUpdate : string = "Fonction a été bien modifié ";
  bodyToastrFunctionDelete : string = "Fonction a été bien supprimé ";

  /*------------------------  Diploma ------------------------*/
  /* start body Toastr */
  bodyToastrDiplomaAdd : string = "Diplôme a été bien enregistré ";
  bodyToastrDiplomaUpdate : string = "Diplôme a été bien modifié ";
  bodyToastrDiplomaDelete : string = "Diplôme a été bien supprimé ";

  /*------------------------  Categorie ------------------------*/
  /* start body Toastr */
  bodyToastrCategorieAdd : string = "Catégorie a été bien enregistré ";
  bodyToastrCategorieUpdate : string = "Catégorie a été bien modifié ";
  bodyToastrCategorieDelete : string = "Catégorie a été bien supprimé ";

  /*------------------------  Unite ------------------------*/
  /* start body Toastr */
  bodyToastrUniteAdd : string = "Unité a été bien enregistré ";
  bodyToastrUniteUpdate : string = "Unité a été bien modifié ";
  bodyToastrUniteDelete : string = "Unité a été bien supprimé ";

  /*------------------------  Material ------------------------*/
  /* start body Toastr */
  bodyToastrMaterialAdd : string = "Matiére a été bien enregistré ";
  bodyToastrMaterialUpdate : string = "Matiére a été bien modifié ";
  bodyToastrMaterialDelete : string = "Matiére a été bien supprimé ";

  /*------------------------  academie ------------------------*/
  /* start body Toastr */
  bodyToastrAcademieAdd : string = "Académie a été bien enregistré ";
  bodyToastrAcademieUpdate : string = "Académie a été bien modifié ";
  bodyToastrAcademieDelete : string = "Académie a été bien supprimé ";

   /*------------------------  direction ------------------------*/
  /* start body Toastr */
  bodyToastrDirectionAdd : string = "Direction a été bien enregistré ";
  bodyToastrDirectionUpdate : string = "Direction a été bien modifié ";
  bodyToastrDirectionDelete : string = "Direction a été bien supprimé ";

  /*------------------------  ModePaiement ------------------------*/
  /* start body Toastr */
  bodyToastrModePaiementAdd : string = "Mode paiement a été bien enregistré ";
  bodyToastrModePaiementUpdate : string = "Mode paiement a été bien modifié ";
  bodyToastrModePaiementDelete : string = "Mode paiement a été bien supprimé ";

  /*------------------------  Pays ------------------------*/
  /* start body Toastr */
  bodyToastrPaysAdd : string = "Pays a été bien enregistré ";
  bodyToastrPaysUpdate : string = "Pays a été bien modifié ";
  bodyToastrPaysDelete : string = "Pays a été bien supprimé ";

  /*------------------------  Ville ------------------------*/
  /* start body Toastr */
  bodyToastrVilleAdd : string = "Ville a été bien enregistré ";
  bodyToastrVilleUpdate : string = "Ville a été bien modifié ";
  bodyToastrVilleDelete : string = "Ville a été bien supprimé ";

  /*------------------------  RubriqueFinanciere ------------------------*/
  /* start body Toastr */
  bodyToastrRubriqueFinanciereAdd : string = "Complément d'information a été bien enregistré ";
  bodyToastrRubriqueFinanciereUpdate : string = "Rubrique financière a été bien modifié ";
  bodyToastrRubriqueFinanciereDelete : string = "Rubrique financière a été bien supprimé ";




    /*------------------------  xxxxx ------------------------*/
  /* start body Toastr */
  bodyToastrXXXAdd : string = "Compte xxxx a été bien enregistré ";
  bodyToastrXXXUpdate : string = "Compte xxxx a été bien modifié ";
  bodyToastrXXXDelete : string = "Compte xxxx a été bien supprimé ";



  /**************************************************************************************************/
  /*********************************************** Swal *********************************************/
  /**************************************************************************************************/


  /* start title confirmation Swal */
  titleSwal : string =  "";
  titleSwalMotifRejet = "";
  titleSwalMotifComplement = "";
  textSwalMotif = "";
  /*------------------- Activited Accout With AssociationI -------------------*/

  getBodySwalConfirmActivitedAccoutWithAssociationImpossible(name : any){
    return "لم يتم تفعيل الجمعية  "+" < <b>"+name+" </b>> "+"بعد";
  }

  /*------------------------  Soumission ------------------------*/

  getBodySwalConfirmSoumissionDelete(name : any){
    return "Vous êtes sur le point de supprimer la soumission '"+name+"' ";
  };

  /*------------------------  RapportDepart ------------------------*/

  getBodySwalConfirmRapportDepartDelete(name : any){
    return "Vous êtes sur le point de supprimer le rapport depart '"+name+"' ";
  };

  /*------------------------  user ------------------------*/
  getBodySwalConfirmUserDelete(name : any){
    return "Vous êtes sur le point de supprimer le compte utilisateur '"+name+"' ";
  };

  /*------------------------  produit ------------------------*/
  getBodySwalConfirmProduitDelete(name : any){
    return "Vous êtes sur le point de supprimer le Produit '"+name+"' ";
  };
  getBodySwalConfirmProduitDeleteImpossible(name : any){
    return "Impossible de supprimer ce produit. Le produit a plusieurs des dépendances.";
  }
  /*------------------------  Variant ------------------------*/
  getBodySwalConfirmVariantDelete(name : any){
    return "Vous êtes sur le point de supprimer le Variant '"+name+"' ";
  };
  getBodySwalConfirmCollaborateurDeleteImpossible(name : any){
    return "Impossible de supprimer ce compte. Le compte a plusieurs des dépendances.";
  }

  /*------------------------  role ------------------------*/
  getBodySwalConfirmRoleDelete(name : any){
    return "Vous êtes sur le point de supprimer le rôle '"+name+"' ";
  };

  getBodySwalConfirmRoleDeleteImpossible(name : any){
    return "Impossible de supprimer le rôle < <b>"+name+" </b>>. Certain(s) utilisateurs ont toujours ce rôle dans l'application.";

  }

  /*------------------------  menu ------------------------*/
  getBodySwalConfirmMenuDelete(name : any){
    return "Vous êtes sur le point de supprimer le menu '"+name+"' ";
  };

  /*------------------------  Entite ------------------------*/

  getBodySwalConfirmEntiteDelete(name : any){
    return "Vous êtes sur le point de supprimer l'entite '"+name+"' ";
  };


  /*------------------------  DocumentRequested ------------------------*/

  getBodySwalConfirmDocumentRequestedDelete(name : any){
    return "Vous êtes sur le point de supprimer le document demander code '"+name+"' ";
  };

    /*------------------------  Function ------------------------*/

    getBodySwalConfirmFunctionDelete(name : any){
      return "Vous êtes sur le point de supprimer la fonction '"+name+"' ";
    };

    /*------------------------  Diploma ------------------------*/

    getBodySwalConfirmDiplomaDelete(name : any){
      return "Vous êtes sur le point de supprimer la diplôme '"+name+"' ";
    };

    /*------------------------  Categorie ------------------------*/

    getBodySwalConfirmCategorieDelete(name : any){
      return "Vous êtes sur le point de supprimer la Catégorie '"+name+"' ";
    };

    /*------------------------  Unite ------------------------*/

    getBodySwalConfirmUniteDelete(name : any){
      return "Vous êtes sur le point de supprimer l'unité '"+name+"' ";
    };

    /*------------------------  Material ------------------------*/

    getBodySwalConfirmMaterialDelete(name : any){
      return "Vous êtes sur le point de supprimer la matiére '"+name+"' ";
    };

    /*------------------------  Academie ------------------------*/

    getBodySwalConfirmAcademieDelete(name : any){
      return "Vous êtes sur le point de supprimer l'académie '"+name+"' ";
    };


    /*------------------------  Direction ------------------------*/

    getBodySwalConfirmDirectionDelete(name : any){
      return "Vous êtes sur le point de supprimer la direction '"+name+"' ";
    };
    /*------------------------  ModePaiement ------------------------*/

    getBodySwalConfirmModePaiementDelete(name : any){
      return "Vous êtes sur le point de supprimer le mode paiement '"+name+"' ";
    };

    /*------------------------  Pays ------------------------*/

    getBodySwalConfirmPaysDelete(name : any){
      return "Vous êtes sur le point de supprimer le pays '"+name+"' ";
    };

    /*------------------------  Ville ------------------------*/

    getBodySwalConfirmVilleDelete(name : any){
      return "Vous êtes sur le point de supprimer la ville '"+name+"' ";
    };

    /*------------------------  RubriqueFinanciere ------------------------*/

    getBodySwalConfirmRubriqueFinanciereDelete(name : any){
      return "Vous êtes sur le point de supprimer la Rubrique financière '"+name+"' ";
    };

    /*------------------------  Account ------------------------*/
  //message de confirmation
  getBodySwalConfirmAcountChangeStatus(status: string, name : any){

    let bodySwalConfirm : any = "";
    let titleWf : any= "";

    console.log('getBodySwalConfirmAcountChangeStatus/status =>'+status)
    switch(status) {
      case "DEACTIVATED": {
        bodySwalConfirm =  name+" "+ this.getMessage("ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-1")+
        this.getMessage("ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-2");
         break;
      }
      case "PENDING": {
        console.log("getBodySwalConfirmAcountChangeStatus/PENDING")
        bodySwalConfirm =  name+" "+ this.getMessage("ACCOUNT-SWAL-VALID-BODY-PENDING-1")+
        this.getMessage("ACCOUNT-SWAL-VALID-BODY-PENDING-2");
         break;
      }
      case "ACTIVATED": {
        bodySwalConfirm =  name+" "+ this.getMessage("ACCOUNT-SWAL-VALID-BODY-ACTIVATED-1")+
        this.getMessage("ACCOUNT-SWAL-VALID-BODY-ACTIVATED-2");
         break;
      }
      case "DELETED": {
        bodySwalConfirm = name+" "+ this.getMessage("ACCOUNT-SWAL-VALID-BODY-DELETED-1")+
        this.getMessage("ACCOUNT-SWAL-VALID-BODY-DELETED-2");
         break;
      }
      case "BLOCKED": {
        bodySwalConfirm =name+" "+ this.getMessage("ACCOUNT-SWAL-VALID-BODY-BLOCKED-1")+
        this.getMessage("ACCOUNT-SWAL-VALID-BODY-BLOCKED-2");
         break;
      }
      default: {
         //statements;
         break;
      }
   }

   return bodySwalConfirm;

  };


  /*------------------------  xxxxx ------------------------*/

  getBodySwalConfirmXXXDelete(name : any){
    return "Vous êtes sur le point de supprimer le compte xxxxx '"+name+"' ";
  };


  getBodySwalConfirmDemandeInscripValid(isAccepter: boolean, name : any){
    if(isAccepter == true)
      return "Vous êtes sur le point d'accepter la demande d'inscription pour l'utilisateur '"+name+"' ";
    else
      return "Vous êtes sur le point de rejeter la demande d'inscription pour l'utilisateur '"+name+"' ";
  };




  //message de confirmation
  getBodySwalConfirmSMOrRDOrRMChangeStatus(status: string,wf : string, name : any){

    let bodySwalConfirm : any = "";
    let titleWf : any= "";
    if(wf == "SM"){
      titleWf = this.getMessage("SWAL-VALID-TITLE-WF-SM");
    }
    else if(wf == "RD"){
      titleWf =  this.getMessage("SWAL-VALID-TITLE-WF-RD");
    }
    else if(wf == "RP"){
      titleWf = this.getMessage("SWAL-VALID-TITLE-WF-RP");
    }
    else if(wf == "RF"){
      titleWf = this.getMessage("SWAL-VALID-TITLE-WF-RF");
    }
    else{
      titleWf = this.getMessage("SWAL-VALID-TITLE-WF-RMP");
    }

    switch(status) {
      case "PEC": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-PEC-1")+" "+
        this.getMessage("SWAL-VALID-BODY-PEC-2");
         break;
      }
      case "CTR": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-CTR-1")+" "+
        this.getMessage("SWAL-VALID-BODY-CTR-2");
         break;
      }
      case "CI": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-CI-1");
         break;
      }
      case "A": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-A-1")+" "+
        this.getMessage("SWAL-VALID-BODY-A-2");
         break;
      }
      case "V": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-V-1")+" "+
        this.getMessage("SWAL-VALID-BODY-V-2");
         break;
      }
      case "RC":
      case "R": {
        bodySwalConfirm = this.getMessage("SWAL-VALID-BODY-R-1")+" "+
        this.getMessage("SWAL-VALID-BODY-R-2");
         break;
      }
      default: {
         //statements;-
         break;
      }
   }

   return bodySwalConfirm;

  };

  //message de returner
  getBodyToastrSMOrRDOrRMChangeStatus(status: string,wf : string){
    let bodyToastr : any= "";
    let titleWf : any = "";
    if(wf == "SM"){
      titleWf = this.getMessage("RMP-SM-DET-TIP") ;
    }
    else if(wf == "RD"){
      titleWf = this.getMessage("RMP-RD-DET-TIP");;
    }
    else if(wf == "RP"){
      titleWf = this.getMessage("RMP-RP-DET-TIP");;
    }
    else if(wf == "RF"){
      titleWf = this.getMessage("RMP-RF-DET-TIP");;
    }
    else{
      titleWf = this.getMessage("RMP-RMP-DET-TIP");;
    }

    switch(status) {
      case "PEC": {
        bodyToastr = this.getMessage("TOASTR-VALID-BODY-PEC");
         break;
      }
      case "CTR": {
        bodyToastr = ""+this.getMessage("TOASTR-VALID-BODY-CTR");
         break;
      }
      case "CI": {
        bodyToastr = this.getMessage("TOASTR-VALID-BODY-CI");
         break;
      }
      case "A": {
        bodyToastr = ""+this.getMessage("TOASTR-VALID-BODY-A");
         break;
      }
      case "V": {
        bodyToastr = ""+this.getMessage("TOASTR-VALID-BODY-V");
         break;
      }
      case "RC":
      case "R": {
        bodyToastr = ""+this.getMessage("TOASTR-VALID-BODY-R");
         break;
      }
      default: {
         //statements;
         break;
      }
   }

   return bodyToastr;


  }


  //init Message for step
  initMessage(){

    this.translate.get('MSGERROR-ANY-500')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-ANY-500', valueText);
    });

    this.translate.get('MSGERROR-ANY')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-ANY', valueText);
    });



    this.translate.get('MSGERROR-UN-AUTHORIZED')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-UN-AUTHORIZED', valueText);
    });
    this.translate.get('MSGERROR-CONNECTION-REFUSED')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-CONNECTION-REFUSED', valueText);
    });
    this.translate.get('MSGERROR-UNKNOWN-USERNAME-PASSWORD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-UNKNOWN-USERNAME-PASSWORD', valueText);
    });
    this.translate.get('MSGERROR-MAIL-NOT-EXIST')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-MAIL-NOT-EXIST', valueText);
    });
    this.translate.get('MSGERROR-ELEMENT-EXISTS')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-MAIL-NOT-EXIST', valueText);
    });
    this.translate.get('MSGERROR-UN-AUTHORIZED-EDIT-PROFIL')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-UN-AUTHORIZED-EDIT-PROFIL', valueText);
    });

    /*----------------------- account -------------------------*/
    this.translate.get('validation-oldPassword-and-oldPassword-incorrect')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('validation-oldPassword-and-oldPassword-incorrect', valueText);
    });
    this.translate.get('validation-password-valid')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('validation-password-valid', valueText);
    });

    /* -------------------- Validation SM,RD,RMP,RFIN ------------------ */
    this.translate.get('SWAL-CONFIRM')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-CONFIRM', valueText);
    this.titleSwal = valueText;
    });
    this.translate.get('SWAL-MOTIF-REJET')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-MOTIF-REJET', valueText);
    this.titleSwalMotifRejet = valueText;
    });
    this.translate.get('SWAL-CI')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-CI', valueText);
    this.titleSwalMotifComplement = valueText;
    });
    this.translate.get('SWAL-TEXT-MSG')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-TEXT-MSG', valueText);
    this.textSwalMotif = valueText;
    });

    /* -------------------- Association ------------------ */
    this.translate.get('ASS-VALID-DELETE-IMPOSSIBLE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ASS-VALID-DELETE-IMPOSSIBLE', valueText);
    });


    /* -------------------- AP ------------------ */
    this.translate.get('AP-BODY-TOASTR-ADD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('AP-BODY-TOASTR-ADD', valueText);
    });
    this.translate.get('AP-BODY-TOASTR-UPDATE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('AP-BODY-TOASTR-UPDATE', valueText);
    });
    this.translate.get('AP-BODY-TOASTR-FILEUPLOAD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('AP-BODY-TOASTR-FILEUPLOAD', valueText);
    });
    this.translate.get('AP-BODY-TOASTR-DELETE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('AP-BODY-TOASTR-DELETE', valueText);
    });
    this.translate.get('AP-BODY-TOASTR-DELETE-CONFIRM')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('AP-BODY-TOASTR-DELETE-CONFIRM', valueText);
    });


    /* -------------------- ASSOCIATION ------------------ */
    this.translate.get('ASS-BODY-TOASTR-ADD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ASS-BODY-TOASTR-ADD', valueText);
    });
    this.translate.get('ASS-BODY-TOASTR-UPDATE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ASS-BODY-TOASTR-UPDATE', valueText);
    });
    this.translate.get('ASS-BODY-TOASTR-DELETE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ASS-BODY-TOASTR-DELETE', valueText);
    });
    this.translate.get('ASS-BODY-TOASTR-DELETE-CONFIRM')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ASS-BODY-TOASTR-DELETE-CONFIRM', valueText);
    });

    this.translate.get('SWAL-VALID-TITLE-WF-SM')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-TITLE-WF-SM', valueText);
    });
    this.translate.get('SWAL-VALID-TITLE-WF-RD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-TITLE-WF-RD', valueText);
    });
    this.translate.get('SWAL-VALID-TITLE-WF-RMP')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-TITLE-WF-RMP', valueText);
    });
    this.translate.get('SWAL-VALID-TITLE-WF-RP')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-TITLE-WF-RP', valueText);
    });
    this.translate.get('SWAL-VALID-TITLE-WF-RF')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-TITLE-WF-RF', valueText);
    });

    /*--------------------- RF-TITLE ------------------------*/
    this.translate.get('RMP-RF2-TITLE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('RMP-RF2-TITLE', valueText);
    });
    this.translate.get('RMP-RF3-TITLE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('RMP-RF3-TITLE', valueText);
    });
    this.translate.get('RMP-RF4-TITLE')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('RMP-RF4-TITLE', valueText);
    });




    this.translate.get('SWAL-VALID-BODY-PEC-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-PEC-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-PEC-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-PEC-2', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-CTR-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-CTR-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-CTR-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-CTR-2', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-CI-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-CI-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-A-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-A-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-A-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-A-2', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-V-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-V-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-V-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-V-2', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-R-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-R-1', valueText);
    });
    this.translate.get('SWAL-VALID-BODY-R-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('SWAL-VALID-BODY-R-2', valueText);
    });


    this.translate.get('TOASTR-VALID-BODY-PEC')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-PEC', valueText);
    });
    this.translate.get('TOASTR-VALID-BODY-CTR')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-CTR', valueText);
    });
    this.translate.get('TOASTR-VALID-BODY-CI')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-CI', valueText);
    });
    this.translate.get('TOASTR-VALID-BODY-A')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-A', valueText);
    });
    this.translate.get('TOASTR-VALID-BODY-V')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-V', valueText);
    });
    this.translate.get('TOASTR-VALID-BODY-R')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-VALID-BODY-R', valueText);
    });



    this.translate.get('TOASTR-ADD')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-ADD', valueText);
    });
    this.translate.get('TOASTR-EDIT')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-EDIT', valueText);
    });
    this.translate.get('TOASTR-SEND').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('TOASTR-SEND', valueText);
    });

    this.translate.get('MSGERROR-FILE-EMPTY').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-FILE-EMPTY', valueText);
    });
    this.translate.get('MSGERROR-FILE-EMPTY-OR-BAD').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('MSGERROR-FILE-EMPTY-OR-BAD', valueText);
    });
    this.translate.get('MSGERROR-TABLE-EMPTY').subscribe((valueText: string) => {
      //init msg
      this.translateMapMsg.set('MSGERROR-TABLE-EMPTY', valueText);
      });


    /*---------------- account -----------------*/
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-PENDING-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-PENDING-1', valueText);
    });
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-PENDING-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-PENDING-2', valueText);
    });

    this.translate.get('ACCOUNT-SWAL-VALID-BODY-ACTIVATED-1')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-ACTIVATED-1', valueText);
    });
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-ACTIVATED-2')
    .subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-ACTIVATED-2', valueText);
    });

    this.translate.get('ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-1').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-1', valueText);
    });
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-2').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-DEACTIVATED-2', valueText);
    });

    this.translate.get('ACCOUNT-SWAL-VALID-BODY-DELETED-1').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-DELETED-1', valueText);
    });
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-DELETED-2').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-DELETED-2', valueText);
    });

    this.translate.get('ACCOUNT-SWAL-VALID-BODY-BLOCKED-1').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-BLOCKED-1', valueText);
    });
    this.translate.get('ACCOUNT-SWAL-VALID-BODY-BLOCKED-2').subscribe((valueText: string) => {
    //init msg
    this.translateMapMsg.set('ACCOUNT-SWAL-VALID-BODY-BLOCKED-2', valueText);
    });


    this.translate.get('ACCOUNT-DET-TITLE')
    .pipe(
      tap((valueText: string) => {
        this.mapMsg.set('ACCOUNT-DET-TITLE', valueText);
      }),
      switchMap((selNode) => this.translate.get('TOASTR-VALID-BODY-TRAITE')),
      // takeUntil(this.onDestroy),
    )
    .subscribe((valueText: string) => {
      //init msg
      this.bodyToastrDemaInscripValid =   this.mapMsg.get('ACCOUNT-DET-TITLE') +" "+ valueText;
      });



    /*---------------- Alert -----------------*/
    this.translate.get('BTN-YES')
    .subscribe((valueText: string) => {
    //init msg
    this.confirmButtonTextYes = valueText;
    });
    this.translate.get('BTN-CANCEL')
    .subscribe((valueText: string) => {
    //init msg
    this.cancelButtonText = valueText;
    });
    this.translate.get('BTN-VALID')
    .subscribe((valueText: string) => {
    //init msg
    this.confirmButtonTextReason = valueText;
    });


    }

  getMessage(keyMsg: string) {
    return this.translateMapMsg.get(keyMsg);
  }





  /********************************************************************************************/
  /**************************************** Gestion Status  ***********************************/
  /********************************************************************************************/

    //Map status for soumission/rapport
    private mapStatusSoumisOrRapport = new Map<
    string,
    any
    /*
    {
      code: string;
      status?: string;
      title?: string;
      color: string;
      readonlyDetail: boolean;
      showDetail: boolean;
    }
    */
  >();


    /*========================== start Gestion status ==============================*/
  //init status
  initStatus(){

    this.translate.get('STATUS-SAISE')
    .pipe(
      tap((valueText: string) => {

        this.mapStatusSoumisOrRapport.set('R', {
          status: valueText,
        });

      }),

      switchMap((selNode) => this.translate.get('TITLE-SAISE')),
      // takeUntil(this.onDestroy),
    )
    .subscribe((valueText: string) => {

    //init status
    this.mapStatusSoumisOrRapport.set('SM',
    {
      code: 'SM',
      status:this.mapStatusSoumisOrRapport.get('R').status,
      title: valueText,
      color: 'badge-info',
      readonlyDetail: true,
      showDetail: false,
      });

    //init status
    this.mapStatusSoumisOrRapport.set('RD',
    {
    code: 'RD',
    status:this.mapStatusSoumisOrRapport.get('R').status,
    title: valueText,
    color: 'badge-info',
    readonlyDetail: true,
    showDetail: false,

    });

    //init status
    this.mapStatusSoumisOrRapport.set('RP',
    {
    code: 'RP',
    status:this.mapStatusSoumisOrRapport.get('R').status,
    title: valueText,
    color: 'badge-info',
    readonlyDetail: true,
    showDetail: false,

    });

    //init status
    this.mapStatusSoumisOrRapport.set('RF',
    {
    code: 'RF',
    status:this.mapStatusSoumisOrRapport.get('R').status,
    title: valueText,
    color: 'badge-info',
    readonlyDetail: true,
    showDetail: false,

    });

    })




    this.translate.get('STATUS-E')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('E', {
      code: 'E',
      status: valueText,
      title: valueText,
      color: 'badge-primary',
      readonlyDetail: false,
      showDetail: true,
    });
    })




    this.translate.get('STATUS-PEC')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('PEC', {
      code: 'PEC',
      status: valueText,
      title: valueText,
      color: 'badge-warning',
      readonlyDetail: false,
      showDetail: true,
    });
    })




    this.translate.get('STATUS-CTR')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('CTR', {
      code: 'CTR',
      status: valueText,
      title: valueText,
      color: 'badge-warning',
      readonlyDetail: false,
      showDetail: true,
    });
    })

    // this.mapStatusSoumisOrRapport.set('RC', {
    //   code: 'RC',
    //   status: 'Rejet',
    //   title: 'Rejet par contrôleur',
    //   color: 'bg-rc',
    //   readonlyDetails: false,
    //   showDetail: true,
    // });



    this.translate.get('STATUS-CI')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('CI', {
      code: 'CI',
      status: valueText,
      title: valueText,
      color: 'badge-warning',
      readonlyDetail: false,
      showDetail: true,
    });
    })




    this.translate.get('STATUS-A')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('A', {
      code: 'A',
      status: valueText,
      title: valueText,
      color: 'badge-warning',
      readonlyDetail: false,
      showDetail: true,
    });
    })




    this.translate.get('STATUS-V')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('V', {
      code: 'V',
      status: valueText,
      title: valueText,
      color: 'badge-success',
      readonlyDetail: true,
      showDetail: true,
    });
    })




    this.translate.get('STATUS-R')
    .subscribe((valueText: string) => {
    //init status
    this.mapStatusSoumisOrRapport.set('R', {
      code: 'R',
      status: valueText,
      title: valueText,
      color: 'badge-danger',
      readonlyDetail: true,
      showDetail: true,
    });
    })

  }

  getStatusSoumis(status: string) {

    if (['SM1', 'SM2', 'SM3'].includes(status))
      status = 'SM';
      return this.mapStatusSoumisOrRapport.get(status);

  }

  getStatusRapport(status: string) {

    status = status.replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '') ;
      return this.mapStatusSoumisOrRapport.get(status);

  }

  /*========================== end Gestion status ==============================*/

}
