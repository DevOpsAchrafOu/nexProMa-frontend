import { environment } from '../../../environments/environment';
import { SharedService } from '../shared.service';
import { AlertService } from '../help/alert.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/parametrages/user';
import { JwtLogin } from '../../interfaces/jwt-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /********************************************************************************************/
  /**************************************** The attributes  ***********************************/
  /********************************************************************************************/

  prefixe : string= "/end-users";



  /********************************************************************************************/
  /************************************* Initialization functions  ****************************/
  /*******************************************************************************************/
  constructor(
    private router : Router,
    private httpClient : HttpClient,
    private toastr : ToastrService,
    private alertServ : AlertService,
    private sharedData : SharedService,
  ) { }


    /**
   * login by username, pwd
   * @param login: userName, password
   * @return token:
   */
  login(user: JwtLogin){
    return this.httpClient.post(`${environment.api_nexProMa_login}/login`,user,{responseType: 'text', observe: 'response' });

  }


  saveToken(token: string): void {
    localStorage.setItem("token-nexProMa", token);
  }

  loadToken(): string {
    let token = localStorage.getItem("token-nexProMa");
      return (token == null ? "" : token);
  }

  saveRole(token: string): void {
    localStorage.setItem("role-nexProMa", token);
  }

  loadRole(): string {
    let token = localStorage.getItem("role-nexProMa");
      return (token == null ? "" : token);
  }


  deleteToken(): void {
    localStorage.removeItem("token-nexProMa");
  }

  deleteRole(): void {
    localStorage.removeItem("role-nexProMa");
  }

  saveCurrentUser(connectedUser: User): void {
    localStorage.setItem("connectedUser-nexProMa", JSON.stringify(connectedUser));

  }

  loadConnectedUser(): User {
    let connectedUser = localStorage.getItem("connectedUser-nexProMa");
    return  connectedUser == null ? "" : JSON.parse(connectedUser);
  }

  deleteConnectedUser(): void {
    localStorage.removeItem("connectedUser-nexProMa");
  }

  isConnected(): boolean {
    return this.loadToken() ? true : false;
  }

  isloadConnectedUser(): boolean {

    let connectedUser = this.loadConnectedUser();
    //set CurrentUserName And AvatarLogo
    this.sharedData.setCurrentUserNameAndAvatarLogo(connectedUser);


    return this.loadConnectedUser() ? true : false;
  }

  logout() {
    return this.httpClient.get(`${environment.api_nexProMa}/public/logout`,{responseType: 'text' , observe: 'response'});
  }

  onLogout(){
    console.log("onLogout =>");
    this.logout()
    .subscribe(
        (data : any) => {
          if(data){
            this.deleteLocalStorage();
            this.router.navigate(["/login"]);
          }
        },
        error => {
          if(error.status === 403){
            this.deleteLocalStorage();
            this.router.navigate(["/login"]);
          }
          else{
            this.deleteLocalStorage();
            this.router.navigate(["/login"]);
          }
        }
      );
   }

  forgotPassword(email : string)
  {
    return this.httpClient.get<User>(`${environment.api_nexProMa}/end-users?email=`+email);

  }


  deleteLocalStorage(){
    this.deleteToken();
    this.deleteRole();
    this.deleteConnectedUser();

  }
}
