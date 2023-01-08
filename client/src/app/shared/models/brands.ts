export interface IBrand{
    id: number;
    name: string;
}

export interface IBrandToCreate{
    name: string; 
}

export class CarBrandFormValues implements IBrandToCreate{
    name = '';
    
    constructor(init?: CarBrandFormValues){
        Object.assign(this, init);
    }
}