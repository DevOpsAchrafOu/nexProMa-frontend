export interface User {

    id? : number;
    nom? : string;
    prenom? : string;
    qualification:string;
    qualificationStr:string;
    phone? : string;
    role?: string;
    creationDate ?: string;//date d'inscription

    email? : string;
    login? : string;
    password? : boolean;
    state? : string;
    temporaryPwd? : boolean;
    token? : string;

}
