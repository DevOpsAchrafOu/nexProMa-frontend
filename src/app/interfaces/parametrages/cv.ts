export interface Cv {

    id : number;
    uuid?: string;
    fullName:string;
    
    nationnality:string;
    age:string;
    email:string;
    phone:string;
    studies:string;
    experiences:string;
    interests: string;
    languages:string;
   ownerId:number;
   active?:boolean;
   fileName?:string;
    uploadedAt: string|null;
  
  }