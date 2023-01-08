import { ICar } from "./cars";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: ICar[];
}


export class Pagination implements IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: ICar[] = [];
}