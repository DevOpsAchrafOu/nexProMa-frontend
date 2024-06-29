import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { JwtLogin } from 'src/app/interfaces/jwt-login';
import { GestionMsgAndStatusService } from 'src/app/services/gestion-msg-and-status.service';
import { AlertService } from 'src/app/services/help/alert.service';
import { CurrentLangService } from 'src/app/services/help/current-lang.service';
import { UtilsService } from 'src/app/services/help/utils.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

/********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/

  token: string = "";
  formLogin: FormGroup;
  isSubmitLogin = false;
  messageError: string = "";
  currentLang : string = "";
  reference : string = "";

  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr : ToastrService,
    private alertServ : AlertService,
    private route: Router,
    public transtale : TranslateService,//pour utiliser dans View
    private currnetLangService : CurrentLangService,
    private messageServ : GestionMsgAndStatusService,
    private activatedRoute : ActivatedRoute

  ) {
        //initialize  Form
        this.formLogin = this.formBuilder.group({
          username: ["", Validators.required],
          password: ["", Validators.required],
        })

    //get params from URL
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params => "+params.isFromRecap+" "+params.stepFrom);
      this.reference = params.ref ? params.ref : "" ;
    });


  }

  ngOnInit() : void {
    //user is connected or not
    this.doAuthUser();

    // get current lang
    this.currentLang = localStorage.getItem('currentLang') || 'fr';
    this.currentLang = this.currnetLangService.currentLang(this.currentLang);
    //init message
    this.messageServ.initMessage();
  }

  /********************************************************************************************/
  /**************************************  The functions **************************************/
  /********************************************************************************************/




  onFormSubmit(form : FormGroup): void {

    this.isSubmitLogin = true;
    if (this.formLogin.invalid) { return }

    let user: JwtLogin = {...form.value};
    this.authService.login(user)
    .pipe(
    map(response => {
      console.log(response.headers);
      return {
        "Authorization":response.headers.get("Authorization"),
        "Role":response.headers.get("Role")
        }
    }))
      .subscribe(
        (response : any) => {
          if(response ){
            console.log(response)
            let token = response.Authorization;
            let role = response.Role;
            this.authService.saveToken(token);
            this.authService.saveRole(role);
            if(this.reference && !UtilsService.isEmptyString(this.reference))
            {
              // this.goOfferDetails(this.reference);
              if(role == "ROLE_NEXPROMA")
                {
                  this.route.navigate(["/offres"],
                  {
                    queryParams: {
                      ref :  this.reference},
                    queryParamsHandling: 'merge', // remove to replace all query params by provided
                  });
                }
                else if(role == "ROLE_RECRUTEUR")
                {
                  this.route.navigate(["/mes-offres"],{queryParams: {ref :  this.reference},queryParamsHandling: 'merge', });
                }
            }
            else{
              if(role == "ROLE_NEXPROMA")
                this.route.navigate(["/offres"]);
              else if(role == "ROLE_RECRUTEUR")
                this.route.navigate(["/mes-offres"]);
            }

          }
          else{
            this.toastr.error("", "N'existe pas",this.alertServ.configToastr);
          }

        },
        error => {
          if(error.status === 401){
            console.log("401")
            this.toastr.error("", this.messageServ.getMessage('MSGERROR-UNKNOWN-USERNAME-PASSWORD'),this.alertServ.configToastr);
          }
          else{
            console.log("!401")
            // this.toastr.error("", error.message,this.alertServ.configToastr);
            this.toastr.error("", this.messageServ.getMessage('MSGERROR-CONNECTION-REFUSED'),this.alertServ.configToastr);
          }
        }
      );
  }

  doAuthUser(){
    let isAuth = this.authService.isConnected();
    console.log("doAuthUser " + isAuth);

    if(isAuth){
      let  role = this.authService.loadRole();
      console.log('login/doAuthUser/ role '+role);
      if(UtilsService.isEmptyString(role))
      {
        this.authService.deleteToken();
        this.authService.deleteRole();
        this.authService.deleteConnectedUser();
      }else{
        if(this.reference && !UtilsService.isEmptyString(this.reference))
        {
          this.goOfferDetails(this.reference);
        }
        else{

          if( role == "ROLE_NEXPROMA")
                this.route.navigate(["/offres"]);
              else if(role == "ROLE_RECRUTEUR")
                this.route.navigate(["/mes-offres"]);
          }
      }

      }
  }

  changeCurrentLang(lang : string){
    this.currentLang =this.currnetLangService.currentLang(lang);
  }

  goOfferDetails(reference : string){
    if(this.reference && !UtilsService.isEmptyString(this.reference))
      this.route.navigate(['view-offre', this.reference]);
  }

  onInscription()
  {
    if(this.reference && !UtilsService.isEmptyString(this.reference))
    {
      this.route.navigate(["/inscription"],
          {
            queryParams: {
              ref :  this.reference},
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
    }
    else{
      this.route.navigate(['/inscription']);

    }
  }

}

