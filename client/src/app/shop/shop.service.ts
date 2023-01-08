import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brands';
import { ICar } from '../shared/models/cars';
import { IType } from '../shared/models/types';
import { IPagination, Pagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/";
  cars: ICar[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagiantion = new Pagination();
  shopParams = new ShopParams();
  carCache = new Map();


  constructor(private http: HttpClient) { }

  getCars(useCache: boolean){
    if(useCache === false){
      this.carCache = new Map();
    }
    if(this.carCache.size > 0 && useCache === true){
      if(this.carCache.has(Object.values(this.shopParams).join('-'))){
        this.pagiantion.data = this.carCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagiantion);
      }
    }

    let params = new HttpParams();
    if(this.shopParams.brandId !== 0){
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if(this.shopParams.typeId !== 0){
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if(this.shopParams.search){
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageIndex', this.shopParams.pageSize.toString());
    
    return this.http.get<IPagination>(this.baseUrl + 'Cars',{observe: 'response', params})
    .pipe(map(response => {
      this.carCache.set(Object.values(this.shopParams).join('-'), response.body.data);
      this.pagiantion = response.body;
      return this.pagiantion;
    }));
  }

setShopParams(params: ShopParams){
  this.shopParams = params;
}

getShopParams(){
  return this.shopParams;
}

getCar(id: number){
  let car: ICar;
  this.carCache.forEach((cars: ICar[]) => {
    car = cars.find(p => p.id === id);
  })
  if (car){
    return of(car);
  }
  return this.http.get<ICar>(this.baseUrl + 'Cars/' + id);
}

getType(id: number){
  let type: IType;
  this.carCache.forEach((types: IType[]) => {
    type = types.find(p => p.id === id);
  })
  if (type){
    return of(type);
  }
  return this.http.get<IType>(this.baseUrl + 'Cars/types/' + id);
}

  getBrand(id: number){
    let brand: IBrand;
    this.carCache.forEach((brands: IBrand[]) => {
      brand = brands.find(p => p.id === id);
    })
    if(brand){
      return of(brand);
    }
    return this.http.get<IBrand>(this.baseUrl + 'Cars/brands/' + id);
  }

  getBrands(){
    if(this.brands.length > 0)
    {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'Cars/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes(){
    if(this.types.length > 0)
    {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'Cars/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
}
