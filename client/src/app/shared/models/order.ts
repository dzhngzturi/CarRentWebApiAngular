import { IAddress } from "./address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    deliveryMethod: string;
    orderItems: IOrderItem[];
    total: number;
    status: string;
}


export interface IOrderItem {
    carId: number;
    carName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    rentDate: Date;
    returnDate: Date;
    days:number;
}


