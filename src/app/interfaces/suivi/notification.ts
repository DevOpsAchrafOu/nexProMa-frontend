export interface Notification {

  id?: number;

  wf?: string;
  numAction?: string;
  description?: string;
  operationDate?: string;
  message?: string;
  markAsRead?: boolean;
  step? : string;
  traited? : boolean;
  ci? : boolean;


}
