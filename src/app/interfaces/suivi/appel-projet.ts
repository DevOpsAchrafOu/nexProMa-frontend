export interface AppelProjet {

    id?: number;
  
    idNotification?: number;
    numRapport: string;
    responseDate?: string;
    step? : string;//step RD(RD1,RD2,RD3,RD4,RD5)  RP( RP1, RP2, RP3, RP4, RP5)  SM( SM1, SM2, SM3, SM4)  RF( RF1, RF2, RF3, RF4, RF5)
    wf? : string;// SM, RD, RMP50, RMP30, RF
  docPath : boolean;
    
    details? : string;
  }
  