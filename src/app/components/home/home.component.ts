import { tap, switchMap, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/interfaces/parametrages/offer';
import { GestionMsgAndStatusService } from 'src/app/services/gestion-msg-and-status.service';
import { HandleStatusService } from 'src/app/services/help/handle-status.service';
import { UtilsService } from 'src/app/services/help/utils.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { Select2OptionData } from 'ng-select2';
import { ReferencesService } from 'src/app/services/references.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/help/alert.service';
import { Tag } from 'src/app/interfaces/tag';
import { MetaTagService } from 'src/app/services/meta-tag.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchCategorie : string = "";
  imgHero : Array<string> = ['hero-01.png','hero-02.png'];
  offers: Offer[] = [];

  list: any[] = [0,1,2,3];//list

  /********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/

  /* ---------- start metadat ------------- */
  listMetadat : Array<Tag> = [];
  public listRegionStr: string = "";
  listMetadatDelete : Array<string> = [];
  /* ----------- end metadat -------------- */

  formLogin: FormGroup;

  public listRegionSelect: Array<Select2OptionData> = [];

  public listStudyLevelSelect: Array<Select2OptionData> = [
    { id: 'B', text: 'Bac' },
    { id: 'B2', text: 'Bac+2' },
    { id: 'B3', text: 'Bac+3' },
    { id: 'B5', text: 'Bac+5' },
    { id: 'B8', text: 'Bac+8' },
  ];

  public listWorkModelSelect: Array<Select2OptionData> = [
    { id: 'OnSite', text: 'sur site' },
    { id: 'Hybride', text: 'Hybride' },
    { id: 'Remote', text: 'à distance' },
  ];

  public listExperienceSelect: Array<Select2OptionData> = [
    { id: 'JUNIOR', text: 'débutant' },
    { id: 'TwoYEARS', text: '2 ans' },
    { id: 'ThreeYEARS', text: '3 ans' },
    { id: 'FiveYEARS', text: '5 ans' },
  ];

  public listContractTypeSelect: Array<Select2OptionData> = [
    { id: '1', text: 'CDI' },
    { id: '2', text: 'CDD' },
    { id: '3', text: 'Freelance' },
  ];

  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /********************************************************************************************/


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private handleErrorServ: HandleStatusService,
    private messageServ: GestionMsgAndStatusService, //massagae for alert(toastr and Swal)
    private referencesService : ReferencesService,
    private toastr: ToastrService,
    private route: Router,
    private alertServ: AlertService, //property for alert(toastr and Swal)
    private metaTag : MetaTagService,
  ) {
    //initialize  Form
    this.formLogin = this.formBuilder.group({
      categorie: [""],
      ville: [""],
    });

    this.listMetadatDelete = metaTag.listMetadatDelete;
    this.removeMetaTag();
  }

  ngOnInit(): void {
    //init message
    this.messageServ.initMessage();

    // this.getlastDixPublishedOffersPublicFromBack();

    this.initListMetadat();
    this.addMetaTag();
  }

  onFormSubmit(form : FormGroup): void {
    console.log(this.formLogin.invalid)
    if (this.formLogin.invalid) { return }

  }

  doAuthUser(){
    let isAuth = this.authService.isConnected();
    console.log("doAuthUser " + isAuth);
    if(isAuth){
      if(this.authService.loadRole() == "ROLE_NEXPROMA")
        this.route.navigate(["/offres"]);
      else
        this.route.navigate(["/mes-offres"]);
    }
  }


  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/

  // Function to map experience ID to text
  private mapExperienceToText(experienceId: string): string {
    const experience = this.listExperienceSelect.find(
      (exp) => exp.id == experienceId
    );
    return experience ? experience.text : 'Unknown';
  }
  // Function to map WorkModel ID to text
  private mapWorkModelToText(workModelId: string): string {
    const workModel = this.listWorkModelSelect.find(
      (exp) => exp.id == workModelId
    );
    return workModel ? workModel.text : 'Unknown';
  }
  // Function to map studyLevel ID to text
  private mapStudyLevelToText(studyLevelId: string): string {
    const studyLevel = this.listStudyLevelSelect.find(
      (exp) => exp.id == studyLevelId
    );
    return studyLevel ? studyLevel.text : 'Unknown';
  }
  // Function to map ContractType ID to text
  private mapContractTypeToText(contractTypeId: any): string {
    const contractType = this.listContractTypeSelect.find(
      (exp) => exp.id == contractTypeId
    );
    console.log(contractType);
    return contractType ? contractType.text : 'Unknown';
  }
  // Function to map region ID to text
  private mapRegionToText(regionId: any): string {
    const region = this.listRegionSelect.find(
      (exp) => exp.id == regionId
    );
    return region ? region.text : 'Unknown';
  }

    /* get last 10  Publishes Offers */
    getlastDixPublishedOffersPublicFromBack() {
      this.referencesService
      .getAllRegionFromBack()
      .pipe(
        tap({
          next: (res: any) => {
            console.log("getReferences =>")
            console.log(res?._embedded)
            this.listRegionSelect = res?._embedded?.regions?.map((x: any) => {
              this.listRegionStr+=x.labelFr+", ";
              return { id: x.id, text: x.labelFr };
            });

            //Start add meta tag
            let tagListRegionStr : Tag = {key:"geo.placename",value:this.listRegionStr}
            this.metaTag.addTag(tagListRegionStr);
            //End add meta tag

            return this.listRegionSelect;
          },
          error: (error) => {
              // error is here, but we can only call side things.

              this.handleErrorServ.onHandleCodeStatus(error);
              return null;
          },
          }
          )
          ,filter((region ) => region != null )
      ).subscribe(
        (listOffer: Offer[]) => {
          console.log("getlastDixPublishedOffersPublicFromBack =>");
          console.log(listOffer);
          //Start add meta tag
          let tag;
          if(listOffer.length && listOffer.length >0){
             tag = {key:"Nombre-des-offres-publiées",value:""+listOffer.length}
          }else{
             tag = {key:"Nombre-des-offres-publiées",value:"0"}
          }
          this.metaTag.addTag(tag);
          //End add meta tag

          if (!UtilsService.isEmptyArray(listOffer))
            this.offers = listOffer
            .map((offer, i) =>{

              offer.experience = this.mapExperienceToText(offer.experience);
              offer.workModel = this.mapWorkModelToText(offer.workModel);
              offer.studyLevel = this.mapStudyLevelToText(offer.studyLevel);
              offer.contractTypeStr = this.mapContractTypeToText(offer.contractTypeId);
              offer.regionStr = this.mapRegionToText(offer.regionId);
              return { id: i + 1, ...offer}
            }
            );

        },
        (error) => {

          this.handleErrorServ.onHandleCodeStatus(error);
        }
      );


    }


    goOfferDetails(reference : string){
      this.route.navigate(['view-offre-public', reference]);
    }


    viewAllOffer(){
      let isAuth = this.authService.isConnected();
      console.log("doAuthUser " + isAuth);
      if(isAuth){
        if(this.authService.loadRole() == "ROLE_NEXPROMA")
          this.route.navigate(["/offres"]);
        else
          this.route.navigate(["/mes-offres"]);
      }
      else{
        this.route.navigate(["/login"]);
      }
    }

    initListMetadat(){
      this.listMetadat.push({key:"title",value:"home | NexProMas Project"});
      this.listMetadat.push({key:"author",value:"NexProMas-Project"});
      this.listMetadat.push({key:"og:title",value:"home | NexProMas-Project"});
      this.listMetadat.push({key:"og:type",value:"website"});
      this.listMetadat.push({key:"og:image",value:"http://localhost:4200/assets/images/hero-01.png"});
      this.listMetadat.push({key:"og:url",value:"http://localhost:4200/"});
      this.listMetadat.push({key:"og:description",value:"Platform NexProMas-Project"});
      this.listMetadat.push({key:"og:site_name",value:"NexProMas-Project"});
      this.listMetadat.push({key:"og:locale",value:"fr_FR"});
      this.listMetadat.push({key:"geo.region",value:"MA"});
    }


    addMetaTag(){
      if(!UtilsService.isEmptyArray(this.listMetadat)){
        //add all description/title
        this.listMetadat.forEach(
          (md:any) => {
            this.metaTag.addTag(md);
          }
        )
      }
    }


    removeMetaTag(){
      if(!UtilsService.isEmptyArray(this.listMetadatDelete)){
        this.listMetadatDelete.forEach(
          (md:any) => {
            console.log("labelKey => "+md)
            if(md && !UtilsService.isEmptyString(md))
              this.metaTag.removeTag(md);
          }
        )
      }
    }

}
