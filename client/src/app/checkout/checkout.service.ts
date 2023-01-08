import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../orders/orders.service';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { ICar } from '../shared/models/cars';
import { IReturned } from '../shared/models/checkReturned';
import { IDelivery } from '../shared/models/delivery';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  private checkReturned = new BehaviorSubject<IReturned>(null);
  check$ = this.checkReturned.asObservable();

  days = 0;
  constructor(private http: HttpClient, private orderService: OrdersService) { }

  addItemToBasket(item: ICar, quantity = 1, rentdate: Date, returndate: Date){
    const itemToAdd: IBasketItem = this.mapCarItemToBasketItem(item, quantity, rentdate,returndate);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity, rentdate, returndate);
    this.setBasket(basket);
  }



  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    );
  }

  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket' , basket).subscribe((response: IBasket) =>{
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  deleteLocalBasket(id: string){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id' + id);
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() =>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }
  
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  setday(d: IBasketTotals){
    this.days = d.days;
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const days = this.days;
    console.log(days);
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a , 0);
    const total = subtotal * days;
    this.basketTotalSource.next({days,total,subtotal});
  }
 
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number, rentdate: Date, returndate: Date):
   IBasketItem[] {
      const index = items.findIndex(i => i.id === itemToAdd.id);
      if (index === -1){
          itemToAdd.quantity = quantity;
          itemToAdd.dateRent = rentdate;
          itemToAdd.dateReturn = returndate;
          items.push(itemToAdd);
      } 
      else {
          itemToAdd.dateRent = rentdate;
          itemToAdd.dateReturn = returndate;
          items[index].quantity += quantity;
        }
   return items;
  }

 private createBasket(): IBasket {
    const basket = new Basket();
    // TODO: try without localstorage
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  getDelivery(){
    return this.http.get(this.baseUrl + 'orders/deliveryMethod').pipe(
      map((dm: IDelivery[]) => {
        return dm;
      }));
  }

  setShipping(deliverMethod: IDelivery){
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliverMethod.id;
    this.calculateTotals();
    this.setBasket(basket);
  }

  private mapCarItemToBasketItem(item: ICar, quantity: number, rentdate: Date, returndate: Date): IBasketItem {
    return {
      id: item.id,
      carName: item.name,
      price: item.price,
      quantity,
      dateRent:  rentdate,
      dateReturn: returndate,
      pictureUrl: item.pictureUrl,
      brand: item.carBrand,
      type: item.carType
    };
  }

  createOrder(order: IOrderToCreate){
    return this.http.post(this.baseUrl + 'orders', order);
  }

  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'Payments/' + this.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          console.log(this.getCurrentBasketValue());
        })
      );
  }


  checkCarReturn(id: any){
      return this.http.get(this.baseUrl + 'Cars/checkCar?id=' + id).pipe(
        map((res) => {
          return res
        })
      );
  }

  

}