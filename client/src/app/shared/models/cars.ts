export interface ICar {
    id: number;
    name: string;
    pictureUrl: string;
    year: number;
    fuel: string;
    price: number;
    carBrand: string;
    carType: string;
    photos: IPhoto[];
}

export interface IPhoto {
    id: number;
    pictureUrl: string;
    fileName: string;
    isMain: boolean;
  }
  
export interface ICarToCreate{
    name: string;
    pictureUrl: string;
    year: number;
    fuel: string;
    price: number;
    carBrandId: number;
    carTypeId: number;
}

export class CarFormValues implements ICarToCreate, ICar{
    name = '';
    pictureUrl = '';
    year = 0;
    fuel = '';
    price = 0;
    carBrandId: number;
    carTypeId: number;

    constructor (init?: CarFormValues){
        Object.assign(this, init);
    }

    id: number;
    carType: string;
    carBrand: string;
    photos: IPhoto[];
    
}