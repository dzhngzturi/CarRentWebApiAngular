export interface IType{
    id: number;
    name: string;
}

export interface ITypeToCreate{
    name: string; 
}

export class CarTypeFormValues implements ITypeToCreate{
    name = '';
    
    constructor(init?: CarTypeFormValues){
        Object.assign(this, init);
    }
}
