export interface Offer {

  id? : number;
  title : string;
  reference? : string;
  description? : string;
  deadline? :Date;
  contractTypeId?: number;
  contractTypeStr?: string;
  studyLevel: string;
  workModel: string;
  experience: string;
  regionId?: number;
  regionStr?: string;
  salaryRangeId?: number;
  publishedAt? : string;
  lastStatus?: String;

  applicationLastStatus? : string;
  applicationPublishedAt? : string;



}
