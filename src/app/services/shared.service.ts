import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/parametrages/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  //utiliser  BehaviorSubject fournir par rxjs pour partager les données de facon synchroniser (detecte change data where did in all of Component)
  valueDefault=false;
  //for menu
  private dataSourceMenu = new BehaviorSubject({
    menu: this.valueDefault
  });
  //for currentUser
  private dataSourceCurrentUserName = new BehaviorSubject({
    currentUserName: ""
  });
    //for currentRole
    private dataSourceCurrentRole = new BehaviorSubject({
      currentRole: ""
    });
  //for avatarLogo
  private dataSourceAvatarLogo = new BehaviorSubject({
    avatarLogo: ""
  });


  //for count Associations Pending
  private dataCountAssociationsPending = new BehaviorSubject({
    countAssociationsPending: 0
  });



  currentDataMenu = this.dataSourceMenu.asObservable();
  currentDataCurrentUserName = this.dataSourceCurrentUserName.asObservable();
  currentDataCurrentRole = this.dataSourceCurrentRole.asObservable();
  currentDataAvatarLogo = this.dataSourceAvatarLogo.asObservable();
  currentDataCountAssociationsPending = this.dataCountAssociationsPending.asObservable();

  // pour nombre des nouvelle ordre pour ce Employeur(Orienteur/Agent)
  changeDataMenu(data: any) {
    this.dataSourceMenu.next(data);
  }

  changeDataCurrentUserName(data: any) {
    this.dataSourceCurrentUserName.next(data);
  }

  changeDataCurrentRole(data: any) {
    this.dataSourceCurrentRole.next(data);
  }

  changeDataAvatarLogo(data: any) {
    this.dataSourceAvatarLogo.next(data);
  }


  changeDataCountAssociationsPending(data: any) {
    this.dataCountAssociationsPending.next(data);
  }


  //set CurrentUserName And AvatarLogo
  setCurrentUserNameAndAvatarLogo(connectedUser : User){
    if(connectedUser){

      let connectedRole =connectedUser?.role;
      this.changeDataCurrentRole({ currentRole: connectedRole });

      if(connectedUser?.nom){
        let connectedUserName =connectedUser?.nom;//+" "+connectedUser?.prenom
        this.changeDataCurrentUserName({ currentUserName: connectedUserName });

        let avatarLogo =((connectedUser?.nom && connectedUser?.prenom)? connectedUser?.nom.substring(0,1)+connectedUser?.prenom.substring(0,1) : connectedUser?.nom.substring(0,2));
        this.changeDataAvatarLogo({ avatarLogo: avatarLogo.toUpperCase() });


      }
      else if(connectedUser?.login){
        let login = connectedUser?.login;
        const index: number = login.toLowerCase().indexOf("@");
        let connectedUserName =index != -1 ?  login.substring(0,index):login;//+" "+connectedUser?.prenom
        console.log(connectedUserName);
        this.changeDataCurrentUserName({ currentUserName: connectedUserName });

        let avatarLogo =connectedUser?.login ? connectedUser?.login.substring(0,2) : "";
        this.changeDataAvatarLogo({ avatarLogo: avatarLogo.toUpperCase() });
      }
    }


  }


}
