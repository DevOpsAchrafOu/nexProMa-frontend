export interface Account {
  id? : number;

  associationNameAr? : string;
  associationNameFr? : string;
  creationDate? : string;
  email? : string;
  emailAdressChecked? : boolean;
  login? : string;
  responsableName? : string;
  responsablePhoneNumber? : string;
  responsableEmail? : string;
	address? : string;
	city? : string;
	zipCode? : string;
	country? : string;
	regionAcademy? : string;
  phoneNumberConfirmed? : boolean;
  isTemporaryPwd? : boolean;
  state? : string;
  temporaryPwd? : boolean;

  status ?: string;//0: en attente; 1: valider; 2: rejeter
  reason ?: string;
  colorState ? : string;
  associationIsActif?:boolean;

}
