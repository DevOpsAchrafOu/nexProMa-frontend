export interface Menu {

    id?: number;
    icon? : string;
    order? : number;
    orientation? : string;
    labelAr? : string;
    labelFr? : string;
    parentId? : number;
    url? : string;
    children ? : Menu[];
    hasChildren? : boolean;

}


