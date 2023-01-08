import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { ICar } from '../shared/models/cars';
import { IType } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  cars: ICar[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}


  ]
  
  constructor(private shopService: ShopService) 
  {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getCars(true);
    this.getBrands();
    this.getTypes();
  }

  getCars(useCache = false){
    this.shopService.getCars(useCache).subscribe(response => {
      this.cars = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error =>{
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error =>{
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getCars();
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getCars();
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getCars();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber != event){
    params.pageNumber = event;
    this.shopService.setShopParams(params);
    this.getCars(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getCars();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getCars();
  }
}
