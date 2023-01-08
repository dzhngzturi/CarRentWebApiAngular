import { v4 as uuidv4 } from 'uuid'

export interface IBasket {
    id: string;
    items: IBasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number; 
    shippingPrice? : number;
}

export interface IBasketItem {
    id: number;
    carName: string;
    price: number;
    quantity: number;
    dateRent: Date;
    dateReturn: Date;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBasket{
    id = uuidv4(); 
    items: IBasketItem[] = [];
}

export interface IBasketTotals {
    days: number;
    subtotal: number;
    total: number;
}
